import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LearningPathsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.learningPath.findMany({
      include: {
        _count: {
          select: { units: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const path = await this.prisma.learningPath.findUnique({
      where: { id },
      include: {
        units: {
          orderBy: { order: 'asc' },
          include: {
            knowledgeUnit: {
              include: {
                variations: {
                  take: 1, // Get top variation for preview
                  include: { dialect: true },
                },
              },
            },
          },
        },
      },
    });

    if (!path) throw new NotFoundException('Learning Path not found');
    return path;
  }
}
