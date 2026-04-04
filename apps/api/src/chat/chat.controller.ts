import { Controller, Get, Post, Body, UseGuards, Req, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getMessages(@Query('limit') limit?: number) {
    return this.chatService.getMessages(limit ? +limit : 50);
  }

  @Post()
  @UseGuards(AuthGuard)
  async sendMessage(@Req() req: any, @Body('content') content: string) {
    const userId = req.user.sub; // From JWT payload
    return this.chatService.sendMessage(userId, content);
  }
}
