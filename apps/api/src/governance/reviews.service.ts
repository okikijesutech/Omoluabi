import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContributionStatus } from '@prisma/client';
import { GovernanceExecutionService } from './governance-execution.service';
import { CouncilService } from './council.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private executionService: GovernanceExecutionService,
    private councilService: CouncilService,
  ) {}

  async submitReview(reviewerId: string, contributionId: string, approved: boolean, comment?: string) {
    // 1. Validate reviewer eligibility
    const reviewer = await this.prisma.user.findUnique({ where: { id: reviewerId } });
    if (!reviewer || (reviewer.role !== 'REVIEWER' && reviewer.role !== 'ADMIN')) {
      throw new BadRequestException('Only trusted reviewers can perform this action');
    }

    // 2. Validate contribution status
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
      include: { reviews: true },
    });

    if (!contribution) {
      throw new NotFoundException('Contribution not found');
    }

    if (contribution.status !== ContributionStatus.PENDING) {
      throw new BadRequestException('Contribution is no longer pending');
    }

    if (contribution.authorId === reviewerId) {
      throw new BadRequestException('Authors cannot review their own submissions');
    }

    // 3. Prevent duplicate review
    const existingReview = contribution.reviews.find(r => r.reviewerId === reviewerId);
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this contribution');
    }

    // 4. Create Review record
    await this.prisma.review.create({
      data: {
        contributionId,
        reviewerId,
        approved,
        comment,
      },
    });

    // 5. Evaluate Threshold (Standard Preservation Rule: 2 independent approvals)
    const approvals = contribution.reviews.filter(r => r.approved).length + (approved ? 1 : 0);
    const rejections = contribution.reviews.filter(r => !r.approved).length + (!approved ? 1 : 0);

    if (approvals >= 2) {
      await this.executionService.approveContribution(contributionId);
    } else if (rejections >= 2) {
      await this.executionService.rejectContribution(contributionId);
    }

    return { success: true, reviewsCount: approvals + rejections };
  }

  async getPendingQueue() {
    return this.prisma.contribution.findMany({
      where: { status: ContributionStatus.PENDING },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            role: true,
            trustScore: true,
            reviewAccuracy: true,
            totalReviews: true,
            level: true,
            badges: true,
          },
        },
        knowledgeUnit: true,
        knowledgeVariation: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getComparisonData(contributionId: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
      include: {
        knowledgeUnit: {
          include: {
            variations: {
              include: { dialect: true },
            },
          },
        },
        knowledgeVariation: {
          include: { dialect: true },
        },
      },
    });

    if (!contribution) throw new NotFoundException('Contribution not found');

    const payload: any = contribution.content;
    let original: any = null;

    if (contribution.knowledgeVariationId) {
      original = await this.prisma.knowledgeVariation.findUnique({
        where: { id: contribution.knowledgeVariationId },
        include: { dialect: true },
      });
    } else if (contribution.knowledgeUnitId) {
      original = await this.prisma.knowledgeUnit.findUnique({
        where: { id: contribution.knowledgeUnitId },
        include: { variations: true },
      });
    }

    return {
      contribution,
      proposed: payload,
      original,
    };
  }

  async escalate(contributionId: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });

    if (!contribution) throw new NotFoundException('Contribution not found');

    // 1. Update status to ESCALATED
    await this.prisma.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.ESCALATED },
    });

    // 2. Trigger Council Case creation
    return this.councilService.createCouncilCase(contributionId);
  }
}
