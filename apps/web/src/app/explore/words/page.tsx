import { KnowledgeCard } from '@/components/ui/KnowledgeCard';

// Mock data reflecting the Preservation Engine
const mockWords = [
  {
    id: 'wu1',
    type: 'WORD' as const,
    standardText: 'Ọmọlúàbí',
    translation: 'A person of good character',
    culturalContext: 'A philosophical and cultural concept in Yorùbáland describing a person who is brave, acts with good character, and gives back to the community.',
    dialects: [
      { id: 'd1', dialectName: 'Standard', variationText: 'Ọmọlúàbí', explanation: 'Modern standard orthography' },
    ]
  },
  {
    id: 'wu2',
    type: 'WORD' as const,
    standardText: 'Ẹkú àárọ̀',
    translation: 'Good morning',
    culturalContext: 'Traditionally spoken while kneeling or prostrating depending on gender to show respect to elders.',
    dialects: [
      { id: 'd2', dialectName: 'Ìjẹ̀bú', variationText: 'Àárọ̀ o', explanation: 'Often shortened in casual daily use' },
    ]
  }
];

export default function ExploreWordsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Explore Vocabulary
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Discover the foundational words of the Yorùbá language, preserved with their full tonal and dialectical richness.
        </p>
      </div>

      <div className="space-y-8">
        {mockWords.map((word) => (
          <KnowledgeCard key={word.id} {...word} />
        ))}
      </div>
    </div>
  );
}
