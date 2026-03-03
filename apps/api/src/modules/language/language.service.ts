import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class LanguageService {
  constructor(private prisma: PrismaService) {}

  async createLanguage(dto: any) {
    return this.prisma.language.create({ data: dto });
  }

  async findAllLanguages() {
    return this.prisma.language.findMany();
  }
}
