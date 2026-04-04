import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GovernanceAnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const [totalReviews, totalContributions, escalationsResolved, dialectCounts] = await Promise.all([
      this.prisma.review.count(),
      this.prisma.contribution.count(),
      this.prisma.councilCase.count({ where: { status: 'RESOLVED' } }),
      this.prisma.knowledgeVariation.groupBy({
        by: ['dialectId'],
        _count: { _all: true },
        orderBy: { _count: { dialectId: 'desc' } },
        take: 5
      })
    ]);

    // Fetch names for dialects
    const dialectNames = await this.prisma.dialect.findMany({
      where: { id: { in: dialectCounts.map(d => d.dialectId) } },
      select: { id: true, name: true }
    });

    const dialectDistribution = dialectCounts.map(d => ({
      name: dialectNames.find(n => n.id === d.dialectId)?.name || 'Unknown',
      value: d._count._all
    }));

    const approvalRatio = totalReviews > 0 
      ? Math.round(((await this.prisma.review.count({ where: { approved: true } })) / totalReviews) * 100)
      : 0;

    return {
      totalReviews,
      totalContributions,
      approvalRatio: `${approvalRatio}%`,
      escalationsResolved,
      dialectDistribution
    };
  }
}
