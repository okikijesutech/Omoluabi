"use client";

import React, { useState } from "react";
import { PageContainer, Header, Footer } from "@/components/layout";
import { LessonHero } from "@/components/lesson/LessonHero";
import { DefinitionSection } from "@/components/lesson/DefinitionSection";
import { CulturalContextSection } from "@/components/lesson/CulturalContextSection";
import { DialectTabs } from "@/components/lesson/DialectTabs";
import { OralSection } from "@/components/lesson/OralSection";
import { ReflectionSection } from "@/components/lesson/ReflectionSection";
import { ArchiveMetadata } from "@/components/lesson/ArchiveMetadata";

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
      
      <Header />

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

      <Footer />
    </div>
  );
}
