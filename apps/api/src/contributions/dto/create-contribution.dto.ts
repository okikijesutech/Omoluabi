import { ContributionType } from '@prisma/client';

export class CreateContributionDto {
  type: ContributionType;
  knowledgeUnitId?: string;
  authorId: string;
  content: any; // Storing the proposed changes as JSON
  comment?: string;
}
