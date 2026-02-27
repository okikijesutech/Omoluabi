import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { CreateLanguagePairDto } from './dto/create-language-pair.dto';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  create(@Body() createLanguageDto: CreateLanguageDto) {
    return this.languageService.createLanguage(createLanguageDto);
  }

  @Get()
  findAll() {
    return this.languageService.findAllLanguages();
  }

  @Post('pairs')
  createPair(@Body() createLanguagePairDto: CreateLanguagePairDto) {
    return this.languageService.createLanguagePair(createLanguagePairDto);
  }

  @Get('pairs')
  findAllPairs() {
    return this.languageService.findAllLanguagePairs();
  }
}
