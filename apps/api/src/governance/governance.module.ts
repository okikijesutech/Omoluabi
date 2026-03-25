import { Module } from '@nestjs/common';
import { TrustService } from './trust.service';
import { CouncilService } from './council.service';
import { CouncilVotesService } from './council-votes.service';
import { GovernanceExecutionService } from './governance-execution.service';
import { ReviewsService } from './reviews.service';

import { GovernanceController } from './governance.controller';

@Module({
  controllers: [GovernanceController],
  providers: [
    CouncilService,
    CouncilVotesService,
    TrustService,
    GovernanceExecutionService,
    ReviewsService,
  ],
  exports: [CouncilService, CouncilVotesService, TrustService, ReviewsService],
})
export class GovernanceModule {}
