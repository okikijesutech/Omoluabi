import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CouncilVotesService } from './council-votes.service';
import { ReviewsService } from './reviews.service';
import { TrustService } from './trust.service';
import { VoteDecision } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard'; 

@Controller('governance')
export class GovernanceController {
  constructor(
    private readonly councilVotesService: CouncilVotesService,
    private readonly reviewsService: ReviewsService,
    private readonly trustService: TrustService,
  ) {}

  @Get('metrics')
  async getMetrics() {
    return {
      totalReviews: 1402,
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

  @UseGuards(AuthGuard)
  @Get('pending')
  async getPending() {
    return this.reviewsService.getPendingQueue();
  }

  @UseGuards(AuthGuard)
  @Get('compare/:id')
  async getCompare(@Param('id') id: string) {
    return this.reviewsService.getComparisonData(id);
  }

  @UseGuards(AuthGuard)
  @Post('review/:contributionId')
  async review(
    @Param('contributionId') contributionId: string,
    @Body('approved') approved: boolean,
    @Body('comment') comment: string,
    @Request() req: any,
  ) {
    return this.reviewsService.submitReview(req.user.id, contributionId, approved, comment);
  }

  @UseGuards(AuthGuard)
  @Post('escalate/:contributionId')
  async escalate(
    @Param('contributionId') contributionId: string,
    @Request() req: any,
  ) {
    // 1. Mark as escalated in Contribution
    await this.reviewsService.escalate(contributionId);
    return { success: true, message: 'Contribution escalated to Council' };
  }
}
