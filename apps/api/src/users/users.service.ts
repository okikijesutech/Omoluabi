import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        trustScore: true,
        xp: true,
        level: true,
        badges: true,
        approvedCount: true,
        rejectedCount: true,
        reviewAccuracy: true,
        totalReviews: true,
        correctReviews: true,
        createdAt: true,
        contributions: {
          take: 50,
          orderBy: { createdAt: 'desc' },
          include: {
            knowledgeUnit: true,
            knowledgeVariation: {
              include: {
                dialect: true,
              }
            }
          }
        },
        reviews: {
          take: 50,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getLeaderboard(limit: number = 100) {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        trustScore: true,
        xp: true,
        level: true,
        badges: true,
        approvedCount: true,
      },
      orderBy: [
        { xp: 'desc' },
        { trustScore: 'desc' },
      ],
      take: limit,
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
