import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { ContributionStatus } from '@prisma/client';

@Injectable()
export class ContributionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContributionDto) {
    if (dto.type !== 'CREATE' && !dto.knowledgeUnitId) {
      throw new BadRequestException('knowledgeUnitId is required for EDIT and DIALECT_VARIATION types');
    }

    if (dto.type === 'CREATE') {
      // Validate that the new knowledge unit has dialect info if required by rules
      const content: any = dto.content;
      if (!content.dialectId) {
        throw new BadRequestException('A strictly protected system requires new knowledge to be contextualized by a dialect');
      }
    }

    return this.prisma.contribution.create({
      data: {
        type: dto.type,
        status: ContributionStatus.PENDING,
        content: dto.content,
        comment: dto.comment,
        author: { connect: { id: dto.authorId } },
        ...(dto.knowledgeUnitId && {
          knowledgeUnit: { connect: { id: dto.knowledgeUnitId } },
        }),
      },
    });
  }

  async findAllPending() {
    return this.prisma.contribution.findMany({
      where: { status: ContributionStatus.PENDING },
      include: { author: true, knowledgeUnit: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.contribution.findUnique({
      where: { id },
      include: { author: true, knowledgeUnit: true, reviews: true },
    });
  }
}
