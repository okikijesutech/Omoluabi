export class ProposeRevisionDto {
  lessonId?: string;
  exerciseId?: string;
  isOfficial?: boolean;
  createdBy: string;
  parentContentId?: string;
  status?: 'DRAFT' | 'PENDING_REVIEW' | 'APPROVED';
  data: any;
}
