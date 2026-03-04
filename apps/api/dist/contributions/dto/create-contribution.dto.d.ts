import { ContributionType } from '@prisma/client';
export declare class CreateContributionDto {
    type: ContributionType;
    knowledgeUnitId?: string;
    authorId: string;
    content: any;
    comment?: string;
}
