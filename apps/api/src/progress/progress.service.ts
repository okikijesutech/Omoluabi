import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getUserProgress(userId: string) {
    return this.prisma.userProgress.findMany({
      where: { userId },
      include: {
        knowledgeUnit: true,
      },
    });
  }

  async markAsCompleted(userId: string, knowledgeUnitId: string, completed: boolean = true) {
    return this.prisma.userProgress.upsert({
      where: {
        user_knowledge_unique: {
          userId,
          knowledgeUnitId,
        },
      },
      update: {
        completed,
        lastReviewedAt: new Date(),
      },
      create: {
        userId,
        knowledgeUnitId,
        completed,
        lastReviewedAt: new Date(),
      },
    });
  }
}
