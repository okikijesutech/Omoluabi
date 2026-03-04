import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContributionStatus, Role, EntityType, ChangeType } from '@prisma/client';

@Injectable()
export class TrustService {
  constructor(private prisma: PrismaService) {}

  // Helper to get DB client (standard or transactional)
  private getClient(tx?: any) {
    return tx || this.prisma;
  }

  async updateTrustAfterContribution(userId: string, status: ContributionStatus, tx?: any) {
    const db = this.getClient(tx);
    const user = await db.user.findUnique({ where: { id: userId } });
    if (!user) return;

    let trustDelta = 0;
    let approvedDelta = 0;
    let rejectedDelta = 0;

    if (status === ContributionStatus.APPROVED) {
      approvedDelta = 1;
      trustDelta = 2;
    } else if (status === ContributionStatus.REJECTED) {
      rejectedDelta = 1;
      trustDelta = -1;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        approvedCount: { increment: approvedDelta },
        rejectedCount: { increment: rejectedDelta },
        trustScore: { increment: trustDelta },
      },
    });

    await this.evaluatePromotion(updatedUser, tx);
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

      const updatedReviewer = await db.user.update({
        where: { id: review.reviewerId },
        data: {
          totalReviews: newTotalReviews,
          correctReviews: newCorrectReviews,
          reviewAccuracy: newAccuracy,
        },
      });

      await this.evaluateSuspension(updatedReviewer, tx);
      await this.evaluatePromotion(updatedReviewer, tx);
    }
  }

  private async evaluatePromotion(user: any, tx?: any) {
    const db = this.getClient(tx);
    
    if (user.role === Role.LEARNER || user.role === Role.CONTRIBUTOR) {
      if (user.trustScore >= 50 && user.reviewAccuracy >= 0.7) {
        // Snapshot promotion for governance audit
        await this.recordRoleChange(user.id, user.role, Role.REVIEWER, tx);

        await db.user.update({
          where: { id: user.id },
          data: { role: Role.REVIEWER },
        });
      }
    }
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
        entityType: EntityType.KNOWLEDGE_UNIT, // Using KnowledgeUnit as proxy or we should add USER to EntityType
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
