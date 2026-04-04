import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('reviews')
@UseGuards(AuthGuard, RolesGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get('pending')
  @Roles(Role.REVIEWER, Role.ADMIN)
  findAllPending() {
    return this.reviewsService.findAllPending();
  }

  @Post('submit')
  @Roles(Role.REVIEWER, Role.ADMIN)
  reviewContribution(@Request() req: any, @Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.reviewContribution(
      req.user.id,
      createReviewDto.contributionId,
      createReviewDto.approved ? 'APPROVE' : 'REJECT',
      createReviewDto.comment
    );
  }
}
