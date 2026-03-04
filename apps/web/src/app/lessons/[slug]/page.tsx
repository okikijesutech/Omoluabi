"use client";

import React, { useState } from "react";
import { PageContainer } from "@/components/layout";
import { LessonHero } from "@/components/lesson/LessonHero";
import { DefinitionSection } from "@/components/lesson/DefinitionSection";
import { CulturalContextSection } from "@/components/lesson/CulturalContextSection";
import { DialectTabs } from "@/components/lesson/DialectTabs";
import { OralSection } from "@/components/lesson/OralSection";
import { ReflectionSection } from "@/components/lesson/ReflectionSection";
import { ArchiveMetadata } from "@/components/lesson/ArchiveMetadata";
import { OmoluabiLogo } from "@/components/ui/Logo";
import Link from "next/link";

// Mock data for initial rendering
const lessonData = {
  title: "Ọmọlúàbí",
  phonetic: "/ọ̀-mọ́-lú-à-bí/",
  primaryDialect: "Òyó (Standard)",
  definition: "A person of good character; the embodiment of the virtue of refined behavior, integrity, and cultural education in Yoruba society.",
  culturalContext: "Being an Ọmọlúàbí is the highest ideal of human status in Yoruba culture. It is not about wealth or power, but about the depth of one's character (Iwà). To be so described is to be recognized as one who has mastered the balance of community responsibility and personal honor.",
  proverb: "Iwà l'ẹwa ọmọ-èniyàn.",
  proverbMeaning: "Character is the beauty of a human being.",
  dialects: {
    "Òyó": {
      definition: "Embodiment of character and virtue.",
      usage: "Ọmọlúàbí ni ọmọ yìí, ó mọ̀ èèyàn, ó sì mọ̀ ẹ̀kọ́."
    },
    "Ìjẹ̀bú": {
      definition: "One who is well-bred and morally sound.",
      usage: "Ọmọ ti o rewa ni iwà, eni rere ni."
    },
    "Ẹ̀gbá": {
      definition: "A person of impeccable integrity.",
      usage: "Eni pataki ni, oniwa rere ni ilu wa."
    }
  },
  elder: "Baba Ifásakin",
  community: "Oyo Highlands"
};

export default function LessonPage() {
  const [activeDialect, setActiveDialect] = useState("Òyó");

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      {/* 🏛 ARCHIVE HEADER */}
      <nav className="border-b border-text-primary/10 bg-white/70 backdrop-blur-xl sticky top-0 z-50 py-5">
        <PageContainer size="lg" className="flex items-center justify-between">
          <Link href="/" className="group outline-none">
            <OmoluabiLogo horizontal className="group-hover:opacity-80 transition-opacity" />
          </Link>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary/50">
            <Link href="/learn" className="text-brand-primary border-b border-brand-primary pb-1">Learn</Link>
            <Link href="/contribute" className="hover:text-brand-primary transition-colors">Contribute</Link>
            <Link href="/governance" className="hover:text-brand-primary transition-colors">Governance</Link>
          </div>
        </PageContainer>
      </nav>

      <PageContainer size="md" className="py-20">
        
        {/* HERO */}
        <LessonHero 
          phrase={lessonData.title} 
          phonetic={lessonData.phonetic} 
          dialect={lessonData.primaryDialect} 
        />

        {/* DEFINITION */}
        <DefinitionSection definition={lessonData.definition} />

        {/* CULTURAL CONTEXT */}
        <CulturalContextSection 
          content={lessonData.culturalContext} 
          proverb={lessonData.proverb}
          proverbMeaning={lessonData.proverbMeaning}
        />

        {/* DIALECTS */}
        <DialectTabs 
          activeDialect={activeDialect}
          onDialectChange={setActiveDialect}
          dialects={lessonData.dialects}
        />

        {/* ORAL TRADITION */}
        <OralSection 
          elderName={lessonData.elder} 
          community={lessonData.community} 
        />

        {/* REFLECTION */}
        <ReflectionSection 
          prompt="In what ways does the concept of Omoluabi influence your modern professional life?" 
        />

        {/* METADATA */}
        <ArchiveMetadata 
          dateAdded="March 4, 2026"
          revision="v1.4.2"
          sourceType="Oral & Academic"
        />

      </PageContainer>

      {/* 🏛 ARCHIVE FOOTER */}
      <footer className="py-24 border-t border-text-primary/5 bg-bg-secondary/20">
        <PageContainer size="md" className="text-center">
            <OmoluabiLogo className="opacity-10 grayscale scale-75 mb-12" />
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-secondary/10">
                Linguistic Preservation Protocol — Archive Node: LAG-01
            </p>
        </PageContainer>
      </footer>
    </div>
  );
}
