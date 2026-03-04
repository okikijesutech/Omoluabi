import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): Promise<{
        id: string;
        approved: boolean;
        comment: string | null;
        createdAt: Date;
        contributionId: string;
        reviewerId: string;
    }>;
}
