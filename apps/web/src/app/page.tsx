"use client";

import { PageTitle, DisplayWord } from "@/components/typography";
import { PageContainer, Section, Divider } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { OmoluabiLogo } from "@/components/ui/Logo";
import Link from "next/link";
import { ShieldCheck, Database, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary pb-24 selection:bg-brand-accent/20">
      
      {/* Narrative Header */}
      <nav className="p-8">
        <PageContainer size="lg" className="flex justify-between items-center">
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-secondary/40">
            Archive Edition: 2026.01
          </div>
          <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/60">
            <Link href="/learn" className="hover:text-brand-primary transition-colors">Learn</Link>
            <Link href="/contribute" className="hover:text-brand-primary transition-colors">Contribute</Link>
            <Link href="/governance" className="hover:text-brand-primary transition-colors">Governance</Link>
          </div>
        </PageContainer>
      </nav>

      {/* Hero Section */}
      <Section spacing="xl" className="text-center">
        <PageContainer size="lg" className="space-y-16">
          <OmoluabiLogo className="animate-in fade-in slide-in-from-top-12 duration-1000" />
          
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <DisplayWord className="!text-7xl sm:!text-[120px] text-brand-primary">
              Preserve. Learn. Contribute.
            </DisplayWord>
            <div className="max-w-2xl mx-auto border-t border-brand-accent/10 pt-8">
              <PageTitle className="!text-xl text-text-secondary font-medium italic !tracking-widest uppercase">
                A living Yoruba cultural archive.
              </PageTitle>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-8 pt-12">
            <Button size="lg" className="rounded-full px-16 group font-serif shadow-2xl hover:shadow-brand-primary/20 transition-all bg-brand-primary text-bg-primary" asChild>
              <Link href="/learn">Begin Learning</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-16 font-serif border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5" asChild>
              <Link href="/contribute">Contribute to Archive</Link>
            </Button>
          </div>
        </PageContainer>
      </Section>

      <Divider className="opacity-30" />

      {/* What We Protect Section */}
      <Section spacing="lg">
        <PageContainer size="lg" className="space-y-24">
          <div className="text-center space-y-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent">Our Mandate</div>
            <h2 className="text-5xl font-serif font-bold text-brand-primary">What We Protect</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <Pillar 
              title="Dialect Diversity"
              description="Sustaining the distinct tonal shifts and vocabularies of regional Yoruba variants from Ekiti to Ijebu."
              icon={Database}
            />
            <Pillar 
              title="Oral Heritage"
              description="Prioritizing verification from lineage chants and oral traditions shared by community elders."
              icon={Users}
            />
            <Pillar 
              title="Cultural Integrity"
              description="Every word is preserved within its narrative soul—proverbs, cultural weight, and social usage."
              icon={ShieldCheck}
            />
          </div>
        </PageContainer>
      </Section>

      {/* Decorative Archive Footer */}
      <footer className="mt-32 py-32 text-center space-y-12 bg-bg-secondary/20 border-t border-text-primary/5">
        <OmoluabiLogo className="opacity-20 scale-90 mx-auto grayscale" />
        <div className="flex justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary/40 pt-8">
          <Link href="#" className="hover:text-brand-primary transition-colors">Privacy Rituals</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">Linguistic Ethics</Link>
          <Link href="#" className="hover:text-brand-primary transition-colors">Archive Manifest</Link>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.6em] text-text-secondary/20">
          ỌMỌLÚÀBÍ LIBRARY — EST. MMXXVI
        </p>
      </footer>
    </div>
  );
}

function Pillar({ title, description, icon: Icon }: { title: string, description: string, icon: React.ElementType }) {
  return (
    <div className="space-y-8 group text-center md:text-left">
      <div className="w-16 h-16 rounded-2xl bg-bg-secondary flex items-center justify-center text-brand-primary border border-text-primary/5 group-hover:bg-brand-primary group-hover:text-bg-primary transition-all duration-700 shadow-sm overflow-hidden relative">
        <Icon className="w-7 h-7 relative z-10" />
        <div className="absolute inset-0 bg-brand-accent translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-10" />
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-bold text-brand-primary">{title}</h3>
        <p className="text-text-secondary leading-relaxed text-lg italic opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>
    </div>
  );
}
