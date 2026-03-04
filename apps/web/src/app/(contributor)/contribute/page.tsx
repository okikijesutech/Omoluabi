"use client";

import { PageTitle, BodyText } from "@/components/typography";
import { PageContainer } from "@/components/layout";
import { ContributionForm } from "@/components/contribution/ContributionForm";
import { OmoluabiLogo } from "@/components/ui/Logo";
import Link from "next/link";

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-bg-primary pb-32 selection:bg-brand-accent/20">
      
      {/* 🏛 INSTITUTIONAL HEADER */}
      <nav className="border-b border-text-primary/10 bg-white/70 backdrop-blur-xl sticky top-0 z-50 py-5 transition-all outline-none">
        <PageContainer size="lg" className="flex items-center justify-between">
          <Link href="/" className="group outline-none">
            <OmoluabiLogo horizontal className="group-hover:opacity-80 transition-opacity" />
          </Link>
          <div className="flex gap-10 text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary/50">
            <Link href="/learn" className="hover:text-brand-primary transition-colors">Learn</Link>
            <Link href="/contribute" className="text-brand-primary border-b border-brand-primary pb-1">Contribute</Link>
            <Link href="/governance" className="hover:text-brand-primary transition-colors">Governance</Link>
          </div>
        </PageContainer>
      </nav>

      <PageContainer size="md" className="pt-24">
        
        {/* 🧾 TITLE SECTION */}
        <header className="space-y-8 mb-20 animate-in fade-in duration-1000">
          <PageTitle className="text-5xl">Contribute to the Cultural Archive</PageTitle>
          <div className="max-w-xl border-l border-brand-accent/30 pl-8">
            <BodyText size="lg" className="italic !text-text-secondary/70 leading-relaxed">
              Every submission becomes part of a preserved linguistic record for future generations.
            </BodyText>
          </div>
        </header>
        
        {/* ✍🏾 FORM SECTION */}
        <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
           <ContributionForm />
        </section>

      </PageContainer>

      {/* 🏛 ARCHIVE FOOTER */}
      <footer className="mt-32 border-t border-text-primary/5 py-24 bg-bg-secondary/30">
        <PageContainer size="md" className="text-center space-y-8">
          <OmoluabiLogo className="opacity-10 grayscale scale-75" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-secondary/10">
            OMOLUABI DIGITAL MANUSCRIPT LIBRARY — MMXXVI
          </p>
        </PageContainer>
      </footer>
    </div>
  );
}
