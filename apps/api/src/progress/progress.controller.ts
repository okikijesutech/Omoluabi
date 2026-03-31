import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('progress')
@UseGuards(AuthGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  getUserProgress(@Req() req: any) {
    return this.progressService.getUserProgress(req.user.id || req.user.sub);
  }

  @Post('complete/:knowledgeUnitId')
  markAsCompleted(
    @Param('knowledgeUnitId') knowledgeUnitId: string,
    @Body('completed') completed: boolean,
    @Req() req: any,
  ) {
    return this.progressService.markAsCompleted(req.user.id || req.user.sub, knowledgeUnitId, completed ?? true);
  }
}
