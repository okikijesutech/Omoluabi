import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContributionStatus, ContributionType } from '@prisma/client';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { TrustService } from './trust.service';

@Injectable()
export class GovernanceExecutionService {
  constructor(
    private prisma: PrismaService,
    private knowledgeService: KnowledgeService,
    private trustService: TrustService,
  ) {}

  async approveContribution(contributionId: string, tx?: any) {
    const db = tx || this.prisma;
    
    // We use a transaction if not provided
    if (!tx) {
      return this.prisma.$transaction(async (innerTx) => {
        return this.executeApproval(contributionId, innerTx);
      });
    }

    return this.executeApproval(contributionId, tx);
  }

  private async executeApproval(contributionId: string, tx: any) {
    const contribution = await tx.contribution.findUnique({
      where: { id: contributionId },
    });

    if (!contribution) return;

    const payload: any = contribution.content;

    // 1. Apply changes (Preservation Logic)
    switch (contribution.type) {
      case ContributionType.CREATE:
        await this.knowledgeService.createKnowledgeUnit(payload);
        break;

      case ContributionType.EDIT:
        if (contribution.knowledgeVariationId) {
          await this.knowledgeService.applyVariationEdit(
            { ...payload, targetVariationId: contribution.knowledgeVariationId },
            contribution.authorId,
            contribution.id
          );
        } else {
          await this.knowledgeService.applyEdit(payload, contribution.authorId, contribution.id);
        }
        break;

      case ContributionType.DIALECT_VARIATION:
        await this.knowledgeService.addDialectVariation(payload);
        break;
    }

    // 2. Resolve contribution status
    await tx.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.APPROVED },
    });

    // 3. Update Governance & Trust
    await this.trustService.updateTrustAfterContribution(contribution.authorId, ContributionStatus.APPROVED, tx);
    await this.trustService.updateReviewAccuracy(contributionId, tx);
  }

  async rejectContribution(contributionId: string, tx?: any) {
    const db = tx || this.prisma;

    if (!tx) {
      return this.prisma.$transaction(async (innerTx) => {
        return this.executeRejection(contributionId, innerTx);
      });
    }

    return this.executeRejection(contributionId, tx);
  }

  private async executeRejection(contributionId: string, tx: any) {
    const contribution = await tx.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.REJECTED },
    });

    // Governance & Trust Logic
    await this.trustService.updateTrustAfterContribution(contribution.authorId, ContributionStatus.REJECTED, tx);
    await this.trustService.updateReviewAccuracy(contributionId, tx);
  }
}
