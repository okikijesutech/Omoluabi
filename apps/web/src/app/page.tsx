"use client";

import { DisplayWord } from "@/components/typography";
import { PageContainer, Section, Divider, Header, Footer } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShieldCheck, Database, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      {/* 🟫 SECTION 1 — HERO */}
      <Section spacing="xl" className="text-center overflow-hidden">
        <PageContainer size="archive" className="space-y-12 relative">
          {/* Subtle Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[120px] -z-10" />
          
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <DisplayWord className="!text-7xl sm:!text-8xl lg:!text-9xl text-brand-primary tracking-tight leading-[0.9]">
              Preserve.<br />Learn. Contribute.
            </DisplayWord>
            <p className="max-w-2xl mx-auto text-lg lg:text-xl text-text-secondary leading-relaxed font-serif italic">
              A living Yoruba cultural archive built to protect dialect diversity, oral tradition, and community-validated knowledge for future generations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
            <Button size="lg" className="rounded-full px-12 group font-serif shadow-xl hover:shadow-brand-primary/10 transition-all bg-brand-primary text-bg-primary" asChild>
              <Link href="/learn">Begin Learning</Link>
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-12 font-serif border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5" asChild>
              <Link href="/contribute">Contribute to Archive</Link>
            </Button>
          </div>

          <div className="pt-8 animate-in fade-in duration-1000 delay-500">
            <Link href="/governance" className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent hover:text-brand-primary transition-colors flex items-center justify-center gap-2">
                View Governance Health <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </PageContainer>
      </Section>

      <Divider className="opacity-30 max-w-4xl mx-auto" />

      {/* 🟫 SECTION 2 — OUR PURPOSE */}
      <Section spacing="xl">
        <PageContainer size="archive" className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-4 sticky top-32">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">
              Why Omoluabi Exists
            </h3>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="text-3xl lg:text-4xl font-serif text-brand-primary leading-tight lowercase">
              Languages do not disappear in a day.
            </p>
            <div className="space-y-6 text-lg lg:text-xl text-text-secondary leading-relaxed font-serif italic opacity-90">
                <p>
                    They fade when dialects are flattened, when oral knowledge is not recorded, and when cultural meaning is reduced to vocabulary lists.
                </p>
                <p className="text-brand-primary font-bold not-italic">
                    Omoluabi exists to prevent that.
                </p>
                <p>
                    We preserve Yoruba language and cultural knowledge through structured community review, dialect inclusion, and historical accountability.
                </p>
                <p>
                    Every approved entry becomes part of a permanent cultural record.
                </p>
            </div>
          </div>
        </PageContainer>
      </Section>

      {/* 🟫 SECTION 3 — WHAT WE PROTECT */}
      <Section spacing="xl" className="bg-bg-secondary/30 relative overflow-hidden">
        {/* Archival Texture/Lines */}
        <div className="absolute inset-x-0 top-0 h-px bg-text-primary/5" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-text-primary/5" />

        <PageContainer size="archive" className="space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Archival Pillars</h2>
            <p className="text-4xl font-serif text-brand-primary">What We Protect</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <Pillar 
              title="Dialect Diversity"
              description="We do not standardize away difference. Each dialect is preserved with equal structural importance."
              icon={Database}
            />
            <Pillar 
              title="Oral Tradition"
              description="Knowledge passed through elders, memory, and lived experience is recorded alongside academic sources."
              icon={Users}
            />
            <Pillar 
              title="Community Validation"
              description="Content is reviewed through transparent governance. Popularity does not override authenticity."
              icon={ShieldCheck}
            />
          </div>
        </PageContainer>
      </Section>

      {/* 🟫 SECTION 4 — HOW IT WORKS */}
      <Section spacing="xl">
        <PageContainer size="archive" className="space-y-24">
            <div className="text-center space-y-6">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">The Protocol</h2>
                <p className="text-4xl font-serif text-brand-primary">How It Works</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting Lines (Desktop) */}
                <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-px bg-brand-accent/10 -z-10" />
                
                <Step 
                    number="1"
                    title="Contribute"
                    description="Submit a word, phrase, proverb, or cultural explanation with dialect and context."
                />
                <Step 
                    number="2"
                    title="Community Review"
                    description="Contributions undergo structured validation by trusted contributors before approval."
                />
                <Step 
                    number="3"
                    title="Archival Preservation"
                    description="Approved entries are permanently recorded with revision history and governance transparency."
                />
            </div>
        </PageContainer>
      </Section>

      {/* 🟫 SECTION 5 — GOVERNANCE SNAPSHOT */}
      <Section spacing="xl" className="bg-brand-primary text-bg-primary overflow-hidden relative">
        {/* Mask Decor */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <PageContainer size="archive" className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-5 space-y-8">
                <div className="space-y-4">
                    <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Archive Health</h2>
                    <p className="text-4xl font-serif leading-tight">Live Governance Transparency</p>
                </div>
                <p className="text-bg-primary/60 font-serif italic text-lg leading-relaxed">
                    Omoluabi publishes governance metrics to ensure transparency and accountability in preservation.
                </p>
                <Button variant="outline" className="rounded-full border-bg-primary/20 text-bg-primary hover:bg-bg-primary hover:text-brand-primary transition-all font-serif" asChild>
                    <Link href="/governance">View Governance Dashboard <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-bg-primary/10 border border-bg-primary/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                <Stat label="Architecture Integrity" value="PASS" status="success" />
                <Stat label="Dialect Protection" value="Active" status="success" />
                <Stat label="Community Reviews (30d)" value="142" />
                <Stat label="Dialects Represented" value="6" />
            </div>
        </PageContainer>
      </Section>

      {/* 🟫 SECTION 6 — FINAL CALL */}
      <Section spacing="xxl" className="text-center">
        <PageContainer size="archive" className="space-y-16">
            <div className="space-y-6">
                <p className="text-4xl md:text-5xl font-serif text-brand-primary leading-tight">
                    Culture survives when it is<br />preserved intentionally.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                <Button size="lg" className="rounded-full px-16 group font-serif bg-brand-primary text-bg-primary shadow-xl shadow-brand-primary/10" asChild>
                    <Link href="/learn">Begin Learning</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-16 font-serif border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5" asChild>
                    <Link href="/contribute">Contribute to Archive</Link>
                </Button>
            </div>
        </PageContainer>
      </Section>

      <Footer />
    </div>
  );
}

