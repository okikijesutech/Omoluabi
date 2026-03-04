import { KnowledgeCard } from '@/components/ui/KnowledgeCard';

// Mock data reflecting the Preservation Engine
const mockProverbs = [
  {
    id: 'p1',
    type: 'PROVERB' as const,
    standardText: 'Ọmọdé gbọ́n, àgbà gbọ́n, la fi dá Ilẹ̀ Ifẹ̀.',
    translation: 'Through the wisdom of the young and the wisdom of the old, the land of Ife was built.',
    culturalContext: 'This proverb highlights the importance of teamwork and intergenerational respect. No single age group possesses a monopoly on wisdom, and societal progress relies on the collaboration of all generations.',
    dialects: []
  },
  {
    id: 'p2',
    type: 'PROVERB' as const,
    standardText: 'Àgbà tí kò bínú l’ọmọ rẹ̀ pọ̀.',
    translation: 'An elder who does not get angry easily will have many followers (children).',
    culturalContext: 'Patience and emotional restraint are considered core virtues of an Ọmọlúàbí and of profound leadership in Yorùbá society.',
    dialects: [
      { id: 'dp1', dialectName: 'Ọ̀yọ́', variationText: 'Àgbà tí ò bínú l’ọmọ ẹ̀ pọ̀.', explanation: 'Reflects the common dropping of the "r" and "kò" shift to "ò"' }
    ]
  }
];

export default function ExploreProverbsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Òwe: The Wisdom of Proverbs
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          "Òwe lẹṣin ọ̀rọ̀, bí ọ̀rọ̀ bá sọnù, òwe la fi ń wá a." (Proverbs are the horses of speech; if communication is lost, we use proverbs to find it.)
        </p>
      </div>

      <div className="space-y-8">
        {mockProverbs.map((proverb) => (
          <KnowledgeCard key={proverb.id} {...proverb} />
        ))}
      </div>
    </div>
  );
}
