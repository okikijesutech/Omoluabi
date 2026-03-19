"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer } from "@/components/layout";
import { Search, Filter, ChevronLeft, ChevronRight, FileText, History } from "lucide-react";
import Link from "next/link";

export default function ArchiveIndex() {
  const archiveEntries = [
    {
      word: "Ọmọlúàbí",
      dialect: "Òyó (Standard)",
      description: "A person of impeccable integrity, characterizing the ideal Yoruba sociological status.",
      source: "Oral Tradition",
      revisions: 3,
      slug: "omoluabi"
    },
    {
      word: "Ìwà",
      dialect: "General Yoruba",
      description: "Character; the essence of human existence and the basis for social and spiritual standing.",
      source: "Academic Record",
      revisions: 5,
      slug: "iwa"
    },
    {
      word: "Àṣẹ",
      dialect: "General Yoruba",
      description: "The power to make things happen; the vital force that flows through all things in the universe.",
      source: "Oral Tradition",
      revisions: 2,
      slug: "ase"
    },
    {
      word: "Orí",
      dialect: "Ìjẹ̀bú",
      description: "The physical head and spiritual intuition; the seat of human destiny and consciousness.",
      source: "Elder Consensus",
      revisions: 4,
      slug: "ori"
    },
    {
      word: "Ẹ̀kọ́",
      dialect: "Ẹ̀gbá",
      description: "Education in its broadest sense; encompassing both formal instruction and moral upbringing.",
      source: "Mixed Archival",
      revisions: 1,
      slug: "eko"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main>
        {/* TOP SECTION — ARCHIVE HEADER */}
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-2xl pt-16">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Repository Index</h2>
              <PageTitle className="!text-6xl !text-brand-primary tracking-tighter">Archive</PageTitle>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed max-w-xl">
                Browse preserved knowledge across dialects, oral traditions, and community-validated historical records.
              </p>
            </header>
          </PageContainer>
        </Section>

        {/* FILTER BAR — SOFT CLAY BACKGROUND PANEL */}
        <Section spacing="sm" className="bg-[#D8CFC7]/10 border-b border-text-primary/5 sticky top-[80px] z-40 backdrop-blur-md">
            <PageContainer size="archive" className="flex flex-col md:flex-row gap-8 justify-between items-center">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/40" />
                    <input 
                        type="text" 
                        placeholder="Search manuscript index..."
                        className="w-full pl-14 pr-6 py-4 bg-white border border-text-primary/10 rounded-xl text-sm font-serif italic focus:border-brand-primary outline-none transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <ArchiveFilter label="Dialect" />
                    <ArchiveFilter label="Source Type" />
                    <ArchiveFilter label="Sort: Recent" />
                </div>
            </PageContainer>
        </Section>

        {/* RESULTS LAYOUT — STRUCTURED LIST FORMAT */}
        <Section spacing="xl">
            <PageContainer size="archive">
                <div className="space-y-4">
                    {archiveEntries.map((entry, index) => (
                        <div key={entry.slug}>
                            <ArchiveItem entry={entry} />
                            {index < archiveEntries.length - 1 && (
                                <div className="h-px bg-text-primary/5 my-4" />
                            )}
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="mt-32 flex justify-center items-center gap-8">
                    <button className="w-10 h-10 rounded-full border border-text-primary/5 flex items-center justify-center text-text-secondary/30 hover:text-brand-primary hover:border-brand-primary transition-all">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex gap-4 text-[11px] font-bold tracking-widest text-text-secondary/40 items-center">
                        <span className="text-brand-primary border-b-2 border-brand-primary pb-1">01</span>
                        <span className="hover:text-brand-primary transition-colors cursor-pointer">02</span>
                        <span className="hover:text-brand-primary transition-colors cursor-pointer">03</span>
                        <span className="hover:text-brand-primary transition-colors cursor-pointer">04</span>
                        <span className="px-2">...</span>
                        <span className="hover:text-brand-primary transition-colors cursor-pointer">42</span>
                    </div>
                    <button className="w-10 h-10 rounded-full border border-text-primary/5 flex items-center justify-center text-text-secondary/30 hover:text-brand-primary hover:border-brand-primary transition-all">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </PageContainer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

function ArchiveFilter({ label }: { label: string }) {
    return (
        <button className="flex items-center gap-4 px-6 py-3 bg-white border border-text-primary/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm whitespace-nowrap">
            {label}
            <div className="w-1.5 h-1.5 border-r border-b border-current rotate-45 opacity-30 mt-[-2px]" />
        </button>
    )
}

function ArchiveItem({ entry }: { entry: { word: string, dialect: string, description: string, source: string, revisions: number, slug: string } }) {
    return (
        <Link href={`/lessons/${entry.slug}`} className="group block">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 px-6 rounded-2xl group-hover:bg-bg-secondary/20 transition-all duration-500">
                <div className="md:col-span-3 space-y-1">
                    <h3 className="text-2xl font-serif font-bold text-brand-primary transition-all underline decoration-transparent group-hover:decoration-brand-primary/20">{entry.word}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accent/60">Dialect: {entry.dialect}</p>
                </div>
                <div className="md:col-span-6">
                    <p className="text-base font-serif text-text-secondary italic leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                        {entry.description}
                    </p>
                </div>
                <div className="md:col-span-3 flex md:flex-col justify-between items-end md:items-end gap-4">
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-text-secondary/30">
                        <FileText className="w-3 h-3" /> {entry.source}
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-text-secondary/30">
                        <History className="w-3 h-3" /> Revision {entry.revisions}
                    </div>
                </div>
            </div>
        </Link>
    )
}
