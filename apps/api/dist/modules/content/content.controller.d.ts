import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    createKnowledgeUnit(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.KnowledgeType;
        standardText: string;
        translation: string;
        culturalContext: string | null;
    }>;
    proposeContribution(req: any, dto: any): Promise<{
        id: string;
        createdAt: Date;
        proposedContent: string;
        status: import(".prisma/client").$Enums.ContributionStatus;
        userId: string;
        knowledgeUnitId: string | null;
    }>;
    submitReview(req: any, id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        comment: string | null;
        approved: boolean;
        disputeFlag: boolean;
        contributionId: string;
        reviewerId: string;
    }>;
}
