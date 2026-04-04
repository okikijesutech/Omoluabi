export type KnowledgeStatus = 'pending_review' | 'verified' | 'rejected';

export interface VerificationInfo {
  status: KnowledgeStatus;
  reviewCount: number;
  contributors: string[];
}

export interface Lesson {
  id: string;
  type: 'word' | 'proverb' | 'phrase';
  title: string;
  description: string;
  dialectId: string;
  verification: VerificationInfo;
}
