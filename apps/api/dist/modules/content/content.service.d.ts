import { PrismaService } from '../../database/prisma.service';
import { User } from '@prisma/client';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    private checkRole;
    createKnowledgeUnit(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.KnowledgeType;
        standardText: string;
        translation: string;
        culturalContext: string | null;
    }>;
    proposeContribution(user: User, dto: any): Promise<{
        id: string;
        createdAt: Date;
        proposedContent: string;
        status: import(".prisma/client").$Enums.ContributionStatus;
        userId: string;
        knowledgeUnitId: string | null;
    }>;
    submitReview(user: User, contributionId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        comment: string | null;
        approved: boolean;
        disputeFlag: boolean;
        contributionId: string;
        reviewerId: string;
    }>;
}
