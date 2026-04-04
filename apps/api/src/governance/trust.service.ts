import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContributionStatus, Role, EntityType, ChangeType, NotificationType } from '@prisma/client';
import { GamificationEngine, BadgeType } from '@omoluabi/gamification';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TrustService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

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
    let newTrustScore = (user.approvedCount * 5) + (user.reviewAccuracy * 100) - (user.rejectedCount * 2);
    
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
    const badgeNotifications: string[] = [];
    
    earnedBadgeTypes.forEach((bt: BadgeType) => {
      newBadges.push({ type: bt, awardedAt: new Date() });
      badgeNotifications.push(bt);
    });

    const oldLevel = user.level;
    const newLevel = GamificationEngine.calculateLevel(user.xp);

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { 
        trustScore: Math.max(0, Math.floor(newTrustScore)),
        badges: newBadges as any,
        level: newLevel
      },
    });

    // 🏆 LEVEL UP NOTIFICATION
    if (newLevel > oldLevel) {
      await this.notificationsService.create(
        userId,
        NotificationType.LEVEL_UP,
        'Level Up!',
        `Congratulations! You have reached Level ${newLevel}. Your linguistic authority is growing.`,
        { level: newLevel }
      );
    }

    // 🎖️ NEW BADGE NOTIFICATIONS
    for (const bt of badgeNotifications) {
      await this.notificationsService.create(
        userId,
        NotificationType.BADGE_EARNED,
        'New Badge Unlocked!',
        `You have earned the "${bt.replace(/_/g, ' ')}" badge.`,
        { badgeType: bt }
      );
    }

    await this.evaluatePromotion(updatedUser, tx);
    return updatedUser;
  }

  async awardLearningXP(userId: string, xpAmount: number = 5, tx?: any) {
    const db = this.getClient(tx);
    await db.user.update({
      where: { id: userId },
      data: { xp: { increment: xpAmount } },
    });

    return this.syncTrustScore(userId, tx);
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
        await this.applyRoleChange(user.id, user.role, Role.ADMIN, tx);
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
      await this.recordRoleChange(user.id, user.role, Role.LEARNER, tx);

      await db.user.update({
        where: { id: user.id },
        data: { role: Role.LEARNER },
      });
    }
  }

  private async recordRoleChange(userId: string, oldRole: Role, newRole: Role, tx?: any) {
    const db = this.getClient(tx);

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
        createdById: userId,
      },
    });
  }
}
