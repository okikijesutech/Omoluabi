"use client";

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  User, 
  Shield, 
  MessageSquare,
  AlertTriangle,
  Gavel,
  History,
  Scale,
  Sparkles
} from 'lucide-react';
import { YorubaText } from '../ui/YorubaText';
import { Badge } from '../ui/Badge';

export default function CouncilQueue() {
  const [cases, setCases] = useState<any[]>([]);
  const [selectedCase, setSelectedCase] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/governance/council/cases`, {
        headers: {
          'x-guest-test': 'true' // Simulating AuthGuard for MVP
        }
      });
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (e) {
      console.error("Failed to fetch council cases", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (caseId: string, decision: 'APPROVE' | 'REJECT') => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/governance/vote/${caseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-test': 'true' // Simulating AuthGuard for MVP
        },
        body: JSON.stringify({ decision })
      });
      if (res.ok) {
        setSelectedCase(null);
        fetchCases();
      }
    } catch (e) {
      console.error("Failed to cast vote", e);
    }
  };

  if (isLoading) return null;

  if (cases.length === 0) {
    return (
      <div className="border border-dashed border-brand-indigo/10 rounded-[3rem] py-32 text-center space-y-4 bg-white/30 dark:bg-zinc-900/10 backdrop-blur-sm">
        <div className="w-20 h-20 bg-brand-indigo/5 rounded-full flex items-center justify-center mx-auto ring-1 ring-brand-indigo/10">
          <Scale className="w-8 h-8 text-brand-indigo/20" />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-indigo/40 leading-relaxed">The Council is at Peace</p>
          <p className="text-sm text-brand-earth/40 font-serif italic max-w-sm mx-auto">There are no escalated disputes requiring Council intervention at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left: Queue List */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between px-2 mb-4">
          <div className="flex items-center gap-2">
             <History className="w-4 h-4 text-brand-indigo/40" />
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-indigo/60">Active Docket</h3>
          </div>
          <span className="text-[9px] bg-red-500/10 px-3 py-1 rounded-full font-bold text-red-600 ring-1 ring-red-500/5">{cases.length} Pendings</span>
        </div>
        
        <div className="space-y-3">
          {cases.map(item => (
            <button 
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className={`w-full text-left p-6 rounded-[2rem] border transition-all group relative overflow-hidden ${
                selectedCase?.id === item.id 
                  ? 'bg-brand-indigo border-brand-indigo shadow-2xl shadow-brand-indigo/20 scale-[1.02]' 
                  : 'bg-white dark:bg-zinc-900 border-brand-indigo/5 hover:border-brand-indigo/20 hover:shadow-lg'
              }`}
            >
              {selectedCase?.id === item.id && (
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
              )}

              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className={`text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                  selectedCase?.id === item.id ? 'bg-white/10 text-white border border-white/10' : 'bg-brand-indigo/5 text-brand-indigo'
                }`}>
                  {item.contribution.type}
                </span>
                <span className={`text-[9px] font-serif italic ${selectedCase?.id === item.id ? 'text-white/40' : 'text-text-secondary/40'}`}>
                  {new Date(item.openedAt).toLocaleDateString()}
                </span>
              </div>

              <div className={`text-xl font-serif mb-4 leading-tight tracking-tight relative z-10 ${selectedCase?.id === item.id ? 'text-white' : 'text-brand-primary'}`}>
                {item.contribution.content?.title || item.contribution.knowledgeUnit?.title || "Variation dispute"}
              </div>

              <div className={`flex items-center justify-between pt-4 border-t relative z-10 ${selectedCase?.id === item.id ? 'border-white/10' : 'border-brand-indigo/5'}`}>
                <div className={`text-[10px] font-black uppercase tracking-widest ${selectedCase?.id === item.id ? 'text-white/50' : 'text-text-secondary/40'}`}>
                  Quorum: {item.councilVotes?.length || 0} / 5
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedCase?.id === item.id ? 'text-white' : 'text-brand-indigo/40'}`} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right: Focused Review Area */}
      <div className="lg:col-span-8 sticky top-24">
        {selectedCase ? (
          <div className="bg-white dark:bg-zinc-900 rounded-[3rem] border border-brand-indigo/5 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            {/* Header Area */}
            <div className="border-b border-brand-indigo/5 bg-brand-cream/10 dark:bg-zinc-800/20 p-10 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-brand-indigo/[0.02] rounded-full blur-3xl -ml-32 -mt-32" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                   <div className="p-1.5 bg-red-500/10 rounded-lg text-red-500 ring-1 ring-red-500/20">
                      <AlertTriangle className="w-3.5 h-3.5" />
                   </div>
                   <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600/60">Escalated Case File</h2>
                </div>
                <div className="font-serif text-3xl text-brand-primary tracking-tighter">Protocol #{selectedCase.id.slice(0, 8)}</div>
              </div>

              <div className="relative z-10 flex flex-col items-end gap-2">
                 <div className="px-4 py-2 bg-brand-indigo text-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-brand-indigo/20">
                    <Gavel className="w-3.5 h-3.5" />
                    Pending Resolution
                 </div>
                 <p className="text-[9px] font-serif italic text-brand-earth/40">Opened {new Date(selectedCase.openedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-10 space-y-12">
              {/* The Tension (Comparison) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                <div className="hidden md:block absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-brand-indigo/5 to-transparent" />
                
                {/* Proposed */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                     <Sparkles className="w-3 h-3 text-brand-gold" />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Proposed Artifact</h3>
                  </div>
                  <div className="bg-brand-gold/[0.02] rounded-3xl p-8 border border-brand-gold/10 ring-1 ring-brand-gold/5">
                    <YorubaText className="text-4xl text-brand-primary font-medium mb-6 leading-tight">
                      {selectedCase.contribution.content?.title || '—'}
                    </YorubaText>
                    <p className="text-sm text-brand-earth/60 leading-relaxed font-serif italic">
                      {selectedCase.contribution.content?.meaning || selectedCase.contribution.content?.description || 'No cultural context provided.'}
                    </p>
                  </div>
                </div>

                {/* Original */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                     <Shield className="w-3 h-3 text-brand-indigo/40" />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-indigo/40">Archived Record</h3>
                  </div>
                  <div className="bg-brand-indigo/[0.01] rounded-3xl p-8 border border-brand-indigo/5 opacity-60">
                    <YorubaText className="text-4xl text-brand-indigo/30 font-medium mb-6 leading-tight">
                      {selectedCase.contribution.knowledgeUnit?.title || '—'}
                    </YorubaText>
                    <p className="text-sm text-brand-indigo/30 leading-relaxed font-serif italic">
                      {selectedCase.contribution.knowledgeUnit?.description || 'No existing record for this variation.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviewer Disagreements (The Conflict) */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                   <MessageSquare className="w-4 h-4 text-brand-indigo/20" />
                   <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary/40">Reviewer Deliberations</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(selectedCase.contribution.reviews || []).map((r: any) => (
                    <div key={r.id} className={`p-6 rounded-[2rem] border backdrop-blur-sm transition-all ${
                      r.approved ? 'bg-emerald-500/[0.02] border-emerald-500/10' : 'bg-red-500/[0.02] border-red-500/10'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${r.approved ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="text-[10px] font-bold text-brand-primary truncate max-w-[120px]">{r.reviewer.email.split('@')[0]}</span>
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.1em] text-brand-earth/30">Acc: {r.reviewer.reviewAccuracy}%</span>
                      </div>
                      <p className="text-xs text-brand-earth/60 italic leading-relaxed font-serif">
                        "{r.comment || (r.approved ? 'Verification passing protocol.' : 'Requires dialectal tonal audit.')}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Voting Interface */}
              <div className="pt-10 border-t border-brand-indigo/5 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-brand-indigo/[0.03] rounded-3xl flex items-center justify-center ring-1 ring-brand-indigo/5">
                    <User className="w-6 h-6 text-brand-indigo/40" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand-primary">{selectedCase.contribution.author.email.split('@')[0]}</div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-brand-gold/5 rounded-md border border-brand-gold/10">
                         <Shield className="w-2.5 h-2.5 text-brand-gold" />
                         <span className="text-[8px] font-black uppercase tracking-widest text-brand-gold">Trust {selectedCase.contribution.author.trustScore}</span>
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-earth/30">LVL {selectedCase.contribution.author.level} Guardian</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-earth/40">Consensus Quorum</span>
                  <div className="flex gap-2.5">
                    {selectedCase.councilVotes.map((v: any) => (
                      <div key={v.id} className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
                        v.decision === 'APPROVE' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-red-500 text-white shadow-red-500/20'
                      }`}>
                        {v.decision === 'APPROVE' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                      </div>
                    ))}
                    {Array.from({ length: 5 - (selectedCase.councilVotes?.length || 0) }).map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-2xl border-2 border-dashed border-brand-indigo/5 flex items-center justify-center text-brand-indigo/10 font-serif">?</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="p-8 bg-brand-indigo/5 border-t border-brand-indigo/5 flex justify-end gap-4">
              <button 
                onClick={() => handleVote(selectedCase.id, 'REJECT')}
                className="px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 border border-red-200/50 transition-all"
              >
                Veto Submission
              </button>
              <button 
                onClick={() => handleVote(selectedCase.id, 'APPROVE')}
                className="px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-indigo text-white hover:bg-brand-gold transition-all shadow-xl shadow-brand-indigo/20 flex items-center gap-3"
              >
                Grant Archival Approval
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[600px] border-2 border-dashed border-brand-indigo/5 rounded-[4rem] flex flex-col items-center justify-center space-y-8 bg-brand-indigo/[0.01] backdrop-blur-sm text-center p-16 animate-in fade-in duration-1000">
            <div className="w-24 h-24 bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl flex items-center justify-center ring-1 ring-brand-indigo/5 relative">
              <div className="absolute inset-0 bg-brand-indigo/5 rounded-[2.5rem] animate-pulse" />
              <Scale className="w-10 h-10 text-brand-indigo/20 relative z-10" />
            </div>
            <div className="max-w-md space-y-4">
              <h3 className="text-3xl font-serif italic text-brand-primary/30 tracking-tight">Awaiting Deliberation</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-earth/20 leading-relaxed mx-auto max-w-xs">
                The Council must examine the linguistic tension between recorded archive and proposed evolution.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