function Pillar({ title, description, icon: Icon }: { title: string, description: string, icon: React.ElementType }) {
  return (
    <div className="space-y-8 group text-center md:text-left">
      <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-brand-primary border border-text-primary/5 group-hover:bg-brand-primary group-hover:text-bg-primary transition-all duration-700 shadow-sm relative">
        <Icon className="w-7 h-7 relative z-10" />
      </div>
      <div className="space-y-4">
        <h3 className="text-2xl font-serif font-bold text-brand-primary">{title}</h3>
        <p className="text-text-secondary leading-relaxed text-lg font-serif italic opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>
    </div>
  );
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="space-y-8 text-center md:text-left">
            <div className="w-20 h-20 rounded-full border border-brand-accent/20 bg-bg-primary flex items-center justify-center text-3xl font-serif text-brand-primary shadow-sm mx-auto md:mx-0">
                {number}
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-brand-primary lowercase italic">{title}</h3>
                <p className="text-text-secondary leading-relaxed font-serif opacity-70">
                    {description}
                </p>
            </div>
        </div>
    );
}

function Stat({ label, value, status }: { label: string; value: string; status?: "success" }) {
    return (
        <div className="bg-white/5 p-8 flex flex-col justify-between h-full group hover:bg-white/10 transition-colors">
            <span className="text-[10px] uppercase font-bold tracking-widest text-bg-primary/40 group-hover:text-bg-primary/60 transition-colors leading-relaxed">
                {label}
            </span>
            <div className="flex items-center gap-3 pt-4">
                {status === "success" && <div className="w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_12px_rgba(140,106,63,0.5)]" />}
                <span className="text-2xl font-serif text-bg-primary">{value}</span>
            </div>
        </div>
    );
}
