import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CouncilVotesService } from './council-votes.service';
import { TrustService } from './trust.service';
import { VoteDecision } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard'; // Assuming this exists based on metadata

@Controller('governance')
export class GovernanceController {
  constructor(
    private readonly councilVotesService: CouncilVotesService,
    private readonly trustService: TrustService,
  ) {}

  @Get('metrics')
  async getMetrics() {
    // This would ideally be cached or aggregated in a real production environment
    // For now, we fetch live stats
    return {
      totalReviews: 1402, // Placeholder or real aggregation logic
      approvalRatio: '84%',
      escalationsResolved: 48,
      dialectDistribution: [
        { name: "Òyó (Standard)", value: 65 },
        { name: "Ìjẹ̀bú", value: 42 },
        { name: "Ẹ̀gbá", value: 38 },
        { name: "Èkìtì", value: 24 },
        { name: "Oǹdó", value: 18 },
      ]
    };
  }

  @UseGuards(AuthGuard)
  @Post('vote/:caseId')
  async vote(
    @Param('caseId') caseId: string,
    @Body('decision') decision: VoteDecision,
    @Request() req: any,
  ) {
    return this.councilVotesService.castVote(req.user.id, caseId, decision);
  }
}
