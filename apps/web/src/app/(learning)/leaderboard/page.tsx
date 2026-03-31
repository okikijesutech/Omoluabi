"use client";
import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Star, ShieldCheck, Loader2 } from 'lucide-react';

export default function LeaderboardPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/leaderboard`);
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const parseRoleBg = (role: string) => {
    if (role === 'ADMIN') return 'bg-brand-accent/20 text-brand-accent border-brand-accent/30';
    if (role === 'REVIEWER') return 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20';
    if (role === 'CONTRIBUTOR') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    return 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400';
  };

  const top3 = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <header className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-brand-accent/20 to-brand-accent/5 flex items-center justify-center border border-brand-accent/20">
          <Trophy className="w-10 h-10 text-brand-accent" />
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-serif text-brand-indigo dark:text-brand-cream tracking-tight">The Guardians</h1>
          <p className="text-lg text-brand-earth dark:text-brand-gold/80 max-w-2xl mx-auto">
            Recognizing the scholars and contributors algorithmically ranked by their dedication to the cultural preservation of the Yoruba language.
          </p>
        </div>
      </header>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-indigo/30 animate-spin dark:text-brand-cream/30" />
        </div>
      ) : users.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-brand-indigo/10 rounded-3xl bg-white/50 dark:bg-zinc-900/50 dark:border-zinc-800">
          <p className="text-brand-indigo/60 font-serif text-lg dark:text-brand-cream/60">The leaderboard is currently empty.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Top 3 Podium */}
          <div className="flex flex-col md:flex-row items-end justify-center gap-6 md:gap-8 pt-10">
            {/* 2nd Place */}
            {top3[1] && (
              <div className="w-full md:w-64 bg-white border border-brand-indigo/10 shadow-lg rounded-[2rem] p-6 text-center transform hover:-translate-y-2 transition-transform relative dark:bg-zinc-900 dark:border-zinc-800">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center border-4 border-white shadow-inner dark:bg-zinc-700 dark:border-zinc-900">
                   <Medal className="w-6 h-6 text-slate-500" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="font-bold text-brand-indigo dark:text-brand-cream break-all px-2">{top3[1].email.split('@')[0]}</div>
                  <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border inline-block ${parseRoleBg(top3[1].role)}`}>{top3[1].role}</div>
                  <div className="pt-4 border-t border-brand-indigo/5 dark:border-zinc-800">
                    <div className="text-3xl font-serif text-brand-accent">{top3[1].xp} <span className="text-sm font-sans tracking-widest uppercase opacity-50">XP</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {top3[0] && (
              <div className="w-full md:w-72 bg-gradient-to-b from-brand-accent/5 to-white border border-brand-accent/20 shadow-2xl rounded-[2.5rem] p-8 text-center transform md:-translate-y-4 hover:-translate-y-6 transition-transform relative dark:from-brand-accent/10 dark:to-zinc-900">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center border-4 border-white shadow-inner dark:bg-yellow-900/50 dark:border-zinc-900">
                   <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <div className="mt-8 space-y-4">
                  <div className="text-xl font-bold text-brand-indigo dark:text-brand-cream break-all px-2">{top3[0].email.split('@')[0]}</div>
                  <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border inline-block ${parseRoleBg(top3[0].role)}`}>{top3[0].role}</div>
                  <div className="pt-6 border-t border-brand-indigo/5 dark:border-zinc-800 space-y-2">
                    <div className="text-4xl font-serif text-brand-accent">{top3[0].xp} <span className="text-base font-sans tracking-widest uppercase opacity-50">XP</span></div>
                    <div className="flex items-center justify-center gap-2 text-xs font-medium text-brand-indigo/60 dark:text-brand-cream/60">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {top3[0].trustScore} Trust
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {top3[2] && (
              <div className="w-full md:w-64 bg-white border border-brand-indigo/10 shadow-lg rounded-[2rem] p-6 text-center transform hover:-translate-y-2 transition-transform relative dark:bg-zinc-900 dark:border-zinc-800">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-amber-100/50 flex items-center justify-center rounded-full border-4 border-white shadow-inner dark:bg-amber-900/30 dark:border-zinc-900">
                   <Medal className="w-6 h-6 text-amber-700/60" />
                </div>
                <div className="mt-6 space-y-4">
                  <div className="font-bold text-brand-indigo dark:text-brand-cream break-all px-2">{top3[2].email.split('@')[0]}</div>
                  <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border inline-block ${parseRoleBg(top3[2].role)}`}>{top3[2].role}</div>
                  <div className="pt-4 border-t border-brand-indigo/5 dark:border-zinc-800">
                    <div className="text-3xl font-serif text-brand-accent">{top3[2].xp} <span className="text-sm font-sans tracking-widest uppercase opacity-50">XP</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* List Remaining */}
          {rest.length > 0 && (
            <div className="bg-white rounded-[2rem] border border-brand-indigo/10 shadow-sm overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-brand-indigo/5 dark:bg-zinc-800/50">
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60">Rank</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60">Guardian</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60">Role & Level</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60 text-right">Metrics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-indigo/5 dark:divide-zinc-800/50">
                    {rest.map((user, idx) => (
                      <tr key={user.id} className="hover:bg-brand-indigo/5 dark:hover:bg-zinc-800/50 transition-colors">
                        <td className="px-8 py-6">
                           <span className="text-xl font-serif font-bold text-brand-indigo/30 dark:text-brand-cream/30">#{idx + 4}</span>
                        </td>
                        <td className="px-8 py-6 font-bold text-brand-indigo dark:text-brand-cream">
                           {user.email.split('@')[0]}
                        </td>
                        <td className="px-8 py-6 space-y-1">
                           <div className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border inline-block ${parseRoleBg(user.role)}`}>{user.role}</div>
                           <div className="text-[10px] font-medium text-brand-earth dark:text-brand-gold ml-1">LVL {user.level}</div>
                        </td>
                        <td className="px-8 py-6 text-right space-y-1">
                           <div className="text-lg font-bold text-brand-accent">{user.xp} <span className="text-[10px] tracking-widest uppercase opacity-60">XP</span></div>
                           <div className="text-[11px] font-medium text-brand-indigo/60 dark:text-brand-cream/60">{user.trustScore} Trust Score</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
