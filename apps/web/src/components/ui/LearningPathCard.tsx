'use client';

import React from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Badge } from './Badge';

interface LearningPathCardProps {
  id: string;
  title: string;
  description: string;
  level: string;
  unitCount: number;
  completedCount: number;
}

export function LearningPathCard({
  id,
  title,
  description,
  level,
  unitCount,
  completedCount,
}: LearningPathCardProps) {
  const progress = (completedCount / unitCount) * 100;
  const isCompleted = completedCount === unitCount && unitCount > 0;

  return (
    <div className="group relative bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-[2rem] p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-gold/10 transition-colors" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <Badge variant={level === 'BEGINNER' ? 'default' : 'outline'} className="text-[9px] tracking-[0.2em] px-3">
             {level}
          </Badge>
          {isCompleted && (
            <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" />
              Mastered
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-serif text-brand-primary group-hover:text-brand-indigo transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-text-secondary/70 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-text-secondary/40">
            <span>Progression</span>
            <span>{completedCount} / {unitCount} Units</span>
          </div>
          <div className="h-2 w-full bg-brand-indigo/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-indigo to-brand-gold transition-all duration-1000 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-indigo/30 uppercase text-[9px] font-bold tracking-widest">
            <BookOpen className="w-4 h-4" />
            {unitCount} Lessons
          </div>
          
          <Link 
            href={`/learn/${id}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-indigo text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-brand-gold transition-all shadow-lg shadow-brand-indigo/10 group-hover:shadow-brand-gold/20"
          >
            {completedCount > 0 ? 'Continue' : 'Start Path'}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
