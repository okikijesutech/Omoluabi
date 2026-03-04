import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { KnowledgeModule } from '../knowledge/knowledge.module';
import { GovernanceModule } from '../governance/governance.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [KnowledgeModule, GovernanceModule, AuthModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
