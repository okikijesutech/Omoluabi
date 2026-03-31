'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout';
import { PageTitle, BodyText } from '@/components/typography';
import { 
  BarChart3, 
  PieChart, 
  Activity, 
  Layers, 
  ShieldCheck, 
  TrendingUp,
  Globe,
  Loader2
} from 'lucide-react';
import { apiRequest } from '@/lib/api';

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiRequest('/governance/metrics');
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/20">
        <Loader2 className="w-10 h-10 text-brand-indigo animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream/30 dark:bg-zinc-950 pb-24">
      <div className="bg-white dark:bg-zinc-900 border-b border-text-primary/5 pt-16 pb-12">
        <PageContainer size="archive">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-brand-indigo/10 rounded-lg text-brand-indigo ring-1 ring-brand-indigo/20">
                <BarChart3 className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-indigo/60">
                Linguistic Growth & Coverage
             </span>
          </div>
          <PageTitle>Heritage Analytics</PageTitle>
          <BodyText className="mt-4 max-w-2xl text-lg">
            A high-fidelity view of the archive's evolution across dialects, 
            governance efficiency, and community accuracy.
          </BodyText>
        </PageContainer>
      </div>

      <PageContainer size="archive" className="mt-12">
        {/* Core Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Reviews" 
            value={stats.totalReviews} 
            icon={<Activity className="w-5 h-5 text-brand-indigo" />}
            trend="+12% from last month"
          />
          <StatCard 
            title="Trust Accuracy" 
            value={stats.approvalRatio} 
            icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />}
            trend="Consensus stability high"
          />
          <StatCard 
            title="Escalations Resolved" 
            value={stats.escalationsResolved} 
            icon={<TrendingUp className="w-5 h-5 text-brand-gold" />}
            trend="98% council efficiency"
          />
          <StatCard 
            title="Active Contributions" 
            value={stats.totalContributions} 
            icon={<Layers className="w-5 h-5 text-brand-earth" />}
            trend="Growing heritage database"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Dialect Distribution */}
          <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[2rem] p-8 shadow-sm">
             <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-xl font-serif text-brand-primary">Dialect Coverage</h3>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40 mt-1 italic">Knowledge distribution across Yorùbá regions</p>
                </div>
                <Globe className="w-5 h-5 text-brand-indigo/20" />
             </div>

             <div className="space-y-6">
                {stats.dialectDistribution.map((dialect: any, idx: number) => {
                  const max = Math.max(...stats.dialectDistribution.map((d: any) => d.value));
                  const percent = (dialect.value / max) * 100;

                  return (
                    <div key={dialect.name} className="group">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold text-brand-primary group-hover:text-brand-indigo transition-colors">{dialect.name}</span>
                        <span className="text-xs font-serif text-text-secondary/60">{dialect.value} Units</span>
                      </div>
                      <div className="h-3 w-full bg-brand-indigo/[0.03] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-brand-indigo to-brand-gold transition-all duration-1000 ease-out delay-[idx*100]ms"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
             </div>

             <div className="mt-12 p-6 bg-brand-gold/5 rounded-2xl border border-brand-gold/10">
                <p className="text-xs text-brand-earth/80 leading-relaxed font-serif italic">
                  Note: The council is currently prioritizing Òyó (Standard) variations to establish a foundational benchmark, 
                  with a target to increase Ìjẹ̀bú and Èkìtì coverage by 30% this quarter.
                </p>
             </div>
          </div>

          {/* Right: Quick Insights */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-brand-indigo rounded-[2rem] p-8 text-white shadow-2xl shadow-brand-indigo/20 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                <h3 className="text-lg font-serif">Council Insight</h3>
                <p className="mt-4 text-xs text-white/70 leading-relaxed italic">
                  "Linguistic stability is improving. Most escalations are now related to specific tonal nuances in archaic proverbs rather than simple spelling errors."
                </p>
                <div className="mt-8 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/10 ring-1 ring-white/20" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Ikúṣènúmọ́ Council Chair</span>
                </div>
             </div>

             <div className="bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[2rem] p-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary/40 mb-6">Upcoming Milestones</h4>
                <div className="space-y-6">
                   <Milestone name="Standard Ọmọlúàbí Verification" progress={85} />
                   <Milestone name="Èkìtì Folklore Archive" progress={42} />
                   <Milestone name="Tonal Accuracy Auto-Reviewer" progress={15} />
                </div>
             </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: any, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center">
           {icon}
        </div>
        <span className="text-[8px] font-bold text-text-secondary/40 bg-slate-50 px-2 py-1 rounded-md">{trend}</span>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40">{title}</p>
        <p className="text-3xl font-serif text-brand-primary mt-1">{value}</p>
      </div>
    </div>
  );
}

function Milestone({ name, progress }: { name: string, progress: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
         <span className="text-xs font-bold text-brand-primary">{name}</span>
         <span className="text-[10px] font-serif text-text-secondary/60">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-brand-indigo/[0.03] rounded-full overflow-hidden">
         <div className="h-full bg-brand-indigo/20 rounded-full" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
