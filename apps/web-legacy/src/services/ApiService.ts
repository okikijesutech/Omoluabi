import { Lesson, VerificationMetadata } from "../core/types";

const API_BASE_URL = "http://localhost:5000/api/v1";

export class ApiService {
  /**
   * Submits a new community lesson for review.
   */
  static async submitLesson(lesson: Lesson, contributor: string): Promise<{ lessonId: string }> {
    const response = await fetch(`${API_BASE_URL}/content/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...lesson, contributor }),
    });
    
    if (!response.ok) throw new Error("Failed to submit lesson");
    return response.json();
  }

  /**
   * Records a verification for a lesson.
   */
  static async verifyLesson(lessonId: string, verifierId: string): Promise<{ status: string }> {
    const response = await fetch(`${API_BASE_URL}/content/verify/${lessonId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verifierId }),
    });

    if (!response.ok) throw new Error("Failed to verify lesson");
    return response.json();
  }

  /**
   * Fetches all verified community lessons.
   */
  static async getVerifiedLessons(): Promise<Lesson[]> {
    const response = await fetch(`${API_BASE_URL}/content/verified`);
    if (!response.ok) throw new Error("Failed to fetch verified lessons");
    return response.json();
  }

  /**
   * Generates a lesson using AI.
   */
  static async generateLessonWithAi(language: string, topic: string, difficulty: string): Promise<Lesson> {
    const response = await fetch(`${API_BASE_URL}/ai/generate-lesson`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, topic, difficulty }),
    });

    if (!response.ok) throw new Error("Failed to generate AI lesson");
    return response.json();
  }
}
