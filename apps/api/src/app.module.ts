import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DialectsModule } from './dialects/dialects.module';
import { KnowledgeModule } from './knowledge/knowledge.module';
import { ContributionsModule } from './contributions/contributions.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LearningPathsModule } from './learning-paths/learning-paths.module';
import { ProgressModule } from './progress/progress.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, DialectsModule, KnowledgeModule, ContributionsModule, ReviewsModule, LearningPathsModule, ProgressModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
