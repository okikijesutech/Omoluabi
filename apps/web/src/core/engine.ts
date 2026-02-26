import { Exercise, UserProgress } from "./types";

export class LearningEngine {
  private static INITIAL_LIVES = 5;
  private static BASE_XP = 10;

  /**
   * Grades a user's answer for a given exercise.
   * @param exercise The exercise being attempted
   * @param answer The user's provided answer
   * @returns boolean true if correct, false otherwise
   */
  public static gradeExercise(exercise: Exercise, answer: string | number): boolean {
    // Normalize and compare
    const normalizedAnswer = String(answer).trim().toLowerCase();
    const normalizedCorrect = String(exercise.correctAnswer).trim().toLowerCase();
    
    return normalizedAnswer === normalizedCorrect;
  }

  /**
   * Calculates the updated progress data based on an exercise result.
   * @param progress Current user progress
   * @param isCorrect Whether the last answer was correct
   * @returns Updated UserProgress
   */
  public static processResult(progress: UserProgress, isCorrect: boolean): UserProgress {
    const updatedProgress = { ...progress };

    if (isCorrect) {
      updatedProgress.xp += this.BASE_XP;
      // Streak logic could be complex (e.g. daily-based), 
      // but for simplicity we increment it here if we wanted per-session/per-exercise streaks
    } else {
      updatedProgress.lives = Math.max(0, updatedProgress.lives - 1);
    }

    updatedProgress.lastActive = new Date().toISOString();
    return updatedProgress;
  }

  /**
   * Initializes a new user progress object.
   */
  public static initializeProgress(userId: string, courseId: string): UserProgress {
    return {
      userId,
      courseId,
      completedLessons: [],
      xp: 0,
      streak: 0,
      lives: this.INITIAL_LIVES,
      lastActive: new Date().toISOString(),
    };
  }

  /**
   * Checks if a user can continue a lesson (has lives).
   */
  public static canContinue(progress: UserProgress): boolean {
    return progress.lives > 0;
  }
}
