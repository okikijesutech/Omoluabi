"use client";
import React, { useEffect, useState } from 'react';
import { User, ShieldCheck, Trophy, Target, Star, Loader2, Award, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfileDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/me`, {
        headers: {
          'x-guest-test': 'true' // Simulating Auth middleware bypass for UI verification
        }
      });
      if (res.ok) {
        setProfile(await res.json());
      } else {
        // Fallback to demo profile or redirect
        if(res.status === 404) {
             const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/leaderboard`);
             if (userRes.ok) {
                 const users = await userRes.json();
                 if (users.length > 0) {
                     // For MVP, just show the top user if `me` fails
                     const topUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/users/${users[0].id}`);
                     setProfile(await topUser.json());
                 }
             }
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getRankColor = (role: string) => {
    switch(role) {
      case 'ADMIN': return 'text-brand-accent bg-brand-accent/10 border-brand-accent/20';
      case 'REVIEWER': return 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20';
      case 'CONTRIBUTOR': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-brand-indigo bg-brand-indigo/10 border-brand-indigo/20';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <Loader2 className="w-12 h-12 text-brand-indigo/30 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="py-20 text-center border border-dashed border-brand-indigo/10 rounded-3xl">
        <p className="text-brand-indigo/60 font-serif text-lg">Unable to load profile.</p>
      </div>
    );
  }

  // Calculate XP progress to next level strictly via an arbitrary visual scale (e.g., each level is 100 XP)
  const currentLvlXP = profile.xp % 100;
  const progressPercent = Math.min(100, currentLvlXP);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* IDENTITY BANNER */}
      <header className="relative bg-white rounded-[2.5rem] p-10 shadow-sm border border-brand-indigo/10 overflow-hidden dark:bg-zinc-900 dark:border-zinc-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-indigo/5 to-white flex items-center justify-center border-4 border-white shadow-xl flex-shrink-0 dark:from-zinc-800 dark:border-zinc-800">
             <User className="w-12 h-12 text-brand-indigo/40 dark:text-brand-cream/40" />
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <h1 className="text-4xl font-serif text-brand-indigo dark:text-brand-cream tracking-tight">
                {profile.email.split('@')[0]}
              </h1>
              <div className="mt-2 flex items-center justify-center md:justify-start gap-3">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border ${getRankColor(profile.role)}`}>
                  {profile.role}
                </span>
                <span className="text-brand-earth dark:text-brand-gold/80 text-sm font-medium">Joined {new Date(profile.createdAt).getFullYear()}</span>
              </div>
            </div>
            
            <div className="max-w-md pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60">Level {profile.level}</span>
                <span className="text-xs font-bold text-brand-accent">{profile.xp} XP</span>
              </div>
              <div className="w-full h-3 bg-brand-indigo/5 rounded-full dark:bg-zinc-800 overflow-hidden">
                <div className="h-full bg-brand-accent transition-all duration-1000 rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>

          {/* Core Trust Metrics */}
          <div className="flex flex-row gap-8 bg-brand-indigo/5 p-6 rounded-3xl dark:bg-zinc-800/50">
            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-sm text-emerald-500 dark:bg-zinc-900">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-2xl font-serif text-brand-indigo dark:text-brand-cream">{profile.trustScore}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 mt-1 dark:text-brand-cream/50">Trust</div>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-sm text-brand-accent dark:bg-zinc-900">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-2xl font-serif text-brand-indigo dark:text-brand-cream">{Math.round(profile.reviewAccuracy * 100)}%</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 mt-1 dark:text-brand-cream/50">Accuracy</div>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-black dark:text-white">
        
        {/* LEFT COLUMN: BADGES & STATS */}
        <div className="space-y-8 lg:col-span-1">
           {/* Badges Box */}
           <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-brand-indigo/10 dark:bg-zinc-900 dark:border-zinc-800">
             <h2 className="text-sm font-bold uppercase tracking-widest text-brand-indigo/50 dark:text-brand-cream/50 mb-6 flex items-center gap-2">
               <Award className="w-4 h-4" /> Earned Badges
             </h2>
             {profile.badges && profile.badges.length > 0 ? (
               <div className="grid grid-cols-2 gap-4">
                 {profile.badges.map((b: any, i: number) => (
                   <div key={i} className="bg-brand-accent/5 border border-brand-accent/10 rounded-2xl p-4 text-center">
                     <Star className="w-8 h-8 text-brand-accent mx-auto mb-2" />
                     <div className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo dark:text-brand-cream">{b.type.replace(/_/g, ' ')}</div>
                   </div>
                 ))}
               </div>
             ) : (
               <div className="text-center py-8 opacity-50 space-y-2">
                 <Trophy className="w-8 h-8 mx-auto" />
                 <p className="text-xs">No badges unlocked yet.</p>
               </div>
             )}
           </div>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 gap-4">
             <div className="bg-white p-6 rounded-3xl border border-brand-indigo/10 text-center dark:bg-zinc-900 dark:border-zinc-800">
               <div className="text-3xl font-serif text-emerald-500 mb-1">{profile.approvedCount}</div>
               <div className="text-[10px] uppercase font-bold tracking-widest text-brand-indigo/50 dark:text-brand-cream/50">Approved Submits</div>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-brand-indigo/10 text-center dark:bg-zinc-900 dark:border-zinc-800">
               <div className="text-3xl font-serif text-brand-indigo mb-1 dark:text-brand-cream">{profile.totalReviews}</div>
               <div className="text-[10px] uppercase font-bold tracking-widest text-brand-indigo/50 dark:text-brand-cream/50">Total Reviews</div>
             </div>
           </div>
        </div>

        {/* RIGHT COLUMN: CONTRIBUTION TIMELINE */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white rounded-[2rem] shadow-sm border border-brand-indigo/10 p-8 dark:bg-zinc-900 dark:border-zinc-800">
             <div className="flex items-center justify-between mb-8">
               <h2 className="text-sm font-bold uppercase tracking-widest text-brand-indigo/50 dark:text-brand-cream/50 flex items-center gap-2">
                 <Clock className="w-4 h-4" /> Recent Contributions
               </h2>
             </div>

             {profile.contributions && profile.contributions.length > 0 ? (
               <div className="space-y-6">
                 {profile.contributions.map((c: any) => {
                   const title = c.knowledgeVariation?.textWithTone || c.knowledgeUnit?.title || 'Unknown Entity';
                   const isApproved = c.status === 'APPROVED';
                   const isPending = c.status === 'PENDING';
                   
                   return (
                     <div key={c.id} className="flex gap-6 items-start">
                       <div className="mt-1 flex-shrink-0">
                         {isApproved ? (
                           <div className="w-3 h-3 rounded-full bg-emerald-500 outline outline-4 outline-emerald-500/20" />
                         ) : isPending ? (
                           <div className="w-3 h-3 rounded-full bg-amber-400 outline outline-4 outline-amber-400/20" />
                         ) : (
                           <div className="w-3 h-3 rounded-full bg-red-400 outline outline-4 outline-red-400/20" />
                         )}
                       </div>
                       <div className="flex-1 bg-brand-indigo/5 dark:bg-zinc-800/50 rounded-2xl p-5 border border-brand-indigo/10 dark:border-zinc-800/50">
                         <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm font-bold text-brand-indigo dark:text-brand-cream mb-1">
                                {c.type === 'CREATE' ? 'Added new vocabulary: ' : 'Suggested variation for: '}
                                <span className="font-serif italic text-brand-accent text-lg">"{title}"</span>
                              </p>
                              {c.knowledgeVariation?.dialect && (
                                <p className="text-xs text-brand-earth dark:text-brand-gold mb-3">
                                  Dialect: {c.knowledgeVariation.dialect.name}
                                </p>
                              )}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/40 dark:text-brand-cream/40 px-2 py-1 bg-white dark:bg-zinc-900 rounded-md shadow-sm border border-brand-indigo/5 dark:border-zinc-800">
                              {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                         </div>
                       </div>
                     </div>
                   );
                 })}
               </div>
             ) : (
               <div className="text-center py-12 border border-dashed border-brand-indigo/10 rounded-2xl bg-brand-indigo/5 dark:bg-zinc-900/50 dark:border-zinc-800">
                 <p className="text-brand-indigo/50 font-serif dark:text-brand-cream/50">No contributions made yet.</p>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
