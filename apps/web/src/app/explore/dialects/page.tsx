import { DialectBadge } from '@/components/ui/DialectBadge';

const mockDialects = [
  {
    id: 'd1',
    name: 'Ọ̀yọ́',
    description: 'Often considered the standard Yoruba dialect, widely spoken and used as the basis for written Yoruba.',
    regions: ['Oyo State', 'Osun State'],
    features: [
      'Drops "r" in many words (e.g., "ẹ̀yin" instead of "ẹ̀yin", wait no, "ẹrù" -> "ẹù").',
      'Uses "ò" instead of "kò" for negation.'
    ]
  },
  {
    id: 'd2',
    name: 'Ìjẹ̀bú',
    description: 'A major dialect group in Ogun State known for its distinct tonal variations and vocabulary.',
    regions: ['Ogun State', 'Epe (Lagos)'],
    features: [
      'Unique vocabulary not found in Standard Yoruba.',
      'Distinct pronunciation of certain vowels.'
    ]
  },
  {
    id: 'd3',
    name: 'Ẹ̀gbá',
    description: 'Spoken primarily in Abeokuta and surrounding areas.',
    regions: ['Ogun State (Abeokuta)'],
    features: [
      'Frequent use of "y" where standard uses "w".',
      'Distinctive intonation patterns.'
    ]
  }
];

export default function ExploreDialectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Dialect Explorer
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Yorùbá is not a single, monolothic language but a rich tapestry of regional dialects. No dialect is "more correct" than another.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        {mockDialects.map((dialect) => (
          <div key={dialect.id} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3 mb-4">
              <DialectBadge dialect={dialect.name} className="text-sm px-3 py-1.5" />
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
              {dialect.description}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Regions</h4>
                <p className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{dialect.regions.join(', ')}</p>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Key Features</h4>
                <ul className="mt-2 list-disc pl-4 space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
                  {dialect.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
