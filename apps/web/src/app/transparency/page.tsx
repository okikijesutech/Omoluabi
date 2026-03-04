"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer } from "@/components/layout";
import { OmoluabiLogo } from "@/components/ui/Logo";

export default function TransparencyPolicy() {
  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main>
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-2xl">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Governance Standards</h2>
              <PageTitle className="!text-5xl !text-brand-primary tracking-tight">Transparency Policy</PageTitle>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed">
                How we ensure accountability, integrity, and openness in our archival processes.
              </p>
            </header>
          </PageContainer>
        </Section>

        <Section spacing="xl">
            <PageContainer size="archive" className="space-y-12 grayscale opacity-20">
                <OmoluabiLogo className="mx-auto scale-50" />
                <p className="text-center font-serif italic text-text-secondary">Official transparency policy is being memorialized in the archive.</p>
            </PageContainer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
