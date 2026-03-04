"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer } from "@/components/layout";
import { IntegrityStatus } from "@/components/governance";
import Link from "next/link";
import { 
  Activity, 
  Database, 
  Users, 
  Scale,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export default function GovernanceHealth() {
  const stats = [
    { label: "Approved (30d)", value: "142", icon: CheckCircle2, subtext: "Knowledge Units" },
    { label: "Dialects Represented", value: "14", icon: Database, subtext: "Regional variations" },
    { label: "Approval Ratio", value: "88%", icon: Scale, subtext: "Community consensus" },
    { label: "Escalations Resolved", value: "3", icon: Users, subtext: "Last 30 days" },
  ];

  const preservationMetrics = [
    { label: "Total Knowledge Units", value: "1,204" },
    { label: "Oral Sources Logged", value: "48" },
    { label: "Cultural Context Completeness", value: "94%" },
  ];

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main className="pb-24">
        
        {/* Header */}
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-3xl">
              <Link href="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-all mb-8">
                <ArrowLeft className="w-3 h-3" /> Back to Entry
              </Link>
              <div className="flex items-center gap-3 text-brand-accent uppercase tracking-[0.4em] text-[10px] font-bold">
                <Activity className="w-4 h-4" />
                Institutional Transparency
              </div>
              <PageTitle className="!text-5xl !text-brand-primary tracking-tight">Governance Health</PageTitle>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed max-w-2xl border-l-2 border-brand-accent/10 pl-8">
                Monitoring the integrity of the Omoluabi Cultural Archive. High-fidelity preservation over high-velocity expansion.
              </p>
            </header>
          </PageContainer>
        </Section>

        {/* Section 1: Governance Snapshot */}
        <Section spacing="lg">
          <PageContainer size="archive" className="space-y-12">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Governance Snapshot</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-text-primary/5 border border-text-primary/5 rounded-2xl overflow-hidden shadow-sm">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white p-8 space-y-4">
                    <div className="flex justify-between items-start">
                        <stat.icon className="w-5 h-5 text-brand-accent opacity-40" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/40">{stat.subtext}</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-serif font-bold text-brand-primary">{stat.value}</p>
                        <p className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-widest">{stat.label}</p>
                    </div>
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>

        {/* Section 2: Preservation Metrics */}
        <Section spacing="lg" className="bg-bg-secondary/20">
          <PageContainer size="archive" className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start text-center md:text-left">
            <div className="md:col-span-1 space-y-6">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Preservation Metrics</h2>
              <p className="font-serif italic text-text-secondary text-lg leading-relaxed">
                Tracking the completeness and source-variety of our archive to ensure historical depth.
              </p>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {preservationMetrics.map((p) => (
                <div key={p.label} className="space-y-2 bg-white/50 p-8 rounded-xl border border-white/50">
                  <p className="text-4xl font-serif font-bold text-brand-primary">{p.value}</p>
                  <p className="text-[9px] font-bold text-text-secondary/50 uppercase tracking-[0.2em] leading-snug">{p.label}</p>
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>

        {/* Section 3: Integrity Status */}
        <Section spacing="lg">
          <PageContainer size="archive" className="space-y-12">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Archive Integrity Protocol</h2>
            <IntegrityStatus />
            <p className="text-center text-[10px] font-bold text-text-secondary/30 uppercase tracking-[0.3em] italic">
              Next institutional audit scheduled for April 12, 2026.
            </p>
          </PageContainer>
        </Section>

      </main>

      <Footer />
    </div>
  );
}
