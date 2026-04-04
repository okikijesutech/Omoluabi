import { describe, it, expect } from "vitest";
import { ContentService } from "../contentService";
import { communityLessons } from "../infrastructure/database/inMemoryStore";

describe("ContentService", () => {
  it("should submit content and add to communityLessons", () => {
    const initialCount = communityLessons.length;
    const lesson: any = { id: "test-1", title: "Test Lesson", difficulty: "beginner", exercises: [], verification: {} };
    ContentService.submitContent(lesson, "test-user");
    expect(communityLessons.length).toBe(initialCount + 1);
  });
});
