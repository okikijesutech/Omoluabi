import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FOUNDER)
  create(@Body() dto: any) {
    return this.languageService.createLanguage(dto);
  }

  @Get()
  findAll() {
    return this.languageService.findAllLanguages();
  }
}
