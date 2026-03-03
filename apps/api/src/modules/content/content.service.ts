import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { User, Role } from '@prisma/client';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  private checkRole(user: User, allowedRoles: Role[]) {
    if (!allowedRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have permission to perform this action');
    }
  }

  async createKnowledgeUnit(dto: any) {
    return this.prisma.knowledgeUnit.create({ data: dto });
  }

  async proposeContribution(user: User, dto: any) {
    return this.prisma.contribution.create({
      data: {
        ...dto,
        userId: user.id
      }
    });
  }

  async submitReview(user: User, contributionId: string, dto: any) {
    this.checkRole(user, [Role.FOUNDER, Role.CULTURAL_COUNCIL, Role.REVIEWER]);
    return this.prisma.review.create({
      data: {
        ...dto,
        contributionId,
        reviewerId: user.id
      }
    });
  }
}
