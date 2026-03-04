import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ContributionsService } from './contributions.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('contributions')
@UseGuards(AuthGuard, RolesGuard)
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Post('submit')
  @Roles(Role.CONTRIBUTOR, Role.REVIEWER, Role.ADMIN)
  submitContribution(@Body() createContributionDto: CreateContributionDto) {
    return this.contributionsService.submitContribution(createContributionDto);
  }

  @Get('pending')
  @Roles(Role.REVIEWER, Role.ADMIN)
  findAllPending() {
    return this.contributionsService.findAllPending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contributionsService.findOne(id);
  }
}
