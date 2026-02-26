export type QuestionType = "multiple-choice" | "translate" | "match" | "listen" | "audio";

export interface Option {
  id: number;
  answer: string;
  img?: string;
  audio?: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options: Option[];
  correctAnswer: string | number;
  sentence?: string;
  translation?: string;
  audioUrl?: string;
}

export interface LessonContent {
  id: string;
  title: string;
  language: string;
  questions: Question[];
}

export interface SectionContent {
  level: number;
  id: number;
  category?: string;
  lessonId?: string;
}

export interface Section {
  id?: number;
  section: string;
  unit: string;
  unitname: string;
  unitcolor: string;
  unitshadow: string;
  sectionContent?: SectionContent[];
}

export interface LevelsSection extends Omit<Section, "unitname"> {
  id: number;
  name: string;
  sectionContent: SectionContent[];
}
