import { Lesson } from "@omoluabi/shared-types";
import { communityLessons } from "../../infrastructure/database/inMemoryStore";

export class ContentService {
  public static submitContent(lesson: Lesson, contributor: string): string {
    const newLesson: Lesson = {
      ...lesson,
      verification: {
        status: "pending_review",
        reviewCount: 0,
        contributors: [contributor || "anonymous"],
      }
    };

    communityLessons.push(newLesson);
    return newLesson.id;
  }

  public static getVerifiedContent(): Lesson[] {
    return communityLessons.filter(l => l.verification.status === "verified");
  }
}
