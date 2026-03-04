export declare enum LessonDifficulty {
    BEGINNER = "BEGINNER",
    INTERMEDIATE = "INTERMEDIATE",
    ADVANCED = "ADVANCED"
}
export declare class CreateLessonDto {
    moduleId: string;
    title: string;
    order: number;
    difficulty: LessonDifficulty;
}
