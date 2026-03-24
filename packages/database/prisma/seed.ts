import { PrismaClient, Role, KnowledgeType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Omoluabi Governance Base...');

  const slugify = (text: string) => text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  // 1. Create Core Dialects
  const dialects = [
    { name: 'Standard Yoruba', region: 'General', description: 'The standard formal variation used in education.' },
    { name: 'Ijebu', region: 'Ogun', description: 'Notable for its unique tonal shifts and contractions.' },
    { name: 'Ijesa', region: 'Osun', description: 'Rich in tonal complexity and unique vocabulary.' },
  ];

  for (const d of dialects) {
    await prisma.dialect.upsert({
      where: { name: d.name },
      update: {},
      create: d,
    });
  }
  const allDialects = await prisma.dialect.findMany();
  console.log(`✅ Created ${allDialects.length} Dialects`);

  // 2. Create Users with different roles
  const users = [
    { email: 'admin@omoluabi.io', role: Role.ADMIN, trustScore: 1000 },
    { email: 'reviewer@omoluabi.io', role: Role.REVIEWER, trustScore: 100, reviewAccuracy: 0.9, approvedCount: 50 },
    { email: 'contributor@omoluabi.io', role: Role.CONTRIBUTOR, trustScore: 10, approvedCount: 5 },
    { email: 'learner@omoluabi.io', role: Role.LEARNER, trustScore: 0 },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: u,
      create: { ...u, password: 'hashed_password_here' },
    });
  }
  console.log(`✅ Roles established: Admin, Reviewer, Contributor, Learner`);

  // 3. Initial Knowledge Units
  const units = [
    {
      type: KnowledgeType.WORD,
      title: 'Ọmọlúàbí',
      description: 'A person of good character; the philosophical core of Yoruba identity.',
      variation: {
        dialectId: allDialects[0].id,
        textWithTone: 'Ọmọlúàbí',
        notes: 'Canonical standard pronunciation.',
      }
    },
    {
      type: KnowledgeType.PROVERB,
      title: 'A pẹ́ kò tó bẹ́ẹ̀',
      description: 'Patience and long-suffering are valuable traits.',
      variation: {
        dialectId: allDialects[0].id,
        textWithTone: 'A pẹ́ kò tó bẹ́ẹ̀',
        notes: 'Commonly used in lessons about endurance.',
      }
    }
  ];

  for (const u of units) {
    const slug = slugify(u.title);
    const unit = await prisma.knowledgeUnit.upsert({
      where: { slug },
      update: {
        type: u.type,
        title: u.title,
        description: u.description,
      },
      create: {
        type: u.type,
        title: u.title,
        slug,
        description: u.description,
      }
    });

    await prisma.knowledgeVariation.upsert({
      where: {
        knowledgeUnitId_dialectId: {
          knowledgeUnitId: unit.id,
          dialectId: u.variation.dialectId,
        }
      },
      update: {
        textWithTone: u.variation.textWithTone,
        notes: u.variation.notes,
      },
      create: {
        knowledgeUnitId: unit.id,
        dialectId: u.variation.dialectId,
        textWithTone: u.variation.textWithTone,
        notes: u.variation.notes,
      }
    });
  }

  console.log('🚀 Seed complete. Governance system ready.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
