import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async getMessages(limit = 50) {
    return this.prisma.chatMessage.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            level: true,
          }
        }
      }
    });
  }

  async sendMessage(userId: string, content: string) {
    return this.prisma.chatMessage.create({
      data: {
        content,
        userId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            level: true,
          }
        }
      }
    });
  }
}
