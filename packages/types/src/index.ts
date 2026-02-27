export enum Difficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum ExerciseType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRANSLATE = 'TRANSLATE',
  MATCH = 'MATCH',
  LISTEN = 'LISTEN',
  AUDIO = 'AUDIO',
  IDENTIFY = 'IDENTIFY',
}

export enum RevisionStatus {
  DRAFT = 'DRAFT',
  PENDING_REVIEW = 'PENDING_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export enum ModerationAction {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  REQUEST_CHANGES = 'REQUEST_CHANGES',
}

export interface Language {
  id: string;
  code: string;
  name: string;
}

export interface LanguagePair {
  id: string;
  sourceLanguageId: string;
  targetLanguageId: string;
  sourceLanguage?: Language;
  targetLanguage?: Language;
}

export interface Curriculum {
  id: string;
  languagePairId: string;
  title: string;
  description?: string;
  modules?: CurriculumModule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CurriculumModule {
  id: string;
  curriculumId: string;
  title: string;
  order: number;
  lessons?: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  order: number;
  difficulty: Difficulty;
  exercises?: Exercise[];
  revisions?: ContentRevision[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  data: any; // Structured exercise content
  revisions?: ContentRevision[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentRevision {
  id: string;
  lessonId?: string;
  exerciseId?: string;
  isOfficial: boolean;
  createdBy: string;
  parentContentId?: string;
  versionNumber: number;
  status: RevisionStatus;
  data: any;
  logs?: ModerationLog[];
  createdAt: Date;
}

export interface ModerationLog {
  id: string;
  revisionId: string;
  moderatorId: string;
  comment?: string;
  action: ModerationAction;
  createdAt: Date;
}
