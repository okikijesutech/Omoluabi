import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '@prisma/client';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateCurriculumDto) {
    return this.curriculumService.createCurriculum(dto);
  }

  @Get()
  findByLanguagePair(
    @Query('languagePairId') languagePairId: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number
  ) {
    return this.curriculumService.findAllByLanguagePair(
      languagePairId, 
      skip ? Number(skip) : undefined, 
      take ? Number(take) : undefined
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.getCurriculumDetail(id);
  }

  @Post('modules')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createModule(@Body() dto: CreateModuleDto) {
    return this.curriculumService.createModule(dto);
  }

  @Post('lessons')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createLesson(@Body() dto: CreateLessonDto) {
    return this.curriculumService.createLesson(dto);
  }
}
