import React from 'react';
import CouncilQueue from '@/components/governance/CouncilQueue';
import { ShieldAlert, Gavel } from 'lucide-react';
import { Header, Footer, PageContainer } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function CouncilPage() {
  return (
    <ProtectedRoute role="REVIEWER">
      <div className="min-h-screen bg-brand-cream/30 dark:bg-zinc-950">
        <Header />
        
        <main className="pt-24 pb-32">
          <PageContainer size="archive">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/10 rounded-xl text-red-600 ring-1 ring-red-500/20">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600/60">
                    Council Isolation Protocol
                  </span>
                </div>
                <h1 className="text-5xl font-serif text-brand-primary tracking-tighter">The High Council</h1>
                <p className="text-lg text-brand-earth/60 font-serif italic max-w-2xl">
                  Resolving cultural stalemates and linguistic disputes with community-entrusted authority.
                </p>
              </div>

              <div className="hidden lg:flex items-center gap-6 px-8 py-4 bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-3xl shadow-sm">
                 <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-indigo/40">Council Quorum</p>
                    <p className="text-xs font-bold text-brand-primary">5 Trusted Members</p>
                 </div>
                 <div className="w-px h-8 bg-brand-indigo/5" />
                 <Gavel className="w-6 h-6 text-brand-indigo/20" />
              </div>
            </header>

            <CouncilQueue />
          </PageContainer>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
