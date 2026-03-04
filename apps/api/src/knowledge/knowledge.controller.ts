import { Controller, Get, Param, Query, Delete, UseGuards, Req } from '@nestjs/common';
import { KnowledgeService } from './knowledge.service';
import { KnowledgeType, Role } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Get()
  findAll(@Query('type') type?: KnowledgeType) {
    return this.knowledgeService.findAll(type);
  }

  @Get('search')
  search(
    @Query('keyword') keyword?: string,
    @Query('dialectId') dialectId?: string,
    @Query('type') type?: KnowledgeType,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.knowledgeService.search({
      keyword,
      dialectId,
      type,
      limit: limit ? parseInt(limit, 10) : undefined,
      offset: offset ? parseInt(offset, 10) : undefined,
    });
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.knowledgeService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.knowledgeService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  archive(@Param('id') id: string, @Req() req: any) {
    return this.knowledgeService.archiveKnowledgeUnit(id, req.user.sub);
  }
}
