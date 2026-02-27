import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateLanguagePairDto } from './dto/create-language-pair.dto';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  async createLanguage(dto: CreateLanguageDto) {
    const existing = await this.prisma.language.findUnique({
      where: { code: dto.code },
    });
    if (existing) {
      throw new ConflictException(`Language with code ${dto.code} already exists`);
    }
    return this.prisma.language.create({
      data: dto,
    });
  }

  async findAllLanguages() {
    return this.prisma.language.findMany();
  }

  async createLanguagePair(dto: CreateLanguagePairDto) {
    const { sourceLanguageId, targetLanguageId } = dto;
    
    // Check if both languages exist
    const [source, target] = await Promise.all([
      this.prisma.language.findUnique({ where: { id: sourceLanguageId } }),
      this.prisma.language.findUnique({ where: { id: targetLanguageId } }),
    ]);

    if (!source || !target) {
      throw new NotFoundException('One or both languages not found');
    }

    // Check if pair already exists
    const existing = await this.prisma.languagePair.findUnique({
      where: {
        sourceLanguageId_targetLanguageId: {
          sourceLanguageId,
          targetLanguageId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Language pair already exists');
    }

    return this.prisma.languagePair.create({
      data: dto,
    });
  }

  async findAllLanguagePairs() {
    return this.prisma.languagePair.findMany({
      include: {
        sourceLanguage: true,
        targetLanguage: true,
      },
    });
  }
}
