"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer } from "@/components/layout";
import { Search, Filter } from "lucide-react";

export default function ArchiveIndex() {
  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main>
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-2xl">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Repository Index</h2>
              <PageTitle className="!text-5xl !text-brand-primary tracking-tight">Digital Archive</PageTitle>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed">
                Browse the complete collection of validated Yoruba knowledge units, dialect variations, and oral traditions.
              </p>
            </header>
          </PageContainer>
        </Section>

        {/* Archive Controls Placeholder */}
        <Section spacing="sm" className="bg-bg-secondary/10 border-b border-text-primary/5">
            <PageContainer size="archive" className="flex flex-col md:flex-row gap-8 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/30" />
                    <input 
                        type="text" 
                        placeholder="Search term, proverb, or cultural concept..."
                        className="w-full pl-12 pr-6 py-4 bg-white border border-text-primary/10 rounded-full text-sm font-serif italic focus:border-brand-primary outline-none transition-all"
                    />
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-3 px-8 py-4 bg-white border border-text-primary/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 hover:border-brand-primary hover:text-brand-primary transition-all">
                        <Filter className="w-3 h-3" /> Filter by Dialect
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-white border border-text-primary/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-text-secondary/60 hover:border-brand-primary hover:text-brand-primary transition-all">
                        Source Type
                    </button>
                </div>
            </PageContainer>
        </Section>

        <Section spacing="xl">
            <PageContainer size="archive" className="text-center py-32 space-y-8 grayscale opacity-20">
                <div className="w-24 h-24 rounded-full border-4 border-brand-accent/20 border-t-brand-accent animate-spin mx-auto" />
                <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-text-secondary">Retrieving Archival Records...</p>
                <p className="text-sm font-serif italic max-w-sm mx-auto leading-relaxed">
                    The digital archive is currently indexing approved knowledge units. Broad repository access is expected shortly.
                </p>
            </PageContainer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
