import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { ContentService } from './content.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ProposeRevisionDto } from './dto/propose-revision.dto';
import { ModerateRevisionDto } from './dto/moderate-revision.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('exercises')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createExercise(@Request() req, @Body() dto: CreateExerciseDto) {
    return this.contentService.createExercise(req.user, dto);
  }

  @Post('propose')
  @UseGuards(JwtAuthGuard)
  propose(@Request() req, @Body() dto: ProposeRevisionDto) {
    return this.contentService.proposeRevision({
      ...dto,
      createdBy: req.user.userId,
    });
  }

  @Patch('moderate/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.REVIEWER, UserRole.ADMIN)
  moderate(@Param('id') id: string, @Request() req, @Body() dto: ModerateRevisionDto) {
    return this.contentService.moderateRevision(req.user, id, dto);
  }

  @Post('submit/:id')
  @UseGuards(JwtAuthGuard)
  submit(@Request() req, @Param('id') id: string) {
    return this.contentService.submitRevision(req.user, id);
  }

  @Get('lesson/:lessonId/published')
  getPublished(@Param('lessonId') lessonId: string) {
    return this.contentService.getPublishedContent(lessonId);
  }

  @Get('exercise/:exerciseId/revisions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.REVIEWER, UserRole.ADMIN)
  getRevisions(
    @Param('exerciseId') exerciseId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number
  ) {
    return this.contentService.getExerciseRevisions(
      exerciseId,
      skip ? Number(skip) : undefined,
      take ? Number(take) : undefined
    );
  }

  @Get('compare/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.REVIEWER, UserRole.ADMIN)
  compare(@Param('id') id: string) {
    return this.contentService.getRevisionComparison(id);
  }

  @Get('compare/:id1/:id2')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.REVIEWER, UserRole.ADMIN)
  compareTwo(@Param('id1') id1: string, @Param('id2') id2: string) {
    return this.contentService.compareTwoRevisions(id1, id2);
  }

  @Post('rollback/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.REVIEWER, UserRole.ADMIN)
  rollback(@Param('id') id: string, @Request() req) {
    return this.contentService.rollbackRevision(id, req.user);
  }
}
