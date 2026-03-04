import React, { useState } from 'react';
import { DialectBadge } from '@/components/ui/DialectBadge';
import { ChevronDown, ChevronUp } from 'lucide-react';

type DialectVariation = {
  id: string;
  dialectName: string;
  variationText: string;
  explanation?: string;
};

type KnowledgeCardProps = {
  type: 'WORD' | 'PHRASE' | 'PROVERB' | 'ORIKI';
  standardText: string;
  translation: string;
  culturalContext?: string;
  dialects?: DialectVariation[];
};

export function KnowledgeCard({
  type,
  standardText,
  translation,
  culturalContext,
  dialects = [],
}: KnowledgeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasDeepContext = culturalContext || dialects.length > 0;

  return (
    <div className="overflow-hidden rounded-xl border border-brand-indigo/10 bg-brand-cream shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-brand-indigo/5 bg-brand-indigo/5 px-6 py-4 dark:border-zinc-800/50 dark:bg-zinc-900/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-widest text-brand-indigo/60 uppercase dark:text-brand-cream/60">
            {type}
          </span>
        </div>
      </div>
      
      <div className="px-6 py-8">
        <h3 className="text-3xl font-serif tracking-tight text-brand-indigo dark:text-brand-cream">
          {standardText}
        </h3>
        <p className="mt-2 text-lg font-medium text-brand-earth dark:text-brand-gold">
          {translation}
        </p>
      </div>

      {hasDeepContext && (
        <div className="border-t border-brand-indigo/5 bg-brand-indigo/5 dark:border-zinc-800 dark:bg-zinc-900/30">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-between px-6 py-4 text-sm font-medium text-brand-indigo/70 hover:text-brand-indigo dark:text-brand-cream/70 dark:hover:text-brand-cream transition-colors"
          >
            <span className="flex items-center gap-2">
              Deep Context & Variations
              {dialects.length > 0 && (
                <span className="rounded-full bg-brand-indigo/10 px-2 py-0.5 text-xs text-brand-indigo dark:bg-zinc-800 dark:text-brand-cream/70">
                  {dialects.length}
                </span>
              )}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {isExpanded && (
            <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-200">
              {culturalContext && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-brand-indigo dark:text-brand-cream">Cultural Context</h4>
                  <p className="mt-2 text-base leading-relaxed text-brand-indigo/80 dark:text-brand-cream/80">
                    {culturalContext}
                  </p>
                </div>
              )}

              {dialects.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-brand-indigo dark:text-brand-cream mb-3">Dialect Variations</h4>
                  <ul className="space-y-3">
                    {dialects.map((variant) => (
                      <li key={variant.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 rounded-lg bg-brand-cream p-3 shadow-sm border border-brand-indigo/5 dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="flex items-center gap-3 w-full sm:w-1/3">
                          <DialectBadge dialect={variant.dialectName} />
                        </div>
                        <div className="w-full sm:w-2/3">
                          <p className="text-lg font-serif text-brand-indigo dark:text-brand-cream">{variant.variationText}</p>
                          {variant.explanation && (
                            <p className="text-sm text-brand-indigo/60 dark:text-brand-cream/60 mt-1">{variant.explanation}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
