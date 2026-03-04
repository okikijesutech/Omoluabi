"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer } from "@/components/layout";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutOmoluabi() {
  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main>
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-3xl">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Mission & Vision</h2>
              <PageTitle className="!text-5xl !text-brand-primary tracking-tight">About Omoluabi</PageTitle>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed">
                An institutional cultural archive built for transparency, dialect preservation, and collective memory.
              </p>
            </header>
          </PageContainer>
        </Section>

        <Section spacing="xl">
            <PageContainer size="archive" className="space-y-16">
                <div className="prose prose-stone font-serif italic text-lg lg:text-xl text-text-secondary opacity-90 leading-relaxed max-w-none space-y-8">
                    <p>
                        Omoluabi was founded in 2026 to address a critical gap in digital cultural preservation. As global languages become increasingly standardized, regional dialects and oral traditions often fade into obscurity. 
                    </p>
                    <p>
                        Our platform is built upon three core pillars: 
                        <strong className="text-brand-primary not-italic block mt-4">1. Preservation-First Philosophy</strong>
                        <strong className="text-brand-primary not-italic block">2. Dialect Inclusion Principle</strong>
                        <strong className="text-brand-primary not-italic block">3. Governance Transparency</strong>
                    </p>
                    <p>
                        We do not just teach a language; we record its soul. Every entry in the Omoluabi Archive is backed by community consensus and institutional accountability.
                    </p>
                </div>

                <div className="pt-12">
                    <Link href="/principles" className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent hover:text-brand-primary transition-all">
                        Read Our Cultural Principles <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </PageContainer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
