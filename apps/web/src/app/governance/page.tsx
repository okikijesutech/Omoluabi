"use client";

import { PageTitle, BodyText } from "@/components/typography";
import { PageContainer, Section, Divider } from "@/components/layout";
import { GovernanceCard, IntegrityStatus } from "@/components/governance";
import { 
  Activity, 
  Database, 
  Users, 
  Scale,
  CheckCircle2
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
    <div className="min-h-screen bg-brand-cream pb-24">
      <main className="pt-24 space-y-20">
        
        {/* Header */}
        <PageContainer size="lg">
          <header className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3 text-brand-earth uppercase tracking-widest text-xs font-bold">
              <Activity className="w-4 h-4" />
              Institutional Transparency
            </div>
            <PageTitle>Governance Health</PageTitle>
            <BodyText className="border-l-2 border-brand-earth/20 pl-6 py-2 italic font-medium">
              Monitoring the integrity of the Omoluabi Cultural Archive. High-fidelity preservation over high-velocity expansion.
            </BodyText>
          </header>
        </PageContainer>

        {/* Section 1: Governance Snapshot */}
        <Section spacing="sm">
          <PageContainer size="lg" className="space-y-8">
            <h2 className="text-2xl font-serif font-bold border-b border-brand-indigo/10 pb-4">Governance Snapshot</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <GovernanceCard key={stat.label} {...stat} />
              ))}
            </div>
          </PageContainer>
        </Section>

        {/* Section 2: Preservation Metrics */}
        <Divider />
        <Section spacing="md">
          <PageContainer size="lg" className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-2xl font-serif font-bold">Preservation Metrics</h2>
              <BodyText className="text-sm">
                We track the completeness and source-variety of our archive to ensure historical depth.
              </BodyText>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {preservationMetrics.map((p) => (
                <div key={p.label} className="space-y-2">
                  <p className="text-4xl font-serif font-bold text-brand-indigo">{p.value}</p>
                  <p className="text-sm font-semibold text-brand-indigo/40 uppercase tracking-tight leading-snug">{p.label}</p>
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>
        <Divider />

        {/* Section 3: Integrity Status */}
        <Section spacing="md">
          <PageContainer size="lg" className="space-y-8">
            <IntegrityStatus />
            <p className="text-center text-sm text-brand-indigo/40 font-medium italic">
              Next architectural audit scheduled for April 12, 2026.
            </p>
          </PageContainer>
        </Section>

      </main>
    </div>
  );
}
