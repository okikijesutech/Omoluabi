"use client";

import React, { useEffect, useState } from 'react';
import { PageContainer, Section, Header, Footer } from '@/components/layout';
import { PageTitle } from '@/components/typography';
import { 
  ShieldCheck, 
  Inbox, 
  AlertCircle, 
  History as HistoryIcon, 
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Loader2
} from 'lucide-react';
import { ReviewQueue } from '@/components/governance';

export default function ReviewerDashboard() {
  const [metrics, setMetrics] = useState({
    pending: 0,
    approvalsToday: 12,
    conflicts: 3,
    activeReviewers: 5
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulated fetch for metrics
    const fetchMetrics = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/governance/metrics`);
        if (res.ok) {
          const data = await res.json();
          setMetrics(prev => ({ ...prev, ...data }));
        }
      } catch (e) {
        console.error("Failed to fetch metrics", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      <main className="pb-24">
        {/* Metric Ribbon */}
        <Section spacing="sm" className="bg-brand-primary text-bg-primary py-4 border-b border-white/5">
          <PageContainer size="archive">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <MetricItem label="Pending Submissions" value={metrics.pending} icon={Inbox} color="text-brand-accent" />
              <MetricItem label="Approvals Today" value={metrics.approvalsToday} icon={CheckCircle2} />
              <MetricItem label="Active Conflicts" value={metrics.conflicts} icon={AlertCircle} color="text-red-400" />
              <MetricItem label="Trusted Reviewers" value={metrics.activeReviewers} icon={Users} />
            </div>
          </PageContainer>
        </Section>

        {/* Header Section */}
        <Section spacing="lg" className="border-b border-text-primary/5 bg-white/50">
          <PageContainer size="archive">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-16">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-2 text-brand-accent uppercase tracking-[0.4em] text-[10px] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  Preservation Governance
                </div>
                <PageTitle className="!text-5xl !text-brand-primary tracking-tighter">Reviewer Dashboard</PageTitle>
                <p className="text-lg font-serif text-text-secondary italic leading-relaxed border-l-2 border-brand-accent/20 pl-6">
                  Upholding tonal integrity and dialect parity across the global Yoruba archive.
                </p>
              </div>
              
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white border border-text-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-bg-secondary transition-colors">
                  <HistoryIcon className="w-4 h-4 inline-block mr-2" /> My Logs
                </button>
                <button className="px-6 py-3 bg-brand-primary text-bg-primary rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-accent transition-colors shadow-lg shadow-brand-primary/20">
                  <Users className="w-4 h-4 inline-block mr-2" /> Council Seats
                </button>
              </div>
            </header>
          </PageContainer>
        </Section>

        {/* Main Content: Review Queue */}
        <Section spacing="xl">
          <PageContainer size="archive">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Syncing with Archive...</p>
              </div>
            ) : (
              <ReviewQueue />
            )}
          </PageContainer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

function MetricItem({ label, value, icon: Icon, color = "text-white" }: { label: string, value: number | string, icon: any, color?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`p-2 bg-white/10 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[9px] font-bold uppercase tracking-widest opacity-60 leading-none mb-1">{label}</p>
        <p className="text-xl font-bold font-serif leading-none">{value}</p>
      </div>
    </div>
  );
}
