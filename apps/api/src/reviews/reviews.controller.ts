import { Controller, Post, Body, UseGuards } from '@nestjs/common';
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

  @Post('submit')
  @Roles(Role.REVIEWER, Role.ADMIN)
  reviewContribution(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.reviewContribution(
      createReviewDto.reviewerId,
      createReviewDto.contributionId,
      createReviewDto.approved ? 'APPROVE' : 'REJECT',
      createReviewDto.comment
    );
  }
}
