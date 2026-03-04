import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DialectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.dialect.findMany();
  }

  async findOne(id: string) {
    const dialect = await this.prisma.dialect.findUnique({
      where: { id },
      include: {
        variations: {
          include: { knowledgeUnit: true },
        },
      },
    });

    if (!dialect) throw new NotFoundException('Dialect not found');
    return dialect;
  }
}
