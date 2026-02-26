import { communityLessons } from "../../infrastructure/database/inMemoryStore";

export class VerificationService {
  private static CONSENSUS_THRESHOLD = 3;

  public static verifyContent(lessonId: string, verifierId: string): string {
    const lesson = communityLessons.find(l => l.id === lessonId);
    if (!lesson) {
      throw new Error("Lesson not found");
    }

    lesson.verification.reviewCount += 1;
    if (!lesson.verification.contributors.includes(verifierId)) {
      lesson.verification.contributors.push(verifierId);
    }

    if (lesson.verification.reviewCount >= this.CONSENSUS_THRESHOLD) {
      lesson.verification.status = "verified";
      lesson.verification.lastVerifiedAt = new Date().toISOString();
    }

    return lesson.verification.status;
  }
}
