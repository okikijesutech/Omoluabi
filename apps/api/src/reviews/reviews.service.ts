import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ContributionStatus, ContributionType, KnowledgeType } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(dto: CreateReviewDto) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: dto.contributionId },
      include: { reviews: true },
    });

    if (!contribution) {
      throw new NotFoundException('Contribution not found');
    }

    if (contribution.status !== ContributionStatus.PENDING) {
      throw new BadRequestException('This contribution is no longer pending.');
    }

    // Check if user already reviewed
    const existingReview = contribution.reviews.find((r) => r.reviewerId === dto.reviewerId);
    if (existingReview) {
      throw new BadRequestException('You have already reviewed this contribution');
    }

    // Create the review
    const newReview = await this.prisma.review.create({
      data: {
        contributionId: dto.contributionId,
        reviewerId: dto.reviewerId,
        approved: dto.approved,
        comment: dto.comment,
      },
    });

    // Re-evaluate thresholds
    await this.evaluateThresholds(dto.contributionId);

    return newReview;
  }

  private async evaluateThresholds(contributionId: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
      include: { reviews: true },
    });

    if (!contribution || contribution.status !== ContributionStatus.PENDING) return;

    let approvals = 0;
    let rejections = 0;

    for (const review of contribution.reviews) {
      if (review.approved) approvals++;
      else rejections++;
    }

    // Baseline Rules
    if (approvals >= 2) {
      await this.executeApproval(contribution.id);
    } else if (rejections >= 2) {
      await this.rejectContribution(contribution.id);
    }
  }

  private async rejectContribution(contributionId: string) {
    await this.prisma.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.REJECTED },
    });
  }

  private async executeApproval(contributionId: string) {
    const contribution = await this.prisma.contribution.findUnique({
      where: { id: contributionId },
    });

    if (!contribution) return;

    const content: any = contribution.content;

    // Execute logic based on type
    if (contribution.type === ContributionType.CREATE) {
      // 1. Create KnowledgeUnit
      const newKu = await this.prisma.knowledgeUnit.create({
        data: {
          type: content.type as KnowledgeType,
          title: content.title,
          description: content.description,
        },
      });

      // 2. Attach initial Dialect Variation (Enforcing Dialect inclusion)
      if (content.dialectId && content.textWithTone) {
        await this.prisma.knowledgeVariation.create({
          data: {
            knowledgeUnitId: newKu.id,
            dialectId: content.dialectId,
            textWithTone: content.textWithTone,
            phoneticGuide: content.phoneticGuide,
            notes: content.notes,
            audioUrl: content.audioUrl,
          },
        });
      }
    } else if (contribution.type === ContributionType.EDIT) {
      if (!contribution.knowledgeUnitId) return;

      // Update KnowledgeUnit
      await this.prisma.knowledgeUnit.update({
        where: { id: contribution.knowledgeUnitId },
        data: {
          title: content.title,
          description: content.description,
        },
      });
      // Future: Log revisions to an audit table
    } else if (contribution.type === ContributionType.DIALECT_VARIATION) {
      if (!contribution.knowledgeUnitId) return;

      // Ensure we don't overwrite, strictly create NEW
      await this.prisma.knowledgeVariation.create({
        data: {
          knowledgeUnitId: contribution.knowledgeUnitId,
          dialectId: content.dialectId,
          textWithTone: content.textWithTone,
          phoneticGuide: content.phoneticGuide,
          notes: content.notes,
          audioUrl: content.audioUrl,
        },
      });
    }

    // Mark contribution as APPROVED
    await this.prisma.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.APPROVED },
    });
  }
}
