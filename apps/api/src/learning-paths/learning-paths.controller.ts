import { Controller, Get, Param } from '@nestjs/common';
import { LearningPathsService } from './learning-paths.service';

@Controller('learning-paths')
export class LearningPathsController {
  constructor(private readonly learningPathsService: LearningPathsService) {}

  @Get()
  findAll() {
    return this.learningPathsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningPathsService.findOne(id);
  }
}
