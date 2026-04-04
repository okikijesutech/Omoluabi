import { PrismaClient, Role, KnowledgeType, LearningLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Omoluabi Governance & Learning Curriculum...');

  const slugify = (text: string) => text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // 1. Create Core Dialects
  const dialects = [
    { name: 'Standard Yoruba', region: 'General', description: 'The standard formal variation used in education.' },
    { name: 'Ijebu', region: 'Ogun', description: 'Notable for its unique tonal shifts and contractions.' },
    { name: 'Ijesa', region: 'Osun', description: 'Rich in tonal complexity and unique vocabulary.' },
    { name: 'Ekiti', region: 'Ekiti', description: 'Distinct vowel sounds and rhythmic patterns.' },
  ];

  for (const d of dialects) {
    await prisma.dialect.upsert({
      where: { name: d.name },
      update: {},
      create: d,
    });
  }
  const allDialects = await prisma.dialect.findMany();
  const stdDialect = allDialects.find(d => d.name === 'Standard Yoruba')!;

  // 2. Create Users
  const users = [
    { email: 'admin@omoluabi.io', role: Role.ADMIN, trustScore: 1000 },
    { email: 'reviewer@omoluabi.io', role: Role.REVIEWER, trustScore: 100, reviewAccuracy: 0.9, approvedCount: 50 },
    { email: 'learner@omoluabi.io', role: Role.LEARNER, trustScore: 0 },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: { ...u, password: 'hashed_password_here' },
    });
  }

  // 3. Knowledge Units & Variations
  const units = [
    {
      type: KnowledgeType.WORD,
      title: 'Ọmọlúàbí',
      description: 'A person of good character; the philosophical core of Yoruba identity.',
      variation: { textWithTone: 'Ọmọlúàbí', notes: 'Standard form' }
    },
    {
      type: KnowledgeType.WORD,
      title: 'Ẹ kú àárọ̀',
      description: 'Good morning. A respectful greeting used in the morning.',
      variation: { textWithTone: 'Ẹ kú àárọ̀', notes: 'Common greeting' }
    },
    {
      type: KnowledgeType.WORD,
      title: 'Ẹ kú ọ̀sán',
      description: 'Good afternoon. Used between noon and evening.',
      variation: { textWithTone: 'Ẹ kú ọ̀sán', notes: 'Common greeting' }
    },
    {
      type: KnowledgeType.PROVERB,
      title: 'A pẹ́ kò tó bẹ́ẹ̀',
      description: "Patience and long-suffering are valuable traits. Literally: Waiting long doesn't make it as much.",
      variation: { textWithTone: 'A pẹ́ kò tó bẹ́ẹ̀', notes: 'Lesson in endurance' }
    },
    {
      type: KnowledgeType.WORD,
      title: 'Arúgbó',
      description: 'An elderly person. Highly respected in Yoruba culture.',
      variation: { textWithTone: 'Arúgbó', notes: 'Respect title' }
    },
    {
      type: KnowledgeType.WORD,
      title: 'Ọ̀rọ̀',
      description: 'Word, speech, or matter. The foundation of Yoruba oral tradition.',
      variation: { textWithTone: 'Ọ̀rọ̀', notes: 'Abstract concept' }
    }
  ];

  for (const u of units) {
    const slug = slugify(u.title);
    const unit = await prisma.knowledgeUnit.upsert({
      where: { slug },
      update: { type: u.type, title: u.title, description: u.description },
      create: { type: u.type, title: u.title, slug, description: u.description }
    });

    await prisma.knowledgeVariation.upsert({
      where: { knowledgeUnitId_dialectId: { knowledgeUnitId: unit.id, dialectId: stdDialect.id } },
      update: { textWithTone: u.variation.textWithTone, notes: u.variation.notes },
      create: { knowledgeUnitId: unit.id, dialectId: stdDialect.id, textWithTone: u.variation.textWithTone, notes: u.variation.notes }
    });
  }

  // 4. Learning Paths
  const paths = [
    {
      id: 'path-foundations',
      title: 'Foundations of Ọmọlúàbí',
      level: LearningLevel.BEGINNER,
      description: 'The definitive starting point for mastering the cultural pillars of the Yoruba identity.',
      unitSlugs: ['omoluabi', 'oro', 'arugbo']
    },
    {
      id: 'path-greetings',
      title: 'Everyday Greetings',
      level: LearningLevel.BEGINNER,
      description: 'Master the art of respectful interaction through the rich system of Yoruba greetings.',
      unitSlugs: ['e-ku-aaro', 'e-ku-osan']
    }
  ];

  for (const p of paths) {
    const path = await prisma.learningPath.upsert({
      where: { id: p.id },
      update: { title: p.title, level: p.level, description: p.description },
      create: { id: p.id, title: p.title, level: p.level, description: p.description }
    });

    let orderIdx = 0;
    for (const slug of p.unitSlugs) {
      const unit = await prisma.knowledgeUnit.findUnique({ where: { slug } });
      if (unit) {
        await prisma.learningPathUnit.upsert({
          where: { learningPathId_order: { learningPathId: path.id, order: orderIdx } },
          update: { knowledgeUnitId: unit.id },
          create: { learningPathId: path.id, knowledgeUnitId: unit.id, order: orderIdx }
        });
        orderIdx++;
      }
    }
  }

  console.log('🚀 Seed complete. Governance & Learning systems operational.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
