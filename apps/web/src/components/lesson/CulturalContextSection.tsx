import React from "react";
import { BodyText, PullQuote } from "@/components/typography";

interface CulturalContextSectionProps {
  content: string;
  proverb?: string;
  proverbMeaning?: string;
}

export function CulturalContextSection({ content, proverb, proverbMeaning }: CulturalContextSectionProps) {
  return (
    <div className="space-y-12 py-12">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">
        Cultural Context
      </h3>
      
      <div className="space-y-6 max-w-2xl">
        <BodyText className="!text-text-primary leading-[1.8] text-lg lg:text-xl italic">
          {content}
        </BodyText>
      </div>

      {proverb && (
        <div className="py-8">
            <PullQuote author="Oral Tradition">
                {proverb}
            </PullQuote>
            {proverbMeaning && (
              <p className="mt-4 text-sm text-text-secondary/60 italic pl-8 border-l border-brand-accent/10">
                Linguistic Weight: {proverbMeaning}
              </p>
            )}
        </div>
      )}
    </div>
  );
}
