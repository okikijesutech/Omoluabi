'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PageContainer } from '../../../../components/layout';
import { PageTitle, BodyText } from '../../../../components/typography';
import { ChevronLeft, CheckCircle2, Lock, Play, Loader2, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { apiRequest } from '../../../../lib/api';
import { useAuth } from '../../../../context/AuthContext';
import { YorubaText } from '../../../../components/ui/YorubaText';
import { Badge } from '../../../../components/ui/Badge';

export default function PathDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, refreshUser } = useAuth();
  const [path, setPath] = useState<any>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completingId, setCompletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPathData();
  }, [id, isAuthenticated]);

  const fetchPathData = async () => {
    try {
      const [pathData, progressData] = await Promise.all([
        apiRequest(`/learning-paths/${id}`),
        isAuthenticated ? apiRequest('/progress') : Promise.resolve([])
      ]);
      setPath(pathData);
      setProgress(progressData);
    } catch (err) {
      console.error('Failed to fetch path:', err);
      router.push('/learn');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (unitId: string) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setCompletingId(unitId);
    try {
      await apiRequest(`/progress/complete/${unitId}`, {
        method: 'POST',
        body: JSON.stringify({ completed: true })
      });
      await Promise.all([fetchPathData(), refreshUser()]);
    } catch (err) {
      console.error('Error marking unit as complete:', err);
    } finally {
      setCompletingId(null);
    }
  };

  const isUnitCompleted = (unitId: string) => {
    return progress.some(p => p.knowledgeUnitId === unitId && p.completed);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream/20">
        <Loader2 className="w-10 h-10 text-brand-indigo animate-spin" />
      </div>
    );
  }

  const completedCount = path.units.filter((u: any) => isUnitCompleted(u.knowledgeUnitId)).length;
  const totalCount = path.units.length;
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-brand-cream/30 dark:bg-zinc-950 pb-24">
      <div className="bg-white dark:bg-zinc-900 border-b border-text-primary/5 pt-16 pb-12">
        <PageContainer size="archive">
          <Link 
            href="/learn" 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-indigo/40 hover:text-brand-indigo mb-8 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="text-[9px] tracking-widest px-3">{path.level}</Badge>
                <div className="flex items-center gap-1.5 text-brand-gold font-bold text-[10px] uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5" />
                  {totalCount} Units
                </div>
              </div>
              <PageTitle>{path.title}</PageTitle>
              <BodyText className="mt-4 text-lg opacity-70">
                {path.description}
              </BodyText>
            </div>

            <div className="w-full lg:w-72 bg-brand-indigo/[0.03] rounded-3xl p-6 border border-brand-indigo/5">
               <div className="flex justify-between items-end mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-indigo/40">Progression</p>
                  <p className="text-xl font-serif text-brand-indigo">{Math.round(progressPercent)}%</p>
               </div>
               <div className="h-2 w-full bg-brand-indigo/5 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-brand-indigo transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercent}%` }}
                  />
               </div>
               <p className="text-[10px] font-bold text-center text-brand-indigo/40 uppercase tracking-widest">
                 {completedCount} of {totalCount} Mastered
               </p>
            </div>
          </div>
        </PageContainer>
      </div>

      <PageContainer size="archive" className="mt-16">
        <div className="max-w-4xl mx-auto space-y-4">
          {path.units.map((unit: any, index: number) => {
            const completed = isUnitCompleted(unit.knowledgeUnitId);
            const canStart = index === 0 || isUnitCompleted(path.units[index-1].knowledgeUnitId);
            const isNext = !completed && canStart;

            return (
              <div 
                key={unit.id}
                className={`relative group bg-white dark:bg-zinc-900 rounded-[1.5rem] p-6 border transition-all ${
                  completed 
                    ? 'border-emerald-500/20 bg-emerald-500/[0.01]' 
                    : isNext 
                      ? 'border-brand-indigo/20 shadow-lg shadow-brand-indigo/5' 
                      : 'border-brand-indigo/5 opacity-50 grayscale'
                }`}
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-serif text-xl border transition-colors ${
                      completed 
                        ? 'bg-emerald-500 text-white border-emerald-500' 
                        : isNext 
                          ? 'bg-brand-indigo text-white border-brand-indigo' 
                          : 'bg-brand-indigo/5 text-brand-indigo/20 border-transparent'
                    }`}>
                      {completed ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="text-xl font-serif text-brand-primary">
                          {unit.knowledgeUnit.title}
                        </h4>
                        <Badge variant="outline" className="text-[8px] uppercase tracking-tighter opacity-40">
                           {unit.knowledgeUnit.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-brand-earth/60 line-clamp-1 mt-1">
                         {unit.knowledgeUnit.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {completed ? (
                      <div className="px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Mastered
                      </div>
                    ) : isNext ? (
                      <button 
                        onClick={() => handleComplete(unit.knowledgeUnitId)}
                        disabled={completingId === unit.knowledgeUnitId}
                        className="px-6 py-3 bg-brand-indigo text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all flex items-center gap-2 shadow-lg shadow-brand-indigo/10"
                      >
                        {completingId === unit.knowledgeUnitId ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            Study Unit
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="p-3 text-brand-indigo/20">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub-content only for active unit */}
                {isNext && (
                   <div className="mt-8 pt-8 border-t border-brand-indigo/5 animate-in slide-in-from-top-4 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-indigo/40 italic">Linguistic Essence</p>
                            <YorubaText 
                              className="text-4xl text-brand-indigo font-serif"
                            >
                              {unit.knowledgeUnit.variations[0]?.textWithTone || unit.knowledgeUnit.title}
                            </YorubaText>
                            <p className="text-sm text-brand-earth/60 leading-relaxed italic">
                              "{unit.knowledgeUnit.description}"
                            </p>
                         </div>
                         <div className="bg-brand-gold/5 rounded-2xl p-6 border border-brand-gold/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mb-2">Heritage Note</p>
                            <p className="text-xs text-brand-earth/80 leading-relaxed font-serif italic">
                               {unit.knowledgeUnit.variations[0]?.notes || 'This unit captures a core aspect of Yoruba cultural expression.'}
                            </p>
                         </div>
                      </div>
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </PageContainer>
    </div>
  );
}
