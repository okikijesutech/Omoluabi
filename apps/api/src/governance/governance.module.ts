import { Module } from '@nestjs/common';
import { TrustService } from './trust.service';
import { CouncilService } from './council.service';
import { CouncilVotesService } from './council-votes.service';
import { GovernanceExecutionService } from './governance-execution.service';

import { GovernanceController } from './governance.controller';

@Module({
  controllers: [GovernanceController],
  providers: [TrustService, CouncilService, CouncilVotesService, GovernanceExecutionService],
  exports: [TrustService, CouncilService, CouncilVotesService, GovernanceExecutionService],
})
export class GovernanceModule {}
