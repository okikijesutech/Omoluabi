"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Map, Trophy, Shield, ChevronRight } from 'lucide-react';

export default function LearnDashboard() {
  const [paths, setPaths] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pathsRes, progRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/learning-paths`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/progress`, {
          headers: { 'x-guest-test': 'true' }
        }).catch(() => ({ ok: false, json: () => [] })) // Safe fallback if not auth'd
      ]);

      if (pathsRes.ok) {
        setPaths(await pathsRes.json());
      }
      if (progRes.ok) {
        setProgress(await progRes.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProgress = (path: any) => {
    // Basic calculation for UI visualization based on units count
    const totalUnits = path._count?.units || 1;
    // In a real scenario, we'd cross-reference progress array with specific path units
    // For this dashboard view MVP, we'll randomize or calculate loosely
    const completed = progress.length || 0; 
    return Math.min(Math.round((completed / totalUnits) * 100), 100);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-brand-indigo dark:text-brand-cream flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-accent" />
            Curriculum
          </h1>
          <p className="text-brand-earth/80 text-lg max-w-2xl dark:text-brand-gold/80">
            Journey through authentic cultural paths. Master the standard vocabulary, then graduate to regional dialects and proverbs.
          </p>
        </div>
        
        <div className="flex items-center gap-6 bg-white p-4 rounded-2xl shadow-sm border border-brand-indigo/10 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60">XP Earned</div>
            <div className="text-2xl font-serif text-brand-accent flex items-center justify-center gap-1">
               25
            </div>
          </div>
          <div className="w-px h-12 bg-brand-indigo/10 dark:bg-zinc-800"></div>
          <div className="text-center">
            <div className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60">Rank</div>
            <div className="text-2xl font-serif text-brand-indigo dark:text-brand-cream">Learner</div>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
           {[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-100 rounded-2xl dark:bg-zinc-900" />)}
        </div>
      ) : paths.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-brand-indigo/10 rounded-3xl bg-white/50 dark:bg-zinc-900/50 dark:border-zinc-800">
          <p className="text-brand-indigo/60 font-serif text-lg dark:text-brand-cream/60">The curriculum is currently being assembled by the Council.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paths.map(path => {
            const progressPercent = calculateProgress(path);
            const isCompleted = progressPercent === 100;

            return (
              <Link href={`/lessons/${path.id}`} key={path.id} className="group flex flex-col justify-between rounded-3xl bg-white border border-brand-indigo/10 p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-brand-accent/30 dark:bg-zinc-900 dark:border-zinc-800">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-brand-indigo/5 text-[10px] font-bold uppercase tracking-widest text-brand-indigo dark:bg-zinc-800 dark:text-brand-cream">
                      {path.level}
                    </span>
                    {isCompleted && (
                      <span className="text-green-600 flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-green-50 px-2 py-1 rounded-md">
                        <Trophy className="w-3.5 h-3.5" /> Mastery
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-3xl font-serif text-brand-indigo dark:text-brand-cream group-hover:text-brand-accent transition-colors">
                      {path.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-earth dark:text-brand-gold/80 leading-relaxed">
                      {path.description || 'Master foundational vocabulary and tonal structures.'}
                    </p>
                  </div>
                </div>

                <div className="pt-8 mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/60 dark:text-brand-cream/60">Progress</span>
                    <span className="text-xs font-bold text-brand-indigo dark:text-brand-cream">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-brand-indigo/5 rounded-full h-2.5 dark:bg-zinc-800 overflow-hidden">
                    <div className="bg-brand-accent h-2.5 rounded-full transition-all duration-1000" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <div className="mt-6 flex items-center justify-between text-brand-accent font-bold text-sm">
                    {path._count?.units || 0} Modules
                    <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
