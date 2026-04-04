"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Divider, Header, Footer } from "@/components/layout";
import { ShieldCheck, BookOpen, Scale } from "lucide-react";
import React from "react";

export default function CulturalPrinciples() {
  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main>
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-3xl">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Institutional Backbone</h2>
              <PageTitle className="!text-5xl !text-brand-primary tracking-tight">Cultural Principles</PageTitle>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed">
                The non-negotiable legal and cultural values that govern the Omoluabi Digital Archive.
              </p>
            </header>
          </PageContainer>
        </Section>

        <Section spacing="xl">
            <PageContainer size="archive" className="space-y-24">
                <Principle 
                    icon={BookOpen}
                    title="Dialect Inclusion over Standardization"
                    description="We do not accept the flattening of the Yoruba language into a single standard. Every regional variation—from Ekiti to Ijebu—possesses equal structural legitimacy in our archive."
                />
                <Divider className="opacity-10" />
                <Principle 
                    icon={Scale}
                    title="Community Validation over Individual Authority"
                    description="No single contributor, regardless of academic standing, holds absolute authority. Truth is established through structured multi-person validation and oral consensus."
                />
                <Divider className="opacity-10" />
                <Principle 
                    icon={ShieldCheck}
                    title="Authenticity over Popularity"
                    description="The archive is not a social network. We do not use likes, streaks, or engagement metrics. We prioritize the historical accuracy and cultural weight of information above all else."
                />
            </PageContainer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

function Principle({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-1">
                <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center text-brand-accent">
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className="md:col-span-11 space-y-4">
                <h3 className="text-2xl font-serif font-bold text-brand-primary">{title}</h3>
                <p className="text-lg font-serif text-text-secondary italic leading-relaxed opacity-80">
                    {description}
                </p>
            </div>
        </div>
    )
}
