'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer, Header, Footer } from '@/components/layout';
import { 
  BarChart3, 
  Activity, 
  Layers, 
  ShieldCheck, 
  TrendingUp,
  Globe,
  Loader2,
  Sparkles,
  Zap,
  Award
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
    <div className="min-h-screen bg-brand-cream/30 dark:bg-zinc-950 pb-32">
      <Header />

      <main className="pt-24 pb-32">
        <PageContainer size="archive">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-brand-indigo/10 rounded-xl text-brand-indigo ring-1 ring-brand-indigo/20">
                      <BarChart3 className="w-5 h-5" />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-indigo/60">
                      Linguistic Growth & Coverage
                   </span>
                </div>
                <h1 className="text-5xl font-serif text-brand-primary tracking-tighter">Heritage Analytics</h1>
                <p className="text-lg text-brand-earth/60 font-serif italic max-w-2xl">
                   A high-fidelity view of the archive's evolution across dialects, 
                   governance efficiency, and community accuracy.
                </p>
             </div>

             <div className="hidden lg:flex items-center gap-4 px-6 py-3 bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-2xl shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary">Live Data Stream</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             </div>
          </header>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              label="Total Reviews" 
              value={stats.totalReviews} 
              icon={<Activity className="w-5 h-5" />}
              color="indigo"
              trend="+12% Expansion"
            />
            <StatCard 
              label="Trust Accuracy" 
              value={stats.approvalRatio} 
              icon={<ShieldCheck className="w-5 h-5" />}
              color="emerald"
              trend="Consensus Prime"
            />
            <StatCard 
              label="Resolutions" 
              value={stats.escalationsResolved} 
              icon={<TrendingUp className="w-5 h-5" />}
              color="gold"
              trend="High Efficiency"
            />
            <StatCard 
              label="Heritage Units" 
              value={stats.totalContributions} 
              icon={<Layers className="w-5 h-5" />}
              color="earth"
              trend="Archive Verified"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            {/* Map & Distribution Area */}
            <div className="lg:col-span-8 bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[3rem] p-10 shadow-2xl shadow-brand-indigo/[0.02] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-brand-indigo/[0.01] rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
               
               <div className="flex items-center justify-between mb-12 relative z-10">
                  <div>
                     <h3 className="text-2xl font-serif text-brand-primary tracking-tight">Dialect Distribution</h3>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40 mt-1 italic leading-relaxed">Structural knowledge density across Yorùbá regions</p>
                  </div>
                  <div className="p-3 bg-brand-indigo/[0.03] rounded-2xl ring-1 ring-brand-indigo/5">
                     <Globe className="w-5 h-5 text-brand-indigo/30" />
                  </div>
               </div>

               <div className="space-y-10 relative z-10">
                  {stats.dialectDistribution.map((dialect: any, idx: number) => {
                    const max = Math.max(...stats.dialectDistribution.map((d: any) => d.value));
                    const percent = (dialect.value / max) * 100;

                    return (
                      <div key={dialect.name} className="group/item">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-sm font-bold text-brand-primary group-hover/item:text-brand-indigo transition-colors flex items-center gap-2">
                             {dialect.name}
                             {idx === 0 && <Award className="w-3.5 h-3.5 text-brand-gold animate-in zoom-in" />}
                          </span>
                          <span className="text-xs font-serif italic text-text-secondary/40 tracking-wider font-medium">{dialect.value} <span className="text-[10px] font-sans font-black uppercase opacity-60 ml-0.5">Units</span></span>
                        </div>
                        <div className="h-4 w-full bg-brand-indigo/[0.03] rounded-2xl overflow-hidden p-[3px] ring-1 ring-brand-indigo/5">
                          <div 
                            className="h-full bg-gradient-to-r from-brand-indigo via-brand-indigo to-brand-gold dark:from-brand-gold dark:to-brand-indigo rounded-full transition-all duration-1000 ease-out delay-[idx*100]ms shadow-[0_0_8px_rgba(187,152,104,0.2)]"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
               </div>

               <div className="mt-16 p-8 bg-brand-gold/[0.03] rounded-[2.5rem] border border-brand-gold/10 relative overflow-hidden group/notice">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/notice:opacity-20 transition-opacity">
                     <Zap className="w-12 h-12 text-brand-gold" />
                  </div>
                  <p className="text-sm text-brand-earth/80 leading-relaxed font-serif italic relative z-10 pr-12">
                    Our Council protocol prioritizes Òyó (Standard) variations to establish foundational archives, with current expansion initiatives targeting localized Ìjẹ̀bú and Èkìtì records for 100% regional fidelity.
                  </p>
               </div>
            </div>

            {/* Sidebar Insights */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-brand-indigo rounded-[3rem] p-10 text-white shadow-2xl shadow-brand-indigo/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/20">
                     <Award className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-serif">Executive Insight</h3>
                  <p className="mt-6 text-sm text-white/70 leading-relaxed italic font-serif">
                    "Structural linguistic stability is improving. Governance escalations are transitioning from spelling disputes to high-fidelity dialectal nuances."
                  </p>
                  <div className="mt-10 flex items-center gap-4">
                     <div className="w-10 h-10 rounded-2xl bg-white/10 ring-1 ring-white/10" />
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/80">Ikúṣènúmọ́</p>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 leading-none">Council Chair</p>
                     </div>
                  </div>
               </div>

               <div className="bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[3rem] p-10 shadow-sm">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40 mb-10 pb-4 border-b border-brand-indigo/5">Active Milestones</h4>
                  <div className="space-y-10">
                     <Milestone name="Standard Archive Verification" progress={85} />
                     <Milestone name="Èkìtì Folklore Synthesis" progress={42} />
                     <Milestone name="Tonal Accuracy Protocol" progress={15} />
                  </div>
               </div>
            </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ label, value, icon, color, trend }: { label: string, value: any, icon: React.ReactNode, color: string, trend: string }) {
  const colorMap: any = {
    indigo: 'bg-brand-indigo/5 text-brand-indigo ring-brand-indigo/10',
    emerald: 'bg-emerald-500/5 text-emerald-500 ring-emerald-500/10',
    gold: 'bg-brand-gold/5 text-brand-gold ring-brand-gold/10',
    earth: 'bg-brand-earth/5 text-brand-earth ring-brand-earth/10'
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-indigo/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={`p-3 rounded-2xl ring-1 ${colorMap[color]}`}>
           {icon}
        </div>
        <span className="text-[8px] font-black uppercase tracking-widest text-text-secondary/30 bg-brand-indigo/[0.03] px-2.5 py-1 rounded-md">{trend}</span>
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/30 mb-1">{label}</p>
        <p className="text-4xl font-serif text-brand-primary tracking-tighter">{value}</p>
      </div>
    </div>
  );
}

function Milestone({ name, progress }: { name: string, progress: number }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
         <span className="text-xs font-bold text-brand-primary tracking-tight">{name}</span>
         <span className="text-[9px] font-black text-brand-indigo/40 tracking-wider">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-brand-indigo/[0.03] rounded-full overflow-hidden p-[2px] ring-1 ring-brand-indigo/5">
         <div 
           className="h-full bg-brand-indigo/60 rounded-full dark:bg-brand-gold/60" 
           style={{ width: `${progress}%` }} 
         />
      </div>
    </div>
  );
}
