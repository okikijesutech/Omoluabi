import { Controller, Post, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('submit')
  reviewContribution(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.reviewContribution(
      createReviewDto.reviewerId,
      createReviewDto.contributionId,
      createReviewDto.approved ? 'APPROVE' : 'REJECT',
      createReviewDto.comment
    );
  }
}
