import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('curriculum')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post('course')
  @Roles(Role.FOUNDER, Role.CULTURAL_COUNCIL)
  createCourse(@Body() dto: any) {
    return this.curriculumService.createCourse(dto);
  }

  @Get('courses')
  findAllByLanguage(@Query('languageId') languageId: string) {
    if (!languageId) return [];
    return this.curriculumService.findAllCoursesByLanguage(languageId);
  }

  @Get('course/:id')
  getCourseDetail(@Param('id') id: string) {
    return this.curriculumService.getCourseDetail(id);
  }

  @Post('level')
  @Roles(Role.FOUNDER, Role.CULTURAL_COUNCIL)
  createLevel(@Body() dto: any) {
    return this.curriculumService.createLevel(dto);
  }

  @Post('module')
  @Roles(Role.FOUNDER, Role.CULTURAL_COUNCIL)
  createModule(@Body() dto: any) {
    return this.curriculumService.createModule(dto);
  }

  @Post('lesson')
  @Roles(Role.FOUNDER, Role.CULTURAL_COUNCIL, Role.REVIEWER)
  createLesson(@Body() dto: any) {
    return this.curriculumService.createLesson(dto);
  }
}
