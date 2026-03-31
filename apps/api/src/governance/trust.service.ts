import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContributionStatus, Role, EntityType, ChangeType } from '@prisma/client';
import { GamificationEngine, BadgeType } from '@omoluabi/gamification';

@Injectable()
export class TrustService {
  constructor(private prisma: PrismaService) {}

  // Helper to get DB client (standard or transactional)
  private getClient(tx?: any) {
    return tx || this.prisma;
  }

  async updateTrustAfterContribution(userId: string, contributionId: string, status: ContributionStatus, tx?: any) {
    const db = this.getClient(tx);
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) return;

    let xpDelta = 2; // Default for rejected attempts

    if (status === ContributionStatus.APPROVED) {
      const isFirst = user.approvedCount === 0;

      const obj = await db.contribution.findUnique({
        where: { id: contributionId },
        include: { knowledgeUnit: true, knowledgeVariation: { include: { knowledgeUnit: true } } }
      });

      let typeStr = 'WORD';
      if (obj?.knowledgeUnit) {
        typeStr = obj.knowledgeUnit.type;
      } else if (obj?.knowledgeVariation?.knowledgeUnit) {
        typeStr = obj.knowledgeVariation.knowledgeUnit.type;
      }

      xpDelta = GamificationEngine.calculateContributionXP(typeStr, isFirst);
    }

    const approvedDelta = status === ContributionStatus.APPROVED ? 1 : 0;
    const rejectedDelta = status === ContributionStatus.REJECTED ? 1 : 0;

    await db.user.update({
      where: { id: userId },
      data: {
        approvedCount: { increment: approvedDelta },
        rejectedCount: { increment: rejectedDelta },
        xp: { increment: xpDelta },
      },
    });

    await this.syncTrustScore(userId, tx);
  }

  async syncTrustScore(userId: string, tx?: any) {
    const db = this.getClient(tx);
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) return;

    // 🎓 Formula: (approvedCount * 5) + (reviewAccuracy * 100) - (rejectedCount * 2)
    // We weight Accuracy heavily to ensure quality over quantity
    // Baseline trust score for new users is 0
    let newTrustScore = (user.approvedCount * 5) + (user.reviewAccuracy * 100) - (user.rejectedCount * 2);
    
    // Dialect Mastery Bonus: +10 if they have 90%+ accuracy and 20+ reviews
    if (user.reviewAccuracy >= 0.9 && user.totalReviews >= 20) {
      newTrustScore += 10;
    }

    // Gamification: New Badges
    const currentBadges = (user.badges as any[]) || [];
    const currentBadgeTypes = currentBadges.map(b => b.type);
    const earnedBadgeTypes = GamificationEngine.evaluateBadges({
      approvedCount: user.approvedCount,
      totalReviews: user.totalReviews,
      reviewAccuracy: user.reviewAccuracy,
      currentBadges: currentBadgeTypes
    });

    const newBadges = [...currentBadges];
    earnedBadgeTypes.forEach((bt: BadgeType) => {
      newBadges.push({ type: bt, awardedAt: new Date() });
    });

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { 
        trustScore: Math.max(0, Math.floor(newTrustScore)),
        badges: newBadges as any,
        level: GamificationEngine.calculateLevel(user.xp)
      },
    });

    await this.evaluatePromotion(updatedUser, tx);
    return updatedUser;
  }

  async updateReviewAccuracy(contributionId: string, tx?: any) {
    const db = this.getClient(tx);
    const contribution = await db.contribution.findUnique({
      where: { id: contributionId },
      include: { reviews: true },
    });

    if (!contribution || (contribution.status !== ContributionStatus.APPROVED && contribution.status !== ContributionStatus.REJECTED)) {
      return;
    }

    const finalStatus = contribution.status;

    for (const review of contribution.reviews) {
      const isCorrect = 
        (review.approved && finalStatus === ContributionStatus.APPROVED) ||
        (!review.approved && finalStatus === ContributionStatus.REJECTED);

      const reviewer = await db.user.findUnique({ where: { id: review.reviewerId } });
      if (!reviewer) continue;

      const newTotalReviews = reviewer.totalReviews + 1;
      const newCorrectReviews = reviewer.correctReviews + (isCorrect ? 1 : 0);
      const newAccuracy = newCorrectReviews / newTotalReviews;

      const xpDelta = GamificationEngine.calculateReviewXP(isCorrect, reviewer.trustScore);

      await db.user.update({
        where: { id: review.reviewerId },
        data: {
          totalReviews: newTotalReviews,
          correctReviews: newCorrectReviews,
          reviewAccuracy: newAccuracy,
          xp: { increment: xpDelta },
        },
      });

      const updatedReviewer = await this.syncTrustScore(review.reviewerId, tx);
      if (updatedReviewer) {
        await this.evaluateSuspension(updatedReviewer, tx);
      }
    }
  }

  private async evaluatePromotion(user: any, tx?: any) {
    const db = this.getClient(tx);
    
    if (user.role === Role.LEARNER || user.role === Role.CONTRIBUTOR) {
      if (user.trustScore >= 50 && user.reviewAccuracy >= 0.7) {
        await this.applyRoleChange(user.id, user.role, Role.REVIEWER, tx);
      }
    } else if (user.role === Role.REVIEWER) {
      if (user.trustScore >= 100 && user.reviewAccuracy >= 0.8) {
        await this.applyRoleChange(user.id, user.role, Role.ADMIN, tx); // Council is represented by ADMIN role in this schema
      }
    }
  }

  private async applyRoleChange(userId: string, oldRole: Role, newRole: Role, tx?: any) {
    const db = this.getClient(tx);
    await this.recordRoleChange(userId, oldRole, newRole, tx);
    return await db.user.update({
      where: { id: userId },
      data: { role: newRole },
    });
  }

  private async evaluateSuspension(user: any, tx?: any) {
    const db = this.getClient(tx);

    if (user.role === Role.REVIEWER && user.totalReviews >= 20 && user.reviewAccuracy < 0.4) {
      // Snapshot demotion for governance audit
      await this.recordRoleChange(user.id, user.role, Role.LEARNER, tx);

      await db.user.update({
        where: { id: user.id },
        data: { role: Role.LEARNER },
      });
    }
  }

  private async recordRoleChange(userId: string, oldRole: Role, newRole: Role, tx?: any) {
    const db = this.getClient(tx);

    // Get current version for user revisions
    const lastRev = await db.revisionHistory.findFirst({
      where: { entityId: userId },
      orderBy: { entityVersion: 'desc' },
    });
    const nextVersion = (lastRev?.entityVersion || 0) + 1;

    await db.revisionHistory.create({
      data: {
        entityType: EntityType.USER,
        entityId: userId,
        entityVersion: nextVersion,
        previousData: { role: oldRole },
        newData: { role: newRole },
        changeType: ChangeType.EDIT,
        createdById: userId, // System change but attributed to user for now
      },
    });
  }
}
