import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CouncilStatus } from '@prisma/client';

@Injectable()
export class CouncilService {
  constructor(private prisma: PrismaService) {}

  async createCouncilCase(contributionId: string) {
    // 1. Create case
    const councilCase = await this.prisma.councilCase.create({
      data: {
        contributionId,
        status: CouncilStatus.OPEN,
      },
    });

    // 2. Select rotational members (Top 7 most trusted)
    const members = await this.prisma.user.findMany({
      where: {
        trustScore: { gte: 100 },
        reviewAccuracy: { gte: 0.8 },
        approvedCount: { gte: 30 },
      },
      orderBy: { trustScore: 'desc' },
      take: 7,
    });

    // 3. Notify members (Future implementation)
    return councilCase;
  }
}
