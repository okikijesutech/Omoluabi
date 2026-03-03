import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CurriculumService {
  constructor(private prisma: PrismaService) {}

  async createCourse(dto: any) {
    return this.prisma.course.create({ data: dto });
  }

  async findAllCoursesByLanguage(languageId: string, skip = 0, take = 50) {
    return this.prisma.course.findMany({
      where: { languageId },
      skip,
      take,
      include: {
        levels: {
          include: {
            modules: {
              include: {
                lessons: true
              }
            }
          }
        }
      }
    });
  }

  async createLevel(dto: any) {
    return this.prisma.level.create({ data: dto });
  }

  async createModule(dto: any) {
    return this.prisma.module.create({ data: dto });
  }

  async createLesson(dto: any) {
    return this.prisma.lesson.create({ data: dto });
  }

  async getCourseDetail(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        levels: {
          orderBy: { order: 'asc' },
          include: {
            modules: {
              orderBy: { order: 'asc' },
              include: {
                lessons: true
              },
            },
          },
        },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }
}
