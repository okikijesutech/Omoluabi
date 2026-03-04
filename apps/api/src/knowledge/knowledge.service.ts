import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KnowledgeType, EntityType, ChangeType } from '@prisma/client';

@Injectable()
export class KnowledgeService {
  constructor(private prisma: PrismaService) {}

  /**
   * Universal snapshot utility for preservation audit logs.
   */
  private async recordRevision(params: {
    entityType: EntityType;
    entityId: string;
    previousData: any;
    newData: any;
    changeType: ChangeType;
    userId: string;
    contributionId?: string;
    tx?: any; // Optional transaction client
  }) {
    const db = params.tx || this.prisma;

    const lastRevision = await db.revisionHistory.findFirst({
      where: { entityId: params.entityId },
      orderBy: { entityVersion: 'desc' },
    });

    const nextVersion = (lastRevision?.entityVersion || 0) + 1;

    return db.revisionHistory.create({
      data: {
        entityType: params.entityType,
        entityId: params.entityId,
        entityVersion: nextVersion,
        previousData: params.previousData,
        newData: params.newData,
        changeType: params.changeType,
        contributionId: params.contributionId,
        createdById: params.userId,
      },
    });
  }

  async createKnowledgeUnit(payload: any) {
    const slug = this.generateSlug(payload.title);
    
    // 1. Create unit
    const newKu = await this.prisma.knowledgeUnit.create({
      data: {
        type: payload.type as KnowledgeType,
        title: payload.title,
        slug,
        normalizedTitle: this.normalizeText(payload.title),
        description: payload.description,
      },
    });

    // 2. Attach dialect variations
    if (payload.dialectId && payload.textWithTone) {
      await this.addDialectVariation({
        knowledgeUnitId: newKu.id,
        ...payload
      });
    }

    return newKu;
  }

  private generateSlug(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove tone marks for slug
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  private normalizeText(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  async applyEdit(payload: any, userId: string, contributionId?: string) {
    if (!payload.knowledgeUnitId) throw new BadRequestException('knowledgeUnitId missing');

    const previousUnit = await this.prisma.knowledgeUnit.findUnique({
      where: { id: payload.knowledgeUnitId },
    });

    if (!previousUnit) throw new BadRequestException('KnowledgeUnit not found');

    const newData: any = {
      title: payload.title,
      description: payload.description,
    };

    // If title changed, synchronize slug and normalizedTitle to prevent drift
    if (payload.title && payload.title !== previousUnit.title) {
      newData.slug = this.generateSlug(payload.title);
      newData.normalizedTitle = this.normalizeText(payload.title);
    }

    // Snapshot
    await this.recordRevision({
      entityType: EntityType.KNOWLEDGE_UNIT,
      entityId: payload.knowledgeUnitId,
      previousData: previousUnit as any,
      newData: newData as any,
      changeType: ChangeType.EDIT,
      userId,
      contributionId,
    });

    // Apply
    return this.prisma.knowledgeUnit.update({
      where: { id: payload.knowledgeUnitId },
      data: newData,
    });
  }

  async applyVariationEdit(payload: any, userId: string, contributionId?: string) {
    if (!payload.targetVariationId) throw new BadRequestException('targetVariationId missing');

    const previousVar = await this.prisma.knowledgeVariation.findUnique({
      where: { id: payload.targetVariationId },
    });

    if (!previousVar) throw new BadRequestException('KnowledgeVariation not found');

    const newData: any = {
      textWithTone: payload.textWithTone,
      phoneticGuide: payload.phoneticGuide,
      notes: payload.notes,
      audioUrl: payload.audioUrl,
    };

    // Snapshot
    await this.recordRevision({
      entityType: EntityType.KNOWLEDGE_VARIATION,
      entityId: payload.targetVariationId,
      previousData: previousVar as any,
      newData: newData as any,
      changeType: ChangeType.EDIT,
      userId,
      contributionId,
    });

    // Apply
    return this.prisma.knowledgeVariation.update({
      where: { id: payload.targetVariationId },
      data: newData,
    });
  }

  async archiveKnowledgeUnit(id: string, userId: string) {
    const previous = await this.prisma.knowledgeUnit.findUnique({ where: { id } });
    if (!previous) throw new BadRequestException('Unit not found');

    await this.recordRevision({
      entityType: EntityType.KNOWLEDGE_UNIT,
      entityId: id,
      previousData: previous as any,
      newData: { isArchived: true } as any,
      changeType: ChangeType.DELETE_ATTEMPT,
      userId,
    });

    return this.prisma.knowledgeUnit.update({
      where: { id },
      data: { isArchived: true },
    });
  }

  async archiveVariation(id: string, userId: string) {
    const previous = await this.prisma.knowledgeVariation.findUnique({ where: { id } });
    if (!previous) throw new BadRequestException('Variation not found');

    await this.recordRevision({
      entityType: EntityType.KNOWLEDGE_VARIATION,
      entityId: id,
      previousData: previous as any,
      newData: { isArchived: true } as any,
      changeType: ChangeType.DELETE_ATTEMPT,
      userId,
    });

    return this.prisma.knowledgeVariation.update({
      where: { id },
      data: { isArchived: true },
    });
  }

  async addDialectVariation(payload: any) {
    if (!payload.knowledgeUnitId) throw new BadRequestException('knowledgeUnitId missing');
    if (!payload.dialectId) throw new BadRequestException('dialectId missing');

    // Audit: Explicit validation before creation
    const dialect = await this.prisma.dialect.findUnique({ where: { id: payload.dialectId } });
    if (!dialect) throw new BadRequestException('Dialect not found');

    return this.prisma.knowledgeVariation.create({
      data: {
        knowledgeUnitId: payload.knowledgeUnitId,
        dialectId: payload.dialectId,
        textWithTone: payload.textWithTone,
        phoneticGuide: payload.phoneticGuide,
        notes: payload.notes,
        audioUrl: payload.audioUrl,
      },
    });
  }

  async findAll(type?: KnowledgeType) {
    return this.prisma.knowledgeUnit.findMany({
      where: {
        ...(type && { type }),
        isArchived: false,
      },
      include: {
        variations: {
          where: { isArchived: false },
          include: { dialect: true },
        },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.knowledgeUnit.findFirst({
      where: { id, isArchived: false },
      include: {
        variations: {
          where: { isArchived: false },
          include: { dialect: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.knowledgeUnit.findFirst({
      where: { slug, isArchived: false },
      include: {
        variations: {
          where: { isArchived: false },
          include: { dialect: true },
        },
      },
    });
  }

  async search(query: { keyword?: string; dialectId?: string; type?: KnowledgeType; limit?: number; offset?: number }) {
    const { keyword, dialectId, type, limit = 20, offset = 0 } = query;

    const where: any = {
      isArchived: false,
      ...(type && { type }),
    };

    if (keyword) {
      const normalized = this.normalizeText(keyword);
      where.OR = [
        { title: { contains: keyword, mode: 'insensitive' } },
        { normalizedTitle: { contains: normalized, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } },
      ];
    }

    if (dialectId) {
      where.variations = {
        some: {
          dialectId,
          isArchived: false,
        },
      };
    }

    return this.prisma.knowledgeUnit.findMany({
      where,
      include: {
        variations: {
          where: { isArchived: false },
          include: { dialect: true },
        },
      },
      take: limit,
      skip: offset,
      orderBy: { createdAt: 'desc' },
    });
  }
}
