'use client';

import React from 'react';
import { PageContainer, Header, Footer } from '@/components/layout';
import { ContributionStepper } from '@/components/contribute';
import { Sparkles, History } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ContributePage() {
  return (
    <ProtectedRoute>
      <div className="space-y-12 animate-in fade-in duration-700">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-brand-gold/10 rounded-lg text-brand-gold ring-1 ring-brand-gold/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
                The Linguistic Forge
              </span>
            </div>
            <h1 className="text-5xl font-serif text-brand-primary tracking-tighter leading-tight">
              Refine the Heritage
            </h1>
            <p className="text-lg text-brand-earth/60 font-serif italic max-w-xl">
              Every word you contribute is a bridge built for future generations. 
              Follow the multi-step journey to preserve a linguistic artifact.
            </p>
          </div>

          <Link 
            href="/profile" 
            className="group flex items-center gap-4 bg-white dark:bg-zinc-900 border border-brand-indigo/5 p-4 pr-6 rounded-3xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-indigo/5 flex items-center justify-center text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-colors">
              <History className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[8px] font-black uppercase tracking-widest text-text-secondary/30">Your Impact</p>
              <p className="text-xs font-bold text-brand-primary">Contribution History</p>
            </div>
          </Link>
        </div>

        {/* The Modular Forge */}
        <section className="relative px-4">
           <div className="absolute inset-0 bg-brand-indigo/[0.01] rounded-[4rem] -m-6 pointer-events-none border border-brand-indigo/[0.05]" />
           <ContributionStepper />
        </section>

        {/* Protocol Notice */}
        <div className="mt-24 max-w-2xl mx-auto p-10 rounded-[3rem] bg-brand-indigo/[0.02] border border-dashed border-brand-indigo/10 text-center space-y-4">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-indigo/30">Archives Integrity Protocol</p>
           <p className="text-xs text-brand-earth/40 leading-relaxed font-serif italic">
             All contributions undergo multi-stage community review. High-fidelity submissions (with accurate tone marks and rich context) 
             earn significantly higher Trust Scores and XP. The Council reserves the right to revert artifacts that violate cultural guidelines.
           </p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
