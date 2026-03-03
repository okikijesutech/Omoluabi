# Omoluabi Database Architecture

The Omoluabi platform implements a highly relational PostgreSQL database structure operated by Prisma ORM. The core tables are intentionally designed around **Community-Driven Content**, **Gamification**, and **Rigorous Moderation**.

## 1. User & Role Management
*   **`User` Model:** Stores authentication (`email`, `passwordHash`), display information (`username`), and crucial roles.
    *   **Roles (`userRole`):** Defined by an Enum matching our RBAC system (`LEARNER`, `CONTRIBUTOR`, `REVIEWER`, `FOUNDER`). The platform is designed such that high-level functions (like approving lessons) require `REVIEWER` or `FOUNDER` roles.
    *   **Activity Tracking:** Contains dynamic integer columns like `contributionCount` which feed directly into Gamification/Leaderboards without requiring expensive JOINs on the main feed.

## 2. Content Hierarchy
The core learning material is structured sequentially.
*   **`Language` -> `Course` -> `Level` -> `Module` -> `Lesson`**
*   **`Lesson` Model:** The core node. It holds the `content` payload and the `contentType` enum (`LESSON`, `PROVERB`, `ORIKI`, `CULTURAL_INSIGHT`, `HISTORY_NOTE`).
*   **`Exercise` Model:** Associated with a specific Lesson. Contains structured `question`/`answer` payloads and a `type` enum to render specific UI views (`MULTIPLE_CHOICE`, `TRANSLATE`, `AUDIO`, etc.).
*   **`DialectNote` Model:** Specialized table for Yorùbá dialect variations associated with a Lesson to preserve cultural nuances.

## 3. Contribution & Review System (Core Engine)
This system acts as the "Git" for Omoluabi content. Users don't edit live lessons directly; they submit *Contributions*.
*   **`Contribution` Model:** Represents a proposed change (create, update) by a `User` targeting a specific `Lesson`.
    *   **`status` Enum:** Maps to `approval_state`, cycling between `PENDING`, `APPROVED`, and `REJECTED`.
    *   **`lesson_version_history`:** By having a one-to-many relationship between a `Lesson` and past `Contribution` rows, we natively retain complete version history of all changes made to a lesson over time.
*   **`Review` Model:** Represents a moderator's decision on a specific Contribution.
    *   **`disputeFlag` Boolean:** Allows a Reviewer to flag a contribution as culturally or linguistically controversial, requiring `FOUNDER` escalation.
*   **`Vote` Model:** Allows standard `LEARNER` accounts to crowdsource reputation via upvotes (`+1`/`-1`) on pending Contributions before official Review.

## 4. Gamification
*   **`CulturalTitle` Model:** Defines specific gamified ranks/badges that a User unlocks based on their `contributionCount`.
*   **`LessonProgress` Model:** Tracks a specific user's interaction with a specific lesson, marking completion status and recording performance scores for the Leaderboard algorithm.
