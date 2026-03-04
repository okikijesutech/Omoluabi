import React from "react";
import { DisplayWord } from "@/components/typography";

interface LessonHeroProps {
  phrase: string;
  phonetic: string;
  dialect?: string;
}

/**
 * LessonHero - Typographic focus for the manuscript entry
 */
export function LessonHero({ phrase, phonetic, dialect }: LessonHeroProps) {
  return (
    <section className="text-center pt-20 pb-16 space-y-6 animate-in fade-in zoom-in-95 duration-1000">
      <div className="space-y-4">
        <DisplayWord className="!text-7xl !text-brand-primary">{phrase}</DisplayWord>
        <p className="text-2xl font-serif text-text-secondary/40 italic">
          {phonetic}
        </p>
      </div>
      {dialect && (
        <div className="flex flex-col items-center gap-2">
            <div className="h-px w-8 bg-brand-accent/20" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">
                Dialect: {dialect}
            </span>
        </div>
      )}
    </section>
  );
}
