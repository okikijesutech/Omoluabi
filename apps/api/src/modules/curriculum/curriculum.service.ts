import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { CreateModuleDto } from './dto/create-module.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class CurriculumService {
  constructor(private prisma: PrismaService) {}

  async createCurriculum(dto: CreateCurriculumDto) {
    const pair = await this.prisma.languagePair.findUnique({
      where: { id: dto.languagePairId },
    });
    if (!pair) {
      throw new NotFoundException('Language pair not found');
    }
    return this.prisma.curriculum.create({
      data: dto,
    });
  }

  async findAllByLanguagePair(languagePairId: string, skip = 0, take = 50) {
    return this.prisma.curriculum.findMany({
      where: { 
        languagePairId,
        deletedAt: null
      },
      skip,
      take,
      include: {
        modules: {
          where: { deletedAt: null },
          include: {
            lessons: {
              where: { deletedAt: null }
            },
          },
        },
      },
    });
  }

  async createModule(dto: CreateModuleDto) {
    const parent = await this.prisma.curriculum.findUnique({
      where: { id: dto.curriculumId },
    });
    if (!parent) {
      throw new NotFoundException('Curriculum not found');
    }
    return this.prisma.curriculumModule.create({
      data: dto,
    });
  }

  async createLesson(dto: CreateLessonDto) {
    const parent = await this.prisma.curriculumModule.findUnique({
      where: { id: dto.moduleId },
    });
    if (!parent) {
      throw new NotFoundException('Module not found');
    }
    return this.prisma.lesson.create({
      data: dto,
    });
  }

  async getCurriculumDetail(id: string) {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
    if (!curriculum) {
      throw new NotFoundException('Curriculum not found');
    }
    return curriculum;
  }
}
