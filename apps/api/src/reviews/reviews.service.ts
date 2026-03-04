import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ContributionStatus, ContributionType, Role } from '@prisma/client';
import { KnowledgeService } from '../knowledge/knowledge.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private knowledgeService: KnowledgeService,
  ) {}

  async reviewContribution(reviewerId: string, contributionId: string, decision: 'APPROVE' | 'REJECT', comment?: string) {
    const reviewer = await this.prisma.user.findUnique({ where: { id: reviewerId } });

    if (!reviewer || (reviewer.role !== Role.REVIEWER && reviewer.role !== Role.ADMIN)) {
      throw new BadRequestException('Unauthorized to review');
    }

    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
      include: { reviews: true },
    });

    if (!contribution) {
      throw new NotFoundException('Contribution not found');
    }

    if (contribution.status !== ContributionStatus.PENDING && contribution.status !== ContributionStatus.ESCALATED) {
      throw new BadRequestException('Contribution already resolved');
    }

    // Prevent duplicate review
    const existingReview = contribution.reviews.find((r) => r.reviewerId === reviewerId);
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this contribution');
    }

    // Create the review
    const newReview = await this.prisma.review.create({
      data: {
        contributionId: contributionId,
        reviewerId: reviewerId,
        approved: decision === 'APPROVE',
        comment: comment,
      },
    });

    // Evaluate state
    await this.evaluateContributionStatus(contributionId);

    return newReview;
  }

  private async evaluateContributionStatus(contributionId: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
      include: { reviews: true },
    });

    if (!contribution) return;

    let approvals = 0;
    let rejections = 0;

    for (const review of contribution.reviews) {
      if (review.approved) approvals++;
      else rejections++;
    }

    // Case 1: 2 approvals
    if (approvals >= 2) {
      await this.approveContribution(contributionId);
      return;
    }

    // Case 2: 2 rejections
    if (rejections >= 2) {
      await this.rejectContribution(contributionId);
      return;
    }

    // Case 3: Conflict (1 approve + 1 reject) => Wait for 3rd reviewer
    if (approvals === 1 && rejections === 1) {
      return;
    }

    // Case 4: Heavy disagreement
    if (contribution.reviews.length >= 3 && approvals === rejections) {
      await this.escalateContribution(contributionId);
    }
  }

  private async approveContribution(contributionId: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });

    if (!contribution) return;

    const payload: any = contribution.content;

    switch (contribution.type) {
      case ContributionType.CREATE:
        await this.knowledgeService.createKnowledgeUnit(payload);
        break;

      case ContributionType.EDIT:
        await this.knowledgeService.applyEdit(payload);
        break;

      case ContributionType.DIALECT_VARIATION:
        await this.knowledgeService.addDialectVariation(payload);
        break;
    }

    await this.prisma.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.APPROVED },
    });

    // Notify author (Future implementation)
  }

  private async rejectContribution(contributionId: string) {
    await this.prisma.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.REJECTED },
    });
    // Notify author (Future implementation)
  }

  private async escalateContribution(contributionId: string) {
    await this.prisma.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.ESCALATED },
    });
    // Notify admins (Future implementation)
  }
}
