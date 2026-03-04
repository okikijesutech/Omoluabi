import { ContributionType } from '@prisma/client';

export class CreateContributionDto {
  type: ContributionType;
  dialectTag?: string; // Corresponds to dialectId
  authorId: string;
  payload: any; // Storing the proposed changes as JSON
  knowledgeUnitId?: string;
}
