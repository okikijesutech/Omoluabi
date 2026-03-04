import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    createReview(dto: CreateReviewDto): Promise<{
        id: string;
        comment: string | null;
        createdAt: Date;
        contributionId: string;
        reviewerId: string;
        approved: boolean;
    }>;
    private evaluateThresholds;
    private rejectContribution;
    private executeApproval;
}
