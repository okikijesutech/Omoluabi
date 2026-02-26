export type Difficulty = "beginner" | "intermediate" | "advanced";

export type ExerciseType = 
  | "multiple-choice" 
  | "translate" 
  | "match" 
  | "listen" 
  | "audio" 
  | "identify";

export interface VerificationMetadata {
  status: "draft" | "pending_review" | "verified";
  reviewCount: number;
  contributors: string[];
  lastVerifiedAt?: string;
}

export interface Option {
  id: string | number;
  content: string;
  translation?: string;
  img?: string;
  audio?: string;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  options: Option[];
  correctAnswer: string | number;
  sentence?: string;
  translation?: string;
  audioUrl?: string;
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  difficulty: Difficulty;
  exercises: Exercise[];
  verification: VerificationMetadata;
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  color: string;
  shadowColor: string;
  lessons: string[]; // List of lesson IDs
}

export interface Course {
  id: string;
  language: string;
  title: string;
  description: string;
  units: Unit[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  xp: number;
  streak: number;
  lives: number;
  lastActive: string;
}
