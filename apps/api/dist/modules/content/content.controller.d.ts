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
        phoneticExplanation: string | null;
        culturalContext: string | null;
        sourceAttribution: string | null;
        validationStatus: import(".prisma/client").$Enums.ValidationStatus;
    }>;
    proposeContribution(req: any, dto: any): Promise<{
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
    submitReview(req: any, id: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        decision: import(".prisma/client").$Enums.ReviewDecision;
        comment: string | null;
        contributionId: string;
        reviewerId: string;
    }>;
}
