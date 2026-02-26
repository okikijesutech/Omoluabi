# Omoluabi Database Schema

This document outlines the target database schema for the modular architecture.

## Entities

### User
- `id`: string (PK)
- `email`: string
- `username`: string
- `xp`: integer
- `reputation`: integer
- `lastActive`: datetime

### Lesson
- `id`: string (PK)
- `title`: string
- `description`: text
- `difficulty`: enum (beginner, intermediate, advanced)
- `status`: enum (draft, pending_review, verified)
- `authorId`: string (FK -> User.id)

### Exercise
- `id`: string (PK)
- `lessonId`: string (FK -> Lesson.id)
- `type`: string
- `prompt`: text
- `correctAnswer`: string
- `options`: json

### Progress
- `userId`: string (FK -> User.id)
- `lessonId`: string (FK -> Lesson.id)
- `completedAt`: datetime
- `score`: integer

### Verification (Submissions/Votes)
- `lessonId`: string (FK -> Lesson.id)
- `verifierId`: string (FK -> User.id)
- `vote`: boolean (up/down)
- `createdAt`: datetime
