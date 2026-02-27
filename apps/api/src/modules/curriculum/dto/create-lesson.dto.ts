export enum LessonDifficulty {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export class CreateLessonDto {
  moduleId: string;
  title: string;
  order: number;
  difficulty: LessonDifficulty;
}
