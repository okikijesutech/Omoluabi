import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KnowledgeType } from '@prisma/client';

@Injectable()
export class KnowledgeService {
  constructor(private prisma: PrismaService) {}

  async createKnowledgeUnit(payload: any) {
    // 1. Create unit
    const newKu = await this.prisma.knowledgeUnit.create({
      data: {
        type: payload.type as KnowledgeType,
        title: payload.title,
        description: payload.description,
      },
    });

    // 2. Attach dialect variations
    if (payload.dialectId && payload.textWithTone) {
      await this.prisma.knowledgeVariation.create({
        data: {
          knowledgeUnitId: newKu.id,
          dialectId: payload.dialectId,
          textWithTone: payload.textWithTone,
          phoneticGuide: payload.phoneticGuide,
          notes: payload.notes,
          audioUrl: payload.audioUrl,
        },
      });
    }

    return newKu;
  }

  async applyEdit(payload: any) {
    if (!payload.knowledgeUnitId) throw new BadRequestException('knowledgeUnitId missing');

    // Save previous version to revision history (Future implementation)

    // Apply changes
    return this.prisma.knowledgeUnit.update({
      where: { id: payload.knowledgeUnitId },
      data: {
        title: payload.title,
        description: payload.description,
      },
    });
  }

  async addDialectVariation(payload: any) {
    if (!payload.knowledgeUnitId) throw new BadRequestException('knowledgeUnitId missing');

    // Only create new variation, never modify existing variation
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
}
