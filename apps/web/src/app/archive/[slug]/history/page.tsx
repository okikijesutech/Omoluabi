"use client";

import React from "react";
import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer } from "@/components/layout";
import { History, CheckCircle2, User, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RevisionHistory() {
  const revisions = [
    {
      id: "3",
      date: "March 4, 2026",
      summary: "Refined cultural context regarding 'Iwà' and its relation to professional ethics. Added Ìjẹ̀bú dialect variation.",
      author: "@steward_dayo",
      type: "Community Approval"
    },
    {
      id: "2",
      date: "Feb 28, 2026",
      summary: "Inclusion of oral tradition recorded from Baba Ifásakin. Pronunciation guide updated to standard Oyo markers.",
      author: "@omowale_88",
      type: "Oral Source Integration"
    },
    {
      id: "1",
      date: "Feb 15, 2026",
      summary: "Initial archival entry. Basic definition and dialect identification established.",
      author: "@heritage_admin",
      type: "Archive Foundation"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      <Header />
      <main className="pb-32">
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-3xl pt-16">
                <Link href="/lessons/omoluabi" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-all mb-8">
                    <ArrowLeft className="w-3 h-3" /> Back to Manuscript
                </Link>
                <div className="flex items-center gap-3 text-brand-accent font-bold uppercase tracking-[0.4em] text-[10px]">
                    <History className="w-4 h-4" />
                    Archive Immutability
                </div>
                <div className="space-y-2">
                    <p className="text-[11px] font-bold text-text-secondary/30 uppercase tracking-[0.2em]">Record History</p>
                    <PageTitle className="!text-6xl !text-brand-primary tracking-tighter">Ọmọlúàbí</PageTitle>
                </div>
                <p className="text-xl font-serif text-text-secondary italic leading-relaxed max-w-xl border-l-2 border-brand-accent/10 pl-8">
                    An immutable record of every cultural validation, source integration, and community refinement.
                </p>
            </header>
          </PageContainer>
        </Section>

        <Section spacing="xl">
            <PageContainer size="archive">
                <div className="max-w-3xl space-y-2">
                    {revisions.map((rev, index) => (
                        <div key={rev.id} className="relative pl-16 pb-16 last:pb-0">
                            {index < revisions.length - 1 && (
                                <div className="absolute left-6 top-12 bottom-0 w-px bg-text-primary/5" />
                            )}
                            <div className="absolute left-0 top-2 w-12 h-12 rounded-full border border-text-primary/5 shadow-sm bg-white flex items-center justify-center z-10">
                                <span className="text-[10px] font-bold text-brand-accent">{rev.id}</span>
                            </div>
                            <div className="space-y-6 group">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2 text-text-secondary/40">
                                        <Calendar className="w-3 h-3" /> {rev.date}
                                    </div>
                                    <span className="hidden md:block opacity-20">•</span>
                                    <div className="flex items-center gap-2 text-[#2F5D50]">
                                        <CheckCircle2 className="w-3 h-3" /> {rev.type}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-2xl font-serif text-brand-primary leading-relaxed">
                                        {rev.summary}
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-bg-secondary flex items-center justify-center text-text-secondary/40">
                                            <User className="w-3 h-3" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/30">Validated by {rev.author}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </PageContainer>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
