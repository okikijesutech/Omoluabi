# Omoluabi Architecture Overview

## Preservation-First Philosophy
Omoluabi is not just a language learning app; it is a **Preservation Engine**. Unlike standard platforms that prioritize "Standard Yoruba," Omoluabi treats every dialect, tonal nuance, and historical context as non-negotiable data.

### Core Architecture Layers

#### 1. Knowledge Core (`KnowledgeUnit`)
The atomic unit of information. A KnowledgeUnit can be a word, proverb, or oríkì. It carries a canonical meaning but does not enforce a single "correct" spelling or pronunciation.

#### 2. Dialect Layer (`KnowledgeVariation`)
Every `KnowledgeUnit` can have multiple `KnowledgeVariation` records. These map the unit to specific dialects (Yagba, Ijebu, Ekiti, etc.). 
- **Preservation Rule**: Dialect variations are immutable. They can be added to, but never deleted or overwritten without Admin intervention.

#### 3. Community Governance (`Contribution` & `Review`)
A community-driven validation system ensures that only high-quality, culturally accurate knowledge is published.
- **Thresholds**: Requires a minimum of 2 approvals from trusted reviewers.
- **Conflict Handling**: Disagreements trigger higher-tier reviews or escalation to the Council.

#### 4. Trust & Authority (`Trust Scoring`)
Authority is not granted; it is algorithmically earned.
- Users earn trust by providing accurate contributions and consistent reviews.
- High trust scores promote users to `REVIEWER` status.
- Poor accuracy leads to automatic suspension of privileges.

#### 5. Revision Mastery (`RevisionHistory`)
Total traceability. Every edit, deletion attempt, or merge is snapshotted in JSON. We prioritize cultural integrity over storage efficiency.

## Tech Stack
- **Monorepo**: Turborepo
- **Backend**: NestJS + Prisma ORM
- **Database**: PostgreSQL
- **Frontend**: Next.js + TailwindCSS
- **Language**: TypeScript (Strict Type Safety)
