"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer } from "@/components/layout";
import Link from "next/link";
import { 
  Activity,
  Scale,
  CheckCircle2,
  ArrowLeft,
  ShieldAlert,
  Loader2,
  Database
} from "lucide-react";
import { useEffect, useState } from "react";

export default function GovernanceHealth() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const res = await fetch('http://localhost:3001/governance/metrics'); // Assuming port 3001 for API
        const data = await res.json();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch governance metrics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  const stats = [
    { label: "Contributions Reviewed", value: metrics?.totalReviews || "...", icon: CheckCircle2 },
    { label: "Dialects Represented", value: metrics?.dialectDistribution?.length || "...", icon: Database },
    { label: "Escalations Resolved", value: metrics?.escalationsResolved || "...", icon: ShieldAlert },
    { label: "Approval Ratio", value: metrics?.approvalRatio || "...", icon: Scale },
  ];

  const dialectDistribution = metrics?.dialectDistribution || [
    { name: "Òyó (Standard)", value: 0 },
    { name: "Ìjẹ̀bú", value: 0 },
    { name: "Ẹ̀gbá", value: 0 },
    { name: "Èkìtì", value: 0 },
    { name: "Oǹdó", value: 0 },
  ];

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main className="pb-24">
        
        {/* Header */}
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 max-w-3xl pt-16">
              <Link href="/" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent hover:text-brand-primary transition-all mb-8">
                <ArrowLeft className="w-3 h-3" /> Back to Entry
              </Link>
              <div className="flex items-center gap-3 text-brand-accent uppercase tracking-[0.4em] text-[10px] font-bold">
                <Activity className="w-4 h-4 shadow-[0_0_10px_rgba(140,106,63,0.3)]" />
                Institutional Report
              </div>
              <PageTitle className="!text-6xl !text-brand-primary tracking-tighter">Governance Health</PageTitle>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed max-w-2xl border-l-2 border-brand-accent/10 pl-8">
                Public transparency ensures cultural integrity. Monitoring the structural validity of the Omoluabi Digital Archive.
              </p>
            </header>
          </PageContainer>
        </Section>

        {/* SECTION 1 — INTEGRITY STATUS PANEL */}
        <Section spacing="xl">
          <PageContainer size="archive">
            <div className="max-w-3xl mx-auto bg-white border border-text-primary/5 rounded-3xl p-12 shadow-xl shadow-brand-primary/5 relative overflow-hidden group">
                {/* Background Texture */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                    <StatusLine label="Architecture Integrity" value="PASS" />
                    <StatusLine label="Dialect Protection" value="ACTIVE" />
                    <StatusLine label="Revision Logging" value="ENABLED" />
                </div>
            </div>
          </PageContainer>
        </Section>

        {/* SECTION 2 — 30-DAY METRICS GRID (2-COLUMN) */}
        <Section spacing="xl" className="bg-bg-secondary/10">
          <PageContainer size="archive" className="space-y-16">
            <div className="text-center space-y-4">
                <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Archival Velocity</h2>
                <p className="text-2xl font-serif text-brand-primary italic">30-Day Narrative Transparency</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {loading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24 space-y-4">
                  <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
                  <p className="font-serif italic text-text-secondary">Retrieving archival integrity reports...</p>
                </div>
              ) : (
                stats.map((stat) => (
                  <div key={stat.label} className="bg-white p-12 rounded-2xl border border-text-primary/5 shadow-sm group hover:border-brand-primary/20 transition-all flex justify-between items-center">
                      <div className="space-y-2">
                          <p className="text-5xl font-serif font-bold text-brand-primary">{stat.value}</p>
                          <p className="text-[11px] font-bold text-text-secondary/40 uppercase tracking-[0.2em]">{stat.label}</p>
                      </div>
                      <stat.icon className="w-10 h-10 text-brand-accent/20 group-hover:text-brand-accent transition-all" />
                  </div>
                ))
              )}
            </div>
          </PageContainer>
        </Section>

        {/* SECTION 3 — DIALECT DISTRIBUTION (BAR VISUAL) */}
        <Section spacing="xl">
            <PageContainer size="archive" className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Representation</h2>
                        <p className="text-4xl font-serif leading-tight text-brand-primary">Dialect Distribution</p>
                    </div>
                    <p className="text-text-secondary font-serif italic text-lg leading-relaxed opacity-70">
                        Ensuring every region holds equal structural legitimacy. Current archive weights favor standard Oyo, with increasing focus on peripheral variations.
                    </p>
                </div>
                <div className="lg:col-span-7 space-y-8 bg-bg-secondary/10 p-12 rounded-3xl border border-text-primary/5">
                    {dialectDistribution.map((dialect: { name: string; value: number }) => (
                        <div key={dialect.name} className="space-y-3">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-secondary/60">
                                <span>{dialect.name}</span>
                                <span>{dialect.value}%</span>
                            </div>
                            <div className="h-2 bg-white rounded-full overflow-hidden border border-text-primary/5">
                                <div 
                                    className="h-full bg-brand-primary/30 rounded-full" 
                                    style={{ width: `${dialect.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </PageContainer>
        </Section>

        {/* SECTION 4 — TRANSPARENCY STATEMENT */}
        <Section spacing="xl" className="border-t border-text-primary/5">
            <PageContainer size="archive" className="text-center space-y-12">
                <div className="max-w-2xl mx-auto space-y-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent">Transparency Statement</p>
                    <div className="prose prose-stone font-serif italic text-lg text-text-secondary/80 leading-relaxed space-y-6">
                        <p>
                            Omoluabi operates on a principle of public accountability. We publish aggregate metrics to demonstrate archival health and community consensus.
                        </p>
                        <p>
                            To protect the integrity of the review process and the privacy of our contributors, individual &quot;Trust Scores&quot; and specific voter identities remain shielded. Only institutional outcomes and system integrity statuses are exposed through this dashboard.
                        </p>                    </div>
                </div>
            </PageContainer>
        </Section>

      </main>

      <Footer />
    </div>
  );
}

function StatusLine({ label, value }: { label: string, value: string }) {
    return (
        <div className="space-y-3 text-center md:text-left">
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-secondary/30">{label}</p>
            <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2F5D50] shadow-[0_0_10px_rgba(47,93,80,0.5)] animate-pulse" />
                <span className="text-xl font-serif font-bold text-[#2F5D50] tracking-widest">{value}</span>
            </div>
        </div>
    )
}
