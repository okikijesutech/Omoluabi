export enum ExerciseType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRANSLATE = 'TRANSLATE',
  MATCH = 'MATCH',
  LISTEN = 'LISTEN',
  AUDIO = 'AUDIO',
  IDENTIFY = 'IDENTIFY',
}

export class CreateExerciseDto {
  lessonId: string;
  type: ExerciseType;
  data: any; // Structured JSON data
}
