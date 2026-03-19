import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CouncilDecision, CouncilStatus, ContributionStatus, VoteDecision } from '@prisma/client';
import { KnowledgeService } from '../knowledge/knowledge.service';
import { TrustService } from './trust.service';
import { GovernanceExecutionService } from './governance-execution.service';

@Injectable()
export class CouncilVotesService {
  constructor(
    private prisma: PrismaService,
    private knowledgeService: KnowledgeService,
    private trustService: TrustService,
    private executionService: GovernanceExecutionService,
  ) {}

  async castVote(memberId: string, caseId: string, decision: VoteDecision) {
    const member = await this.prisma.user.findUnique({ where: { id: memberId } });
    if (!member || member.trustScore < 100) {
      throw new BadRequestException('Only Council members can vote');
    }

    const councilCase = await this.prisma.councilCase.findUnique({
      where: { id: caseId },
      include: { councilVotes: true },
    });

    if (!councilCase) {
      throw new NotFoundException('Council case not found');
    }

    if (councilCase.status !== CouncilStatus.OPEN) {
      throw new BadRequestException('Case already resolved');
    }

    // Prevent duplicate vote
    const existingVote = councilCase.councilVotes.find((v) => v.memberId === memberId);
    if (existingVote) {
      throw new BadRequestException('You have already voted on this case');
    }

    // Create vote
    const vote = await this.prisma.councilVote.create({
      data: {
        councilCaseId: caseId,
        memberId: memberId,
        decision: decision,
      },
    });

    // Evaluate resolution
    await this.evaluateCaseResolution(caseId);

    return vote;
  }

  private async evaluateCaseResolution(caseId: string) {
    const councilCase = await this.prisma.councilCase.findUnique({
      where: { id: caseId },
      include: { councilVotes: true },
    });

    if (!councilCase) return;

    const totalVotes = councilCase.councilVotes.length;
    if (totalVotes < 5) return; // Governance Rule: Min 5 votes

    let approvals = 0;
    let rejections = 0;

    for (const vote of councilCase.councilVotes) {
      if (vote.decision === VoteDecision.APPROVE) approvals++;
      else rejections++;
    }

    // Threshold: Simple majority of the 5-7 members
    if (approvals > rejections) {
      await this.resolveCase(caseId, CouncilDecision.APPROVED);
    } else if (rejections > approvals) {
      await this.resolveCase(caseId, CouncilDecision.REJECTED);
    } else {
      // Tie at 6 votes or other stalemate
      await this.resolveCase(caseId, CouncilDecision.ARCHIVED);
    }
  }

  private async resolveCase(caseId: string, decision: CouncilDecision) {
    return this.prisma.$transaction(async (tx) => {
      const councilCase = await tx.councilCase.update({
        where: { id: caseId },
        data: {
          status: CouncilStatus.RESOLVED,
          decision: decision,
          resolvedAt: new Date(),
        },
      });

      const contributionStatus = 
        decision === CouncilDecision.APPROVED 
          ? ContributionStatus.APPROVED 
          : decision === CouncilDecision.REJECTED 
            ? ContributionStatus.REJECTED 
            : ContributionStatus.ESCALATED; // Keep escalated as 'ARCHIVED' state in UI

      // Apply to Contribution
      await tx.contribution.update({
        where: { id: councilCase.contributionId },
        data: { status: contributionStatus },
      });

      // If approved, trigger Knowledge Execution
      if (contributionStatus === ContributionStatus.APPROVED) {
        await this.executionService.approveContribution(councilCase.contributionId, tx);
      } else if (contributionStatus === ContributionStatus.REJECTED) {
        await this.executionService.rejectContribution(councilCase.contributionId, tx);
      }

      // Update trust for author (Fetch contribution securely)
      const contribution = await tx.contribution.findUnique({ where: { id: councilCase.contributionId } });
      if (contribution) {
        await this.trustService.updateTrustAfterContribution(
            contribution.authorId,
            contributionStatus,
            tx
        );
      }
    });
  }
}
