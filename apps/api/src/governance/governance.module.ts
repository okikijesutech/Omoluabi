import { Module } from '@nestjs/common';
import { TrustService } from './trust.service';
import { CouncilService } from './council.service';

@Module({
  providers: [TrustService, CouncilService],
  exports: [TrustService, CouncilService],
})
export class GovernanceModule {}
