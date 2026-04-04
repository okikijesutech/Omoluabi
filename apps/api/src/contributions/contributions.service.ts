import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { ContributionStatus, ContributionType } from '@prisma/client';

@Injectable()
export class ContributionsService {
  constructor(private prisma: PrismaService) {}

  async submitContribution(dto: CreateContributionDto) {
    // 1. Validate dialect presence
    const dialectId = dto.dialectTag || dto.payload?.dialectId;
    if (!dialectId) {
      throw new BadRequestException('Dialect must be specified');
    }

    // 2. Prevent overwrite attempts for DIALECT_VARIATION
    if (dto.type === ContributionType.DIALECT_VARIATION) {
      this.ensureNoOverwrite(dto);
    }

    // 3. Create or Update KnowledgeUnit logic
    // In a real archival flow, a contribution might propose a NEW unit or an EDIT to an existing one
    const slug = dto.payload?.slug || this.slugify(dto.payload?.title || '');
    
    // 4. Create contribution record
    return this.prisma.contribution.create({
      data: {
        authorId: dto.authorId,
        type: dto.type,
        content: dto.payload,
        status: ContributionStatus.PENDING,
        ...(dto.knowledgeUnitId && { knowledgeUnitId: dto.knowledgeUnitId }),
        ...(dto.payload?.targetVariationId && { knowledgeVariationId: dto.payload.targetVariationId }),
      },
    });
  }

  private slugify(text: string) {
    return text.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private ensureNoOverwrite(dto: CreateContributionDto) {
    if (dto.type === ContributionType.DIALECT_VARIATION && dto.payload && dto.payload.targetVariationId) {
      throw new BadRequestException('Dialect variations cannot overwrite existing ones');
    }
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
