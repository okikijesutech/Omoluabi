"use client";

import { PageTitle, BodyText } from "@/components/typography";
import { PageContainer, Header, Footer } from "@/components/layout";
import { ContributionForm } from "@/components/contribution/ContributionForm";

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-bg-primary pb-32 selection:bg-brand-accent/20">
      
      <Header />

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

      <Footer />
    </div>
  );
}
