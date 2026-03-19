"use client";

import React, { useState } from "react";
import { PageContainer, Section, Header, Footer, Divider } from "@/components/layout";
import { History as HistoryIcon, ShieldCheck, MapPin, BookOpen } from "lucide-react";
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
      
      <Header />

      <main className="pb-32">
        
        {/* HERO SECTION */}
        <Section spacing="xl" className="text-center">
            <PageContainer size="md">
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-8xl font-serif font-bold text-brand-primary tracking-tighter">
                        {lessonData.title}
                    </h1>
                    <div className="space-y-4">
                        <p className="text-2xl font-serif text-text-secondary/40 tracking-widest italic font-light">
                            {lessonData.phonetic}
                        </p>
                        <div className="flex items-center justify-center gap-2">
                             <div className="px-5 py-2 bg-brand-accent/5 border border-brand-accent/20 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">
                                Dialect: {lessonData.primaryDialect}
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </Section>

        {/* SECTION 1 — DEFINITION */}
        <Section spacing="lg">
            <PageContainer size="md" className="space-y-8">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Definition</h2>
                <p className="text-2xl font-serif text-brand-primary leading-relaxed opacity-90">
                    {lessonData.definition}
                </p>
            </PageContainer>
        </Section>

        <Divider className="max-w-xl mx-auto opacity-10" />

        {/* SECTION 2 — CULTURAL CONTEXT */}
        <Section spacing="lg">
            <PageContainer size="md" className="space-y-16">
                <div className="space-y-8">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Cultural Context</h2>
                    <div className="prose prose-stone font-serif text-xl text-text-secondary leading-[1.8] italic space-y-8">
                        <p>{lessonData.culturalContext}</p>
                    </div>
                </div>

                <div className="py-12 border-l-2 border-brand-accent/20 pl-12 space-y-6 bg-brand-accent/5 rounded-r-3xl">
                    <blockquote className="text-3xl font-serif italic text-brand-primary leading-tight">
                        &quot;{lessonData.proverb}&quot;
                    </blockquote>
                    <p className="text-sm font-serif text-brand-accent uppercase tracking-widest font-bold opacity-60">
                        — {lessonData.proverbMeaning}
                    </p>
                </div>
            </PageContainer>
        </Section>

        {/* SECTION 3 — DIALECT COMPARISON */}
        <Section spacing="lg" className="bg-bg-secondary/10">
            <PageContainer size="md" className="space-y-16">
                <div className="space-y-4">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Dialect Comparison</h2>
                    <p className="text-lg font-serif italic text-text-secondary/40">Regional variations in historical meaning.</p>
                </div>

                <div className="space-y-12">
                    <div className="flex gap-12 border-b border-text-primary/5 pb-px overflow-x-auto">
                        {Object.keys(lessonData.dialects).map((dialect) => (
                            <button 
                                key={dialect}
                                onClick={() => setActiveDialect(dialect)}
                                className={`pb-6 text-sm font-serif tracking-widest uppercase transition-all relative ${activeDialect === dialect ? "text-brand-primary font-bold" : "text-text-secondary/30 hover:text-text-secondary"}`}
                            >
                                {dialect}
                                {activeDialect === dialect && (
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-8 space-y-6">
                                <p className="text-xl font-serif text-brand-primary italic leading-relaxed">
                                    {lessonData.dialects[activeDialect as keyof typeof lessonData.dialects].definition}
                                </p>
                                <p className="text-lg font-serif text-text-secondary leading-relaxed opacity-60">
                                    Usage: {lessonData.dialects[activeDialect as keyof typeof lessonData.dialects].usage}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </Section>

        {/* SECTION 4 — ORAL TRADITION */}
        <Section spacing="lg">
            <PageContainer size="md" className="space-y-12">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Oral Tradition</h2>
                <div className="flex flex-col md:flex-row gap-12 items-center bg-white border border-text-primary/5 p-12 rounded-3xl shadow-xl shadow-brand-primary/5">
                    <div className="w-24 h-24 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary/40 text-3xl font-serif border border-text-primary/5">
                        <MapPin className="w-8 h-8 opacity-30" />
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <div className="space-y-2">
                             <p className="text-2xl font-serif font-bold text-brand-primary italic">Recorded by {lessonData.elder}</p>
                             <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary/40">Community: {lessonData.community}</p>
                        </div>
                        <div className="pt-2">
                            <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-bg-primary rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-primary/90 transition-all">
                                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
                                Listen to Manuscript Recording
                            </button>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </Section>

        {/* SECTION 5 — REFLECTION */}
        <Section spacing="lg">
            <PageContainer size="md" className="space-y-12">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Reflection</h2>
                <div className="space-y-8">
                    <p className="text-3xl font-serif text-brand-primary italic leading-tight">
                        When have you seen this value expressed in your community?
                    </p>
                    <textarea 
                        className="w-full min-h-[160px] bg-bg-secondary/5 border border-text-primary/10 rounded-2xl p-8 text-xl font-serif italic text-text-secondary outline-none focus:border-brand-primary transition-all resize-none"
                        placeholder="Share your internal reflection..."
                    />
                </div>
            </PageContainer>
        </Section>

        {/* SECTION 6 — ARCHIVAL METADATA */}
        <Section spacing="lg" className="border-t border-text-primary/5">
            <PageContainer size="md" className="flex flex-wrap justify-between gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-8 text-[9px] font-bold uppercase tracking-widest text-text-secondary/30">
                        <span className="flex items-center gap-2"><BookOpen className="w-3 h-3" /> Source: Oral &amp; Academic</span>
                        <span className="flex items-center gap-2"><HistoryIcon className="w-3 h-3" /> Revision 3</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-4 h-4 text-[#2F5D50]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F5D50]">Reviewed via community validation</span>
                    </div>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40 pt-1">
                    Added: March 4, 2026
                </div>
            </PageContainer>
        </Section>

      </main>

      <Footer />
    </div>
  );
}
