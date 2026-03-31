'use client';

import React, { useEffect, useState } from 'react';
import { PageContainer, Header, Footer } from '@/components/layout';
import { Trophy, Medal, Star, ShieldCheck, Loader2, Sparkles, Award, TrendingUp, User } from 'lucide-react';
import { apiRequest } from '@/lib/api';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const data = await apiRequest('/users/leaderboard');
      setUsers(data);
    } catch (e) {
      console.error('Failed to fetch leaderboard:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const parseRoleBg = (role: string) => {
    if (role === 'ADMIN') return 'bg-brand-indigo text-white border-brand-indigo shadow-lg shadow-brand-indigo/20';
    if (role === 'REVIEWER') return 'bg-brand-gold/10 text-brand-gold border-brand-gold/20';
    if (role === 'CONTRIBUTOR') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    return 'bg-brand-earth/5 text-brand-earth/40 border-brand-earth/10';
  };

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  if (isLoading) {
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
          <header className="text-center space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="flex justify-center mb-6">
                <div className="relative group">
                   <div className="absolute inset-0 bg-brand-gold/20 rounded-full blur-2xl animate-pulse group-hover:scale-150 transition-transform duration-1000" />
                   <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-[2.5rem] flex items-center justify-center ring-1 ring-brand-gold/20 relative z-10 shadow-2xl">
                      <Trophy className="w-10 h-10 text-brand-gold" />
                   </div>
                </div>
             </div>
             <div className="space-y-4">
                <h1 className="text-6xl font-serif text-brand-primary tracking-tighter leading-none">The Hall of Guardians</h1>
                <p className="text-lg text-brand-earth/60 font-serif italic max-w-2xl mx-auto leading-relaxed">
                   Honoring the scholars and custodians algorithmically ranked by their dedication 
                   to the cultural preservation of the Yorùbá heritage.
                </p>
             </div>
          </header>

          {/* Top 3 Podium: The High Guardians */}
          <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-12 mb-32 relative">
             <div className="absolute inset-x-0 bottom-0 h-px bg-brand-indigo/5 dark:bg-zinc-800 -z-10" />

             {/* 2nd Place: Silver Guardian */}
             {top3[1] && (
               <GuardianCard 
                 user={top3[1]} 
                 rank={2} 
                 icon={<Medal className="w-7 h-7 text-slate-400" />}
                 className="md:w-72 h-[380px]"
                 color="silver"
               />
             )}

             {/* 1st Place: Gold Guardian */}
             {top3[0] && (
               <GuardianCard 
                 user={top3[0]} 
                 rank={1} 
                 icon={<Trophy className="w-10 h-10 text-brand-gold" />}
                 className="md:w-80 h-[440px] md:-translate-y-6"
                 color="gold"
               />
             )}

             {/* 3rd Place: Bronze Guardian */}
             {top3[2] && (
               <GuardianCard 
                 user={top3[2]} 
                 rank={3} 
                 icon={<Medal className="w-7 h-7 text-brand-gold/40" />}
                 className="md:w-72 h-[340px]"
                 color="bronze"
               />
             )}
          </div>

          {/* List Remaining: The Honor Roll */}
          <div className="max-w-4xl mx-auto space-y-6">
             <div className="flex items-center gap-3 px-8 mb-8">
                <TrendingUp className="w-4 h-4 text-brand-indigo/40" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-indigo/30">The Honor Roll</h3>
             </div>

             <div className="space-y-4">
                {rest.map((user, idx) => (
                  <HonorRow key={user.id} user={user} rank={idx + 4} />
                ))}

                {rest.length === 0 && users.length > 0 && (
                  <div className="py-20 text-center border-2 border-dashed border-brand-indigo/5 rounded-[3rem] bg-white/30">
                     <p className="text-xs font-serif text-brand-earth/40 italic">More Guardians await verification.</p>
                  </div>
                )}
             </div>
          </div>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}

function GuardianCard({ user, rank, icon, className, color }: any) {
  const colorBgs: any = {
    gold: 'bg-brand-gold/[0.03] border-brand-gold/20 shadow-brand-gold/10',
    silver: 'bg-slate-500/[0.03] border-slate-500/10 shadow-slate-500/10',
    bronze: 'bg-brand-gold/[0.01] border-brand-gold/10 shadow-brand-gold/5'
  };

  return (
    <div className={`w-full group bg-white dark:bg-zinc-900 border rounded-[3rem] p-8 text-center transition-all duration-700 hover:shadow-2xl flex flex-col justify-between ${colorBgs[color]} ${className}`}>
       <div className="relative">
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-16 h-16 bg-white dark:bg-zinc-800 rounded-full shadow-2xl flex items-center justify-center ring-4 ring-white dark:ring-zinc-900 border border-brand-indigo/5 z-20">
             {icon}
          </div>
          <div className="mt-10 space-y-3">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-indigo/30 leading-none mb-4">Rank {rank}</p>
             <h3 className="text-2xl font-serif text-brand-primary tracking-tight group-hover:scale-105 transition-transform duration-500">{user.email.split('@')[0]}</h3>
             <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 border border-brand-indigo/5 ${
               user.role === 'ADMIN' ? 'bg-brand-indigo text-white shadow-xl shadow-brand-indigo/20' : 'bg-brand-indigo/5 text-brand-indigo'
             }`}>
                {user.role}
             </div>
          </div>
       </div>

       <div className="space-y-6 pt-10 border-t border-brand-indigo/[0.03]">
          <div className="space-y-1">
             <p className="text-4xl font-serif text-brand-primary">{user.xp} <span className="text-xs font-sans font-black uppercase tracking-widest text-text-secondary/40">XP</span></p>
          </div>
          <div className="flex items-center justify-center gap-6">
             <div className="text-center">
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-indigo/30 mb-0.5">Trust</p>
                <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold">
                   <ShieldCheck className="w-3.5 h-3.5" />
                   {user.trustScore}
                </div>
             </div>
             <div className="w-px h-6 bg-brand-indigo/5" />
             <div className="text-center">
                <p className="text-[8px] font-black uppercase tracking-widest text-brand-indigo/30 mb-0.5">Level</p>
                <p className="text-xs font-black text-brand-indigo/60">{user.level}</p>
             </div>
          </div>
       </div>
    </div>
  );
}

function HonorRow({ user, rank }: { user: any, rank: number }) {
  return (
    <div className="group bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[2rem] p-6 hover:shadow-xl hover:scale-[1.01] transition-all duration-500 flex items-center justify-between gap-8 relative overflow-hidden">
       <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
       
       <div className="flex items-center gap-8 relative z-10">
          <span className="text-2xl font-serif text-brand-indigo/20 group-hover:text-brand-indigo transition-colors flex-shrink-0 w-12 text-center italic font-bold">#{rank}</span>
          <div className="w-12 h-12 bg-brand-indigo/[0.03] rounded-2xl flex items-center justify-center group-hover:bg-brand-indigo/5 group-hover:scale-110 transition-all">
             <User className="w-5 h-5 text-brand-indigo/20 group-hover:text-brand-indigo/60" />
          </div>
          <div>
             <h4 className="text-lg font-serif text-brand-primary tracking-tight">{user.email.split('@')[0]}</h4>
             <div className="flex items-center gap-3 mt-1 opacity-60">
                <span className="text-[9px] font-black uppercase tracking-widest text-brand-indigo">LVL {user.level}</span>
                <div className="w-1 h-1 rounded-full bg-brand-indigo/20" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600">{user.trustScore} Trust</span>
             </div>
          </div>
       </div>

       <div className="flex items-center gap-12 relative z-10 pr-4">
          <div className={`px-4 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest border border-brand-indigo/10 ${
             user.role === 'ADMIN' ? 'bg-brand-indigo text-white shadow-xl shadow-brand-indigo/20 border-brand-indigo' : 'bg-brand-indigo/5 text-brand-indigo/60'
          }`}>
             {user.role}
          </div>
          <div className="text-right">
             <p className="text-2xl font-serif text-brand-primary leading-none">{user.xp} <span className="text-[9px] font-sans font-black uppercase tracking-tighter text-text-secondary/40">XP</span></p>
          </div>
          <ChevronRight className="w-4 h-4 text-brand-indigo/20 group-hover:translate-x-1 transition-transform" />
       </div>
    </div>
  );
}
