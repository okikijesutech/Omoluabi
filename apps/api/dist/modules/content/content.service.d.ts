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
        phoneticExplanation: string | null;
        culturalContext: string | null;
        sourceAttribution: string | null;
        validationStatus: import(".prisma/client").$Enums.ValidationStatus;
    }>;
    proposeContribution(user: User, dto: any): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.ContributionType;
        content: string;
        status: import(".prisma/client").$Enums.ContributionStatus;
        reviewCount: number;
        approvalScore: number;
        userId: string;
        knowledgeUnitId: string | null;
    }>;
    submitReview(user: User, contributionId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        decision: import(".prisma/client").$Enums.ReviewDecision;
        comment: string | null;
        contributionId: string;
        reviewerId: string;
    }>;
}
