import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContributionStatus, ContributionType, KnowledgeType, NotificationType } from '@prisma/client';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { TrustService } from './trust.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class GovernanceExecutionService {
  constructor(private prisma: PrismaService,
    private knowledgeService: KnowledgeService,
    private trustService: TrustService,
    private notificationsService: NotificationsService,
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
    const authorId = contribution.authorId;

    // 1. Apply changes (Preservation Logic)
    switch (contribution.type) {
      case ContributionType.CREATE:
        // payload from TonalInput: { title, meaning, notes, dialectId }
        await this.knowledgeService.createKnowledgeUnit({
          title: payload.title,
          description: payload.meaning,
          type: KnowledgeType.WORD, // Defaulting to WORD for Lab submissions
          dialectId: payload.dialectId,
          textWithTone: payload.title, // In many simple cases, the title IS the word with tones
          notes: payload.notes,
          userId: authorId,
        }, tx);
        break;

      case ContributionType.EDIT:
        if (contribution.knowledgeVariationId) {
          await this.knowledgeService.applyVariationEdit(
            { 
              ...payload, 
              targetVariationId: contribution.knowledgeVariationId 
            },
            authorId,
            contribution.id
          );
        } else {
          await this.knowledgeService.applyEdit(payload, authorId, contribution.id);
        }
        break;

      case ContributionType.DIALECT_VARIATION:
        await this.knowledgeService.addDialectVariation({
          ...payload,
          userId: authorId,
        }, tx);
        break;
    }

    // 2. Resolve contribution status
    await tx.contribution.update({
      where: { id: contributionId },
      data: { status: ContributionStatus.APPROVED },
    });

    // 3. Update Governance & Trust
    await this.trustService.updateTrustAfterContribution(authorId, contributionId, ContributionStatus.APPROVED, tx);
    await this.trustService.updateReviewAccuracy(contributionId, tx);

    // 4. Notify Author
    await this.notificationsService.create(
      authorId,
      NotificationType.CONTRIBUTION_APPROVED,
      'Contribution Approved!',
      `Your contribution for "${payload.title}" has been verified and added to the immortal archive.`,
      { contributionId }
    );
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
    await this.trustService.updateTrustAfterContribution(contribution.authorId, contributionId, ContributionStatus.REJECTED, tx);
    await this.trustService.updateReviewAccuracy(contributionId, tx);

    // 📩 Notify Author
    const payload: any = contribution.content;
    await this.notificationsService.create(
      contribution.authorId,
      NotificationType.CONTRIBUTION_REJECTED,
      'Review Update',
      `Your contribution for "${payload.title || 'unnamed unit'}" requires linguistic adjustments and was not approved.`,
      { contributionId }
    );
  }
}
