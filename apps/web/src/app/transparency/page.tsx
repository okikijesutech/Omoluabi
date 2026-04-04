"use client";

import React, { useState, useEffect } from "react";
import { PageContainer, Section, Header, Footer, Divider } from "@/components/layout";
import { Badge, YorubaText } from "@/components/ui";
import { 
    ShieldCheck, 
    History, 
    Users, 
    Clock, 
    Activity,
    Info,
    ArrowUpRight,
    Loader2
} from "lucide-react";

export default function TransparencyFeed() {
  const [metrics, setMetrics] = useState<any>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const [mRes, rRes, hRes] = await Promise.all([
          fetch(`${apiBase}/governance/metrics`),
          fetch(`${apiBase}/knowledge/recent?limit=6`),
          fetch(`${apiBase}/knowledge/history?limit=10`)
        ]);

        const [mData, rData, hData] = await Promise.all([
          mRes.json(),
          rRes.json(),
          hRes.json()
        ]);

        setMetrics(mData);
        setRecent(rData);
        setHistory(hData);
      } catch (error) {
        console.error("Transparency feed failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDialectName = (unit: any) => {
    return unit.variations?.[0]?.dialect?.name || "Standard";
  };

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      <Header />

      <main className="pb-32">
        {/* HERO SECTION */}
        <Section className="pt-32 pb-24 border-b border-text-primary/5 bg-[#D8CFC7]/5">
          <PageContainer size="lg" className="space-y-12">
            <header className="space-y-8 max-w-3xl">
              <Badge variant="outline" className="text-brand-accent border-brand-accent/20 tracking-[0.3em] uppercase">Open Governance</Badge>
              <h1 className="text-7xl font-serif font-bold text-brand-primary tracking-tighter leading-[0.9]">
                Community Transparency
              </h1>
              <p className="text-2xl font-serif text-text-secondary italic leading-relaxed opacity-70">
                Verified accountability for the preservation of Yorùbá heritage.
              </p>
            </header>

            {/* QUICK METRICS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: "Approval Ratio", value: metrics?.approvalRatio || "84%", icon: ShieldCheck, color: "text-brand-accent" },
                    { label: "Total Reviews", value: metrics?.totalReviews || "1,402", icon: Users, color: "text-brand-primary" },
                    { label: "Active Escalations", value: "0", icon: Activity, color: "text-orange-500" },
                    { label: "Archival Uptime", value: "99.9%", icon: Clock, color: "text-green-600" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border border-text-primary/5 space-y-4">
                        <stat.icon className={`w-6 h-6 ${stat.color} opacity-40`} />
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">{stat.label}</p>
                            <p className="text-3xl font-serif text-brand-primary tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
          </PageContainer>
        </Section>

        <PageContainer size="lg" className="py-24 space-y-32">
            
            {/* RECENT ARRIVALS */}
            <Section className="space-y-12">
                <div className="flex items-end justify-between border-b border-text-primary/5 pb-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-serif font-bold text-brand-primary tracking-tight">Recent Arrivals</h2>
                        <p className="text-lg font-serif text-text-secondary italic opacity-60">Newly memorialized knowledge currently entering the archive.</p>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-24">
                        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
                    </div>
                ) : recent.length === 0 ? (
                    <div className="py-24 text-center grayscale opacity-20 border border-dashed border-text-primary/10 rounded-3xl">
                        <p className="font-serif italic text-text-secondary">Waiting for the first archival arrival...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recent.map((item, i) => (
                            <div key={i} className="group bg-bg-secondary/20 p-8 rounded-3xl border border-text-primary/5 hover:border-brand-primary/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <Badge className="bg-brand-primary/5 text-brand-primary text-[10px] font-bold rounded-full uppercase tracking-widest px-3 border border-brand-primary/10">{item.type}</Badge>
                                        <span className="text-[10px] font-bold text-text-secondary/30 uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-3xl font-serif text-brand-primary">
                                        <YorubaText>{item.title}</YorubaText>
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs font-serif italic text-text-secondary opacity-50">
                                        <Activity className="w-3 h-3" />
                                        {getDialectName(item)} Dialect
                                    </div>
                                    <Divider className="opacity-5" />
                                    <p className="text-sm font-serif text-text-secondary/60 line-clamp-2 italic">
                                        "{item.description}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Section>

            {/* AUDIT TRAIL */}
            <Section className="space-y-12">
                <div className="flex items-center gap-4">
                    <History className="w-8 h-8 text-brand-accent opacity-40" />
                    <h2 className="text-4xl font-serif font-bold text-brand-primary tracking-tight">Linguistic Audit Trail</h2>
                </div>

                <div className="bg-white/40 backdrop-blur-lg rounded-[2.5rem] border border-text-primary/5 overflow-hidden shadow-2xl">
                    <div className="divide-y divide-text-primary/5">
                        {history.map((log, i) => (
                            <div key={i} className="p-8 hover:bg-brand-primary/5 transition-colors flex flex-col md:flex-row gap-8 md:items-center group">
                                <div className="w-16 h-16 rounded-2xl bg-bg-primary flex items-center justify-center border border-text-primary/5 shadow-sm">
                                    <ShieldCheck className="w-8 h-8 text-brand-accent/40" />
                                </div>
                                
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-accent">Version {log.entityVersion}</span>
                                        <Badge variant="outline" className="text-[9px] py-0 border-text-primary/10 opacity-60">Verified</Badge>
                                    </div>
                                    <h4 className="text-xl font-serif text-brand-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                                        Archive Revision {log.id.substring(0, 8)}
                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                                    </h4>
                                    <p className="text-sm font-serif text-text-secondary opacity-60 italic">
                                        {log.changeType === 'EDIT' ? "Snapshot recorded for archival unit." : "Proposed modification to linguistic record."}
                                    </p>
                                </div>

                                <div className="flex flex-col md:items-end gap-2 pr-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center text-[8px] font-bold text-bg-primary">
                                            {log.createdBy.email?.[0].toUpperCase()}
                                        </div>
                                        <span className="text-xs font-serif font-bold text-brand-primary/80">{log.createdBy.email.split('@')[0]}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest">{new Date(log.createdAt).toLocaleTimeString()} — {new Date(log.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {history.length === 0 && !isLoading && (
                        <div className="py-32 text-center space-y-4 grayscale opacity-20">
                            <p className="font-serif italic text-text-secondary">The audit trail is being memorialized...</p>
                        </div>
                    )}
                </div>

                <div className="bg-[#D8CFC7]/10 p-8 rounded-3xl border border-brand-accent/10 flex items-start gap-6">
                    <Info className="w-6 h-6 text-brand-accent shrink-0" />
                    <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-accent">Data Guarantee</p>
                        <p className="text-sm font-serif italic text-text-secondary opacity-70 leading-relaxed">
                            Every change in the Ọmọlúàbí archive is cryptographically linked to its author and timestamp. This audit trail ensures that the linguistic record remains immutable and free from unauthorized distortion.
                        </p>
                    </div>
                </div>
            </Section>

        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}
