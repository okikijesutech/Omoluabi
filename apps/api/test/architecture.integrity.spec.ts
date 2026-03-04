import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { ContributionsService } from '../src/contributions/contributions.service';
import { ReviewsService } from '../src/reviews/reviews.service';
import { KnowledgeService } from '../src/knowledge/knowledge.service';
import { TrustService } from '../src/governance/trust.service';
import { CouncilService } from '../src/governance/council.service';
import { ContributionType, ContributionStatus, KnowledgeType, Role } from '@prisma/client';

describe('Architecture Integrity (Constitutional Guard)', () => {
  let app: TestingModule;
  let prisma: any;
  let contributionsService: ContributionsService;
  let reviewsService: ReviewsService;
  let knowledgeService: KnowledgeService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        PrismaService,
        ContributionsService,
        ReviewsService,
        KnowledgeService,
        TrustService,
        CouncilService,
      ],
    }).compile();

    prisma = app.get<PrismaService>(PrismaService);
    contributionsService = app.get<ContributionsService>(ContributionsService);
    reviewsService = app.get<ReviewsService>(ReviewsService);
    knowledgeService = app.get<KnowledgeService>(KnowledgeService);

    // Clean DB before tests (Correct order for FK constraints)
    await prisma.councilVote.deleteMany();
    await prisma.councilCase.deleteMany();
    await prisma.learningPathUnit.deleteMany();
    await prisma.learningPath.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.review.deleteMany();
    await prisma.revisionHistory.deleteMany();
    await prisma.contribution.deleteMany();
    await prisma.knowledgeVariation.deleteMany();
    await prisma.knowledgeUnit.deleteMany();
    await prisma.user.deleteMany();
    await prisma.dialect.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const createTestUser = (email: string, role: Role) => 
    prisma.user.create({ data: { email, password: 'password', role } });

  const createTestDialect = (name: string) => 
    prisma.dialect.create({ data: { name } });

  it('✅ Scenario 1: Should enforce 2-reviewer approval for CREATE', async () => {
    const author = await createTestUser(`auth1_${Date.now()}@t.com`, Role.CONTRIBUTOR);
    const rev1 = await createTestUser(`r1_${Date.now()}@t.com`, Role.REVIEWER);
    const rev2 = await createTestUser(`r2_${Date.now()}@t.com`, Role.REVIEWER);
    const dialect = await createTestDialect(`D1_${Date.now()}`);

    const contrib = await contributionsService.submitContribution({
      authorId: author.id,
      type: ContributionType.CREATE,
      dialectTag: 'Standard',
      payload: {
        type: KnowledgeType.WORD,
        title: 'Ọmọlúàbí',
        dialectId: dialect.id,
        textWithTone: 'Ọmọlúàbí'
      }
    });

    await reviewsService.reviewContribution(rev1.id, contrib.id, 'APPROVE');
    await reviewsService.reviewContribution(rev2.id, contrib.id, 'APPROVE');

    const updated = await contributionsService.findOne(contrib.id);
    expect(updated?.status).toBe(ContributionStatus.APPROVED);
    
    const unit = await prisma.knowledgeUnit.findFirst({ where: { title: 'Ọmọlúàbí' } });
    expect(unit).toBeDefined();
  });

  it('✅ Scenario 2: Should snapshot RevisionHistory BEFORE update', async () => {
    const rev1 = await createTestUser(`r3_${Date.now()}@t.com`, Role.REVIEWER);
    const rev2 = await createTestUser(`r4_${Date.now()}@t.com`, Role.REVIEWER);
    const unit = await knowledgeService.createKnowledgeUnit({ 
        title: 'Old', 
        type: KnowledgeType.WORD 
    });

    const contrib = await contributionsService.submitContribution({
      authorId: rev1.id,
      type: ContributionType.EDIT,
      dialectTag: 'Standard',
      knowledgeUnitId: unit.id,
      payload: { knowledgeUnitId: unit.id, title: 'New' }
    });

    await reviewsService.reviewContribution(rev1.id, contrib.id, 'APPROVE');
    await reviewsService.reviewContribution(rev2.id, contrib.id, 'APPROVE');

    const revision = await prisma.revisionHistory.findFirst({
      where: { entityId: unit.id },
      orderBy: { createdAt: 'desc' }
    });

    expect(revision).toBeDefined();
    expect(revision.previousData.title).toBe('Old');
    expect(revision.newData.title).toBe('New');
  });

  it('✅ Scenario 3: Conflict & Escalation', async () => {
    const r1 = await createTestUser(`rx1_${Date.now()}@t.com`, Role.REVIEWER);
    const r2 = await createTestUser(`rx2_${Date.now()}@t.com`, Role.REVIEWER);
    const r3 = await createTestUser(`rx3_${Date.now()}@t.com`, Role.REVIEWER);
    const r4 = await createTestUser(`rx4_${Date.now()}@t.com`, Role.REVIEWER);

    const contrib = await contributionsService.submitContribution({
       authorId: r1.id,
       type: ContributionType.CREATE,
       dialectTag: 'Standard',
       payload: { title: 'Escalation', type: KnowledgeType.WORD }
    });

    await reviewsService.reviewContribution(r1.id, contrib.id, 'APPROVE');
    await reviewsService.reviewContribution(r2.id, contrib.id, 'REJECT');
    await reviewsService.reviewContribution(r3.id, contrib.id, 'APPROVE');
    await reviewsService.reviewContribution(r4.id, contrib.id, 'REJECT');

    const escalated = await contributionsService.findOne(contrib.id);
    expect(escalated?.status).toBe('ESCALATED');
  });

  it('✅ Scenario 4: Hybrid Reflection', async () => {
    const unit = await knowledgeService.createKnowledgeUnit({ 
        title: 'Reflect 1', 
        type: KnowledgeType.WORD 
    });
    const path = await prisma.learningPath.create({
      data: { 
          title: 'Hybrid Path', 
          level: 'BEGINNER',
          units: { create: { knowledgeUnitId: unit.id, order: 1 } }
      }
    });

    const r1 = await createTestUser(`rh1_${Date.now()}@t.com`, Role.REVIEWER);
    const r2 = await createTestUser(`rh2_${Date.now()}@t.com`, Role.REVIEWER);
    const contrib = await contributionsService.submitContribution({
      authorId: r1.id,
      type: ContributionType.EDIT,
      dialectTag: 'Standard',
      knowledgeUnitId: unit.id,
      payload: { knowledgeUnitId: unit.id, title: 'Reflect Updated' }
    });

    await reviewsService.reviewContribution(r1.id, contrib.id, 'APPROVE');
    await reviewsService.reviewContribution(r2.id, contrib.id, 'APPROVE');

    const updatedPath = await prisma.learningPath.findUnique({
      where: { id: path.id },
      include: { units: { include: { knowledgeUnit: true } } }
    });

    expect(updatedPath.units[0].knowledgeUnit.title).toBe('Reflect Updated');
  });
});
