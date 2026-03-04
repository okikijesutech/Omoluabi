import { Controller, Get, Param } from '@nestjs/common';
import { DialectsService } from './dialects.service';

@Controller('dialects')
export class DialectsController {
  constructor(private readonly dialectsService: DialectsService) {}

  @Get()
  findAll() {
    return this.dialectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dialectsService.findOne(id);
  }
}
