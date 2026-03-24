"use client";

import React, { useState, useEffect } from "react";
import { PageContainer, Header, Footer, Divider, Section } from "@/components/layout";
import { Badge, YorubaText } from "@/components/ui";
import { Button } from "@/components/ui/Button";
import { 
    ShieldCheck, 
    Star, 
    TrendingUp, 
    CheckCircle2, 
    XCircle, 
    Clock, 
    Award,
    Info,
    Activity,
    Loader2,
    History
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${apiBase}/users/me`, {
          headers: {
            'x-guest-test': 'true' // Simulating the current user for dev
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Profile fetch failed", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getRolePrestige = (role: string) => {
    const roles: any = {
      LEARNER: { label: "Cultural Learner", color: "text-slate-500", icon: Clock },
      CONTRIBUTOR: { label: "Knowledge Steward", color: "text-brand-primary", icon: ShieldCheck },
      REVIEWER: { label: "Linguistic Validator", color: "text-brand-accent", icon: Award },
      ADMIN: { label: "Council Member", color: "text-brand-indigo", icon: Star }
    };
    return roles[role] || roles.LEARNER;
  };

  const getNextRole = (role: string) => {
    if (role === 'LEARNER' || role === 'CONTRIBUTOR') return { label: 'REVIEWER', requirement: 10 };
    if (role === 'REVIEWER') return { label: 'COUNCIL', requirement: 50 };
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-accent animate-spin" />
      </div>
    );
  }

  if (!user) return (
      <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center space-y-4">
          <p className="font-serif italic text-text-secondary">Identity not found in archive.</p>
          <Button onClick={() => window.location.reload()}>Retry Sync</Button>
      </div>
  );

  const roleInfo = getRolePrestige(user.role);
  const nextRole = getNextRole(user.role);
  const progressPercent = nextRole ? Math.min(100, (user.approvedCount / nextRole.requirement) * 100) : 100;

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20 text-text-primary">
      <Header />

      <main className="pb-32">
        {/* HERO SECTION */}
        <div className="bg-[#D8CFC7]/5 border-b border-text-primary/5 pt-32 pb-24">
            <PageContainer size="lg">
                <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-brand-primary flex items-center justify-center text-5xl font-serif text-bg-primary shadow-2xl transition-transform group-hover:rotate-6">
                            {user.email[0].toUpperCase()}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-brand-accent text-bg-primary p-2 rounded-full border-4 border-bg-primary shadow-lg">
                            <roleInfo.icon className="w-5 h-5" />
                        </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                            <h1 className="text-5xl font-serif font-bold text-brand-primary tracking-tighter leading-none">
                                {user.email.split('@')[0]}
                            </h1>
                            <Badge variant="outline" className={`${roleInfo.color} border-current font-bold px-4 py-1 tracking-widest text-[10px] uppercase bg-white/50 backdrop-blur-sm`}>
                                {roleInfo.label}
                            </Badge>
                        </div>
                        <p className="text-xl font-serif text-text-secondary italic opacity-60">
                            Preserving the Yorùbá record since {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="bg-white/60 p-8 rounded-[2rem] border border-text-primary/5 shadow-inner backdrop-blur-sm min-w-[240px]">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary/30 mb-2">Impact Authority</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-serif font-bold text-brand-primary tracking-tighter">{user.trustScore.toFixed(1)}</span>
                            <span className="text-xs font-bold text-brand-accent">TS</span>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </div>

        <PageContainer size="lg" className="py-24 space-y-24">
            
            {/* STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-bg-secondary/20 p-8 rounded-[2rem] border border-text-primary/5 space-y-6 flex flex-col justify-between group hover:bg-bg-secondary/30 transition-all">
                    <div className="flex items-center gap-3 text-green-600 opacity-60">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Approved Records</span>
                    </div>
                    <p className="text-6xl font-serif text-brand-primary tracking-tighter leading-none">{user.approvedCount}</p>
                </div>
                <div className="bg-bg-secondary/20 p-8 rounded-[2rem] border border-text-primary/5 space-y-6 flex flex-col justify-between group hover:bg-bg-secondary/30 transition-all">
                    <div className="flex items-center gap-3 text-brand-accent opacity-60">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Review Accuracy</span>
                    </div>
                    <p className="text-6xl font-serif text-brand-primary tracking-tighter leading-none">{(user.reviewAccuracy * 100).toFixed(0)}%</p>
                </div>
                <div className="bg-bg-secondary/20 p-8 rounded-[2rem] border border-text-primary/5 space-y-6 flex flex-col justify-between group hover:bg-bg-secondary/30 transition-all">
                    <div className="flex items-center gap-3 text-text-secondary/30">
                        <History className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Archival Reviews</span>
                    </div>
                    <p className="text-6xl font-serif text-brand-primary tracking-tighter leading-none">{user.totalReviews}</p>
                </div>
            </div>

            {/* PROGRESSION PATH */}
            {nextRole && (
                <Section className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-serif font-bold text-brand-primary tracking-tight">Path to {nextRole.label}</h2>
                            <p className="text-lg font-serif italic text-text-secondary opacity-60 leading-relaxed">High-accuracy contributions unlock deep archival authority.</p>
                        </div>
                        <Badge variant="outline" className="mb-2 text-brand-accent border-brand-accent/20 bg-brand-accent/5 px-6 py-2 uppercase tracking-widest text-[10px]">
                            {nextRole.requirement - user.approvedCount} Approvals Until Promotion
                        </Badge>
                    </div>
                    
                    <div className="bg-bg-secondary/10 p-12 rounded-[2.5rem] border border-text-primary/5 space-y-12 shadow-inner">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[11px] font-bold tracking-[0.4em] text-text-secondary/30 uppercase">
                                <span>{user.role}</span>
                                <span>{nextRole.label}</span>
                            </div>
                            <div className="w-full h-5 bg-bg-primary rounded-full p-1 border border-text-primary/5 shadow-sm overflow-hidden ring-4 ring-bg-secondary/10">
                                <div 
                                    className="h-full bg-brand-primary rounded-full transition-all duration-1000 shadow-lg relative"
                                    style={{ width: `${progressPercent}%` }}
                                >
                                    <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white/20 to-transparent" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-4">
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center shrink-0 border border-green-500/10">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Archival Consensus</p>
                                    <p className="text-sm font-serif italic text-text-secondary/60 leading-relaxed">Your contributions consistently align with community elders and linguistic experts.</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-start">
                                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center shrink-0 border border-brand-accent/10">
                                    <ShieldCheck className="w-6 h-6 text-brand-accent" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary">Community Integrity</p>
                                    <p className="text-sm font-serif italic text-text-secondary/60 leading-relaxed">Your review accuracy has remained above 80% for the last 15 validations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>
            )}

            {/* RECENT IMPACT */}
            <Section className="space-y-12">
                <div className="flex items-center gap-4">
                    <Activity className="w-10 h-10 text-brand-primary opacity-20" />
                    <h2 className="text-4xl font-serif font-bold text-brand-primary tracking-tight">Recent Archival Impact</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {user.contributions.map((item: any, i: number) => (
                        <div key={i} className="bg-white/40 backdrop-blur-sm border border-text-primary/5 rounded-[1.5rem] p-8 flex flex-col md:flex-row md:items-center gap-10 group hover:bg-white/80 transition-all hover:shadow-2xl hover:-translate-y-1">
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-4">
                                    <Badge variant="outline" className={`text-[9px] py-0 border-none font-bold tracking-widest ${item.status === 'APPROVED' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {item.status}
                                    </Badge>
                                    <span className="text-[10px] text-text-secondary/30 font-bold uppercase tracking-widest">{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <h3 className="text-3xl font-serif text-brand-primary group-hover:translate-x-1 transition-transform">
                                    <YorubaText>{item.content.title}</YorubaText>
                                </h3>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Archival Status</p>
                                    <p className={`text-sm font-serif italic font-bold ${item.status === 'APPROVED' ? 'text-green-600' : 'text-orange-500'}`}>
                                        {item.status === 'APPROVED' ? 'Memorialized in Record' : 'Under Community Review'}
                                    </p>
                                </div>
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform ${item.status === 'APPROVED' ? 'bg-green-600 text-bg-primary' : 'bg-orange-500 text-bg-primary'}`}>
                                    {item.status === 'APPROVED' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                </div>
                            </div>
                        </div>
                    ))}
                    {user.contributions.length === 0 && (
                        <div className="py-32 text-center border-4 border-dashed border-text-primary/5 rounded-[3rem] grayscale opacity-30 space-y-6">
                            <Activity className="w-16 h-16 mx-auto text-brand-accent/20" />
                            <div className="space-y-2">
                                <p className="text-2xl font-serif italic text-text-secondary">Your archival path begins here.</p>
                                <p className="text-sm font-serif italic text-text-secondary/50">Submit your first contribution to start building trust.</p>
                            </div>
                            <Button variant="outline" className="rounded-full px-10 py-6 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-brand-primary hover:text-bg-primary transition-all">Start Preserving</Button>
                        </div>
                    )}
                </div>
            </Section>

            {/* TRUST FORMULA PANEL */}
            <div className="bg-brand-primary p-16 rounded-[4rem] text-bg-primary space-y-12 relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(30,30,30,0.4)]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
                
                <header className="space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-3 bg-white/10 text-white border border-white/20 uppercase tracking-[0.4em] text-[10px] py-2 px-6 rounded-full font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        Archival Protocol
                    </div>
                    <h2 className="text-6xl font-serif font-bold tracking-tighter leading-none">The Integrity Engine</h2>
                    <p className="text-2xl font-serif italic opacity-70 max-w-2xl leading-relaxed">
                        Trust in Ọmọlúàbí is mathematical, not social. Your authority grows through the verified accuracy of your linguistic contributions.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative z-10 pt-8">
                    <div className="space-y-4">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">Precision Reward</p>
                        <p className="text-2xl font-serif leading-relaxed italic">Approvals provide 2x weight to your archival TS score.</p>
                    </div>
                    <div className="space-y-4 md:border-x md:border-white/10 md:px-16">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">Validation Bonus</p>
                        <p className="text-2xl font-serif leading-relaxed italic text-brand-accent">Review accuracy adds 5x weight to your seniority.</p>
                    </div>
                    <div className="space-y-4 font-bold">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] opacity-40">Conflict Penalty</p>
                        <p className="text-2xl font-serif leading-relaxed italic">Factual rejections reduce authority until corrected.</p>
                    </div>
                </div>

                <Divider className="opacity-10" />

                <div className="pt-4 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] opacity-40">
                    <Info className="w-5 h-5" />
                    System Protocol v3.14 — Verified by Council Consensus
                </div>
            </div>

        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}
