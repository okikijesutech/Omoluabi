# Omoluabi Development Setup

## 1. Requirements
- Node.js (v18+)
- PostgreSQL
- npm or pnpm

## 2. Monorepo Structure
- `apps/api`: NestJS Backend
- `apps/web`: Next.js Frontend
- `packages/database`: Prisma schema and client
- `packages/shared-types`: Common TypeScript types

## 3. Installation
```bash
npm install
```

## 4. Database Setup
1. Copy `.env.example` to `.env` in the root and in `packages/database`.
2. Update `DATABASE_URL`.
3. Generate the Prisma Client:
```bash
npm run generate # or cd packages/database && npx prisma generate
```

## 5. Running the Application
From the root directory:
```bash
npm run dev
```
This will start both the API and the Web frontend using Turborepo.

## 6. Coding Standards
- **Linguistic Precision**: Always preserve tonal marks.
- **Type Safety**: No `any`. Use the generated Prisma types.
- **Preservation First**: Never use `delete` methods without snapshotting state to `RevisionHistory`.
