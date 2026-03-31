"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CheckCircle2, XCircle, ArrowRight, Loader2, Sparkles, Trophy } from 'lucide-react';
import { YorubaText } from '@/components/ui';

export default function LessonViewer() {
  const params = useParams();
  const router = useRouter();
  
  const [learningPath, setLearningPath] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    fetchLessonData();
  }, [params.id]);

  const fetchLessonData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/learning-paths/${params.id}`);
      if (res.ok) {
        setLearningPath(await res.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    if (!learningPath || !learningPath.units) return;
    
    const currentUnit = learningPath.units[currentStep];
    
    setIsSubmitting(true);
    try {
      // Award XP by marking progress complete for this KnowledgeUnit
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/progress/complete/${currentUnit.knowledgeUnitId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-test': 'true' // Bypass AuthGuard for MVP showcase
        },
        body: JSON.stringify({ completed: true })
      });

      if (currentStep < learningPath.units.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Module finished!
        setShowCelebration(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    router.push('/learn');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-brand-indigo/30 animate-spin dark:text-brand-cream/30" />
      </div>
    );
  }

  if (!learningPath || !learningPath.units || learningPath.units.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-32 text-center border border-dashed border-brand-indigo/10 rounded-3xl bg-white/50 dark:bg-zinc-900/50 dark:border-zinc-800">
        <p className="text-brand-indigo/60 font-serif text-xl dark:text-brand-cream/60">This module is currently empty.</p>
        <button onClick={() => router.push('/learn')} className="mt-6 text-brand-accent font-bold uppercase tracking-widest text-xs hover:underline">Return to Curriculum</button>
      </div>
    );
  }

  if (showCelebration) {
    return (
      <div className="max-w-3xl mx-auto min-h-[70vh] flex flex-col items-center justify-center space-y-8 animate-in zoom-in-95 duration-500">
        <div className="relative">
          <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full"></div>
          <div className="w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center relative z-10 border border-brand-indigo/5 dark:bg-zinc-900 dark:border-zinc-800">
            <Trophy className="w-16 h-16 text-brand-accent" />
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-serif text-brand-indigo dark:text-brand-cream">Lesson Complete!</h1>
          <p className="text-xl text-brand-earth dark:text-brand-gold">You earned <span className="font-bold text-brand-accent">+{learningPath.units.length * 5} XP</span> for your Trust Score.</p>
        </div>

        <button 
          onClick={handleFinish}
          className="px-10 py-4 bg-brand-accent text-white rounded-2xl font-bold text-lg shadow-xl shadow-brand-accent/20 hover:-translate-y-1 transition-transform"
        >
          Continue Learning
        </button>
      </div>
    );
  }

  const currentUnit = learningPath.units[currentStep].knowledgeUnit;
  const topVariation = currentUnit.variations?.[0]; // Usually standard YoY

  const progressPercent = Math.round((currentStep / learningPath.units.length) * 100);

  return (
    <div className="max-w-4xl mx-auto min-h-[80vh] flex flex-col">
      {/* Top Progress Bar */}
      <div className="flex items-center gap-6 mb-12">
        <button onClick={() => router.push('/learn')} className="text-brand-indigo/40 hover:text-brand-indigo dark:text-brand-cream/40 dark:hover:text-brand-cream transition-colors">
          <XCircle className="w-8 h-8" />
        </button>
        <div className="flex-1 bg-brand-indigo/10 rounded-full h-4 dark:bg-zinc-800 overflow-hidden relative">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-accent transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Lesson Payload Viewer */}
      <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full space-y-12">
        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-brand-indigo/50 dark:text-brand-cream/50">
            {currentUnit.type} Mastery
          </h2>
          <h1 className="text-4xl font-serif text-brand-indigo dark:text-brand-cream">
            Review the following concepts
          </h1>
        </div>

        <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-brand-indigo/5 dark:bg-zinc-900 dark:border-zinc-800 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          
          <div className="relative z-10 space-y-8 text-center">
            {/* Display Yoruba Standard text with Tone */}
            <YorubaText className="text-6xl text-brand-indigo dark:text-brand-cream leading-tight">
              {topVariation ? topVariation.textWithTone : currentUnit.title}
            </YorubaText>
            
            {topVariation && topVariation.dialect && (
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-indigo/5 rounded-full text-sm font-medium text-brand-indigo dark:bg-zinc-800 dark:text-brand-cream">
                 <span className="w-2 h-2 rounded-full bg-brand-accent" />
                 {topVariation.dialect.name} Pronunciation
               </div>
            )}

            <div className="pt-8 border-t border-brand-indigo/5 dark:border-zinc-800 space-y-4">
              <p className="text-2xl font-serif text-brand-earth dark:text-brand-gold italic">
                "{currentUnit.description || 'Definition not provided.'}"
              </p>
              {topVariation?.notes && (
                <p className="text-sm text-brand-indigo/60 dark:text-brand-cream/60 max-w-md mx-auto">
                  {topVariation.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="mt-12 flex items-center justify-between py-6 border-t border-brand-indigo/10 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-brand-accent font-bold bg-brand-accent/10 px-4 py-2 rounded-xl">
          <Sparkles className="w-5 h-5" />
          +5 XP 
        </div>
        
        <button 
          onClick={handleContinue}
          disabled={isSubmitting}
          className="flex items-center gap-3 px-12 py-5 bg-brand-indigo text-white rounded-2xl font-bold text-lg hover:bg-brand-indigo/90 hover:scale-105 transition-all shadow-xl shadow-brand-indigo/20 disabled:opacity-50 dark:bg-brand-cream dark:text-zinc-900"
        >
          {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Continue'}
          {!isSubmitting && <ArrowRight className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
