'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout';
import { PageTitle, BodyText } from '@/components/typography';
import { GraduationCap, Sparkles, Loader2, Award } from 'lucide-react';
import { LearningPathCard } from '@/components/ui/LearningPathCard';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LearnPage() {
  const { user, isAuthenticated } = useAuth();
  const [paths, setPaths] = useState<any[]>([]);
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const [pathsData, progress] = await Promise.all([
        apiRequest('/learning-paths'),
        isAuthenticated ? apiRequest('/progress') : Promise.resolve([])
      ]);
      setPaths(pathsData);
      setProgressData(progress);
    } catch (err) {
      console.error('Failed to fetch learning data:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompleted = (path: any) => {
    if (!isAuthenticated) return 0;
    const unitIds = path.units.map((u: any) => u.knowledgeUnitId);
    return progressData.filter(p => p.completed && unitIds.includes(p.knowledgeUnitId)).length;
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
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500 ring-1 ring-emerald-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/60">
                 Guardian Curriculum
              </span>
            </div>
            <PageTitle>Heritage Mastery</PageTitle>
            <BodyText className="mt-4 max-w-2xl text-lg">
              Systematic paths designed to transform you from a Learner to a respected Contributor 
              and Reviewer of the Yorùbá archive.
            </BodyText>

            {isAuthenticated && (
              <div className="mt-8 p-6 bg-brand-indigo rounded-3xl text-white shadow-2xl shadow-brand-indigo/20 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none transition-transform group-hover:scale-110" />
                
                <div className="flex items-center gap-4 relative z-10">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                      <Award className="w-6 h-6 text-brand-gold" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Current Standing</p>
                      <p className="text-xl font-serif">Level {user?.level} Guardian</p>
                   </div>
                </div>

                <div className="flex items-center gap-8 relative z-10">
                   <div className="text-center sm:text-right border-l border-white/10 pl-8">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Total Mastery</p>
                      <p className="text-2xl font-serif">{progressData.filter(p => p.completed).length} <span className="text-sm font-sans uppercase font-bold text-white/40">Units</span></p>
                   </div>
                   <div className="text-center sm:text-right border-l border-white/10 pl-8">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Experience</p>
                      <p className="text-2xl font-serif">{user?.xp} <span className="text-sm font-sans uppercase font-bold text-white/40">XP</span></p>
                   </div>
                </div>
              </div>
            )}
          </div>
        </PageContainer>
      </div>

      <PageContainer size="archive" className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map((path) => (
            <LearningPathCard
              key={path.id}
              id={path.id}
              title={path.title}
              description={path.description}
              level={path.level}
              unitCount={path._count.units}
              completedCount={calculateCompleted(path)}
            />
          ))}

          {/* Coming Soon Card */}
          <div className="bg-brand-indigo/[0.02] border-2 border-dashed border-brand-indigo/10 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center opacity-60">
             <div className="w-12 h-12 rounded-full bg-brand-indigo/5 mb-4 flex items-center justify-center text-brand-indigo/20">
                <Sparkles className="w-6 h-6" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-widest text-brand-indigo/40">Advanced Heritage</p>
             <h3 className="text-xl font-serif text-brand-primary mt-2">More Paths Soon</h3>
             <p className="mt-2 text-xs text-text-secondary/60 max-w-[200px]">
               Our reviewers are validating more curricula. Contribute to unlock them faster!
             </p>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
