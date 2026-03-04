import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get(':userId')
  getUserProgress(@Param('userId') userId: string) {
    return this.progressService.getUserProgress(userId);
  }

  @Post(':userId/complete/:knowledgeUnitId')
  markAsCompleted(
    @Param('userId') userId: string,
    @Param('knowledgeUnitId') knowledgeUnitId: string,
    @Body('completed') completed?: boolean,
  ) {
    return this.progressService.markAsCompleted(userId, knowledgeUnitId, completed);
  }
}
