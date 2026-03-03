import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('content')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Post('knowledge-unit')
  @Roles(Role.FOUNDER, Role.CULTURAL_COUNCIL, Role.REVIEWER)
  createKnowledgeUnit(@Body() dto: any) {
    return this.contentService.createKnowledgeUnit(dto);
  }

  @Post('contribution')
  proposeContribution(@Request() req: any, @Body() dto: any) {
    return this.contentService.proposeContribution(req.user, dto);
  }

  @Post('review/:id')
  @Roles(Role.FOUNDER, Role.CULTURAL_COUNCIL, Role.REVIEWER)
  submitReview(@Request() req: any, @Param('id') id: string, @Body() dto: any) {
    return this.contentService.submitReview(req.user, id, dto);
  }
}
