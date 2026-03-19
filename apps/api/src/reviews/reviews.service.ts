import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ContributionStatus, ContributionType, Role } from '@prisma/client';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { TrustService } from '../governance/trust.service';
import { CouncilService } from '../governance/council.service';
import { GovernanceExecutionService } from '../governance/governance-execution.service';

@Injectable()
export class ReviewsService {
  constructor(
    private prisma: PrismaService,
    private knowledgeService: KnowledgeService,
    private trustService: TrustService,
    private councilService: CouncilService,
    private executionService: GovernanceExecutionService,
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

    // Resolution Logic (Preservation-First Consensus)
    
    // 1. Pure Consensus (2-0)
    if (approvals >= 2 && rejections === 0) {
      await this.executionService.approveContribution(contributionId);
      return;
    }

    // 2. Pure Rejection (0-2)
    if (rejections >= 2 && approvals === 0) {
      await this.executionService.rejectContribution(contributionId);
      return;
    }

    // 3. Escalation: Any conflict that reaches 3 reviews or a tie at 2+
    // If we have mixed reviews and at least 3 total, or a 1-1 tie that is being broken by more conflict
    if (contribution.reviews.length >= 3 && approvals > 0 && rejections > 0) {
      await this.escalateContribution(contributionId);
      return;
    }

    // 4. Fallback for ties at even numbers > 2
    if (contribution.reviews.length >= 4 && approvals === rejections) {
      await this.escalateContribution(contributionId);
      return;
    }
  }


  private async escalateContribution(contributionId: string) {
    await this.prisma.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.ESCALATED },
    });

    // Governance: Trigger Council Case
    await this.councilService.createCouncilCase(contributionId);
  }
}
