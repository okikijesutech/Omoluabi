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
  Gavel
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
      <div className="border border-dashed border-text-primary/10 rounded-3xl py-32 text-center space-y-4 bg-white/30">
        <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mx-auto">
          <Gavel className="w-8 h-8 text-green-600/40" />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">The Council is at Peace</p>
          <p className="text-sm text-text-secondary font-serif italic">There are no escalated disputes requiring Council intervention.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left: Queue List */}
      <div className="lg:col-span-4 space-y-4">
        <div className="flex items-center justify-between px-2 mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-primary/60">Escalated Cases</h3>
          <span className="text-[10px] bg-red-500/10 px-2 py-1 rounded-full font-bold text-red-600">{cases.length} Items</span>
        </div>
        
        {cases.map(item => (
          <button 
            key={item.id}
            onClick={() => setSelectedCase(item)}
            className={`w-full text-left p-6 rounded-2xl border transition-all group ${
              selectedCase?.id === item.id 
                ? 'bg-red-900 border-red-700 shadow-xl shadow-red-900/20 scale-[1.02]' 
                : 'bg-white border-red-200 hover:border-red-300 hover:shadow-lg'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                selectedCase?.id === item.id ? 'bg-white/20 text-white' : 'bg-red-100 text-red-800'
              }`}>
                {item.contribution.type}
              </span>
              <span className={`text-[10px] font-serif ${selectedCase?.id === item.id ? 'text-white/60' : 'text-text-secondary'}`}>
                {new Date(item.openedAt).toLocaleDateString()}
              </span>
            </div>

            <div className={`text-xl font-serif mb-4 leading-tight ${selectedCase?.id === item.id ? 'text-white' : 'text-brand-primary'}`}>
              {item.contribution.content?.title || item.contribution.knowledgeUnit?.title || "Language Variation dispute"}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-text-primary/5">
              <div className={`text-[10px] font-bold uppercase tracking-widest ${selectedCase?.id === item.id ? 'text-white/70' : 'text-text-secondary'}`}>
                Votes: {item.councilVotes?.length || 0} / 5
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedCase?.id === item.id ? 'text-white' : 'text-text-secondary'}`} />
            </div>
          </button>
        ))}
      </div>

      {/* Right: Focused Review Area */}
      <div className="lg:col-span-8">
        {selectedCase ? (
          <div className="bg-white rounded-3xl border border-text-primary/10 shadow-xl overflow-hidden">
            <div className="border-b border-text-primary/10 bg-bg-secondary/50 p-6 flex justify-between items-center">
              <div>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-secondary mb-1">Council Review</h2>
                <div className="font-serif text-2xl text-brand-primary">Case #{selectedCase.id.slice(0, 8)}</div>
              </div>
              <div className="px-3 py-1.5 bg-red-100 text-red-800 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Escalated
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-8 relative">
                <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-text-primary/10 to-transparent" />
                
                {/* Proposed */}
                <div className="space-y-6">
                  <h3 className="text-[9px] font-bold uppercase tracking-widest text-brand-accent">Proposed Change</h3>
                  <div className="bg-bg-secondary rounded-2xl p-6 border border-brand-accent/20">
                    <YorubaText className="text-3xl text-brand-primary font-medium mb-4">
                      {selectedCase.contribution.content?.title || '—'}
                    </YorubaText>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {selectedCase.contribution.content?.meaning || selectedCase.contribution.content?.description || 'No meaning provided.'}
                    </p>
                  </div>
                </div>

                {/* Original (if any) */}
                <div className="space-y-6">
                  <h3 className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">Original Archive</h3>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <YorubaText className="text-3xl text-slate-400 font-medium mb-4">
                      {selectedCase.contribution.knowledgeUnit?.title || '—'}
                    </YorubaText>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {selectedCase.contribution.knowledgeUnit?.description || 'No existing record found.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Reviewer Disagreements */}
              <div className="space-y-4">
                <h3 className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/60 italic">Reviewer Disagreements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(selectedCase.contribution.reviews || []).map((r: any) => (
                    <div key={r.id} className={`p-4 rounded-xl border transition-colors ${
                      r.approved ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${r.approved ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="text-[10px] font-bold text-text-secondary truncate max-w-[120px]">{r.reviewer.email}</span>
                        </div>
                        <Badge variant="outline" className="text-[8px] opacity-60">Trust: {r.reviewer.trustScore}</Badge>
                      </div>
                      <p className="text-xs text-brand-primary italic leading-relaxed">
                        "{r.comment || (r.approved ? 'Standard verification passed.' : 'Requires dialect-specific tone correction.')}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Author & Votes Status */}
              <div className="pt-8 border-t border-text-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary/5 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-brand-primary">{selectedCase.contribution.author.email}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Shield className="w-3 h-3 text-brand-accent" />
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                        Trust: {selectedCase.contribution.author.trustScore}
                      </span>
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                        • Lvl {selectedCase.contribution.author.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-1">Current Votes</div>
                  <div className="flex gap-2">
                    {selectedCase.councilVotes.map((v: any) => (
                      <div key={v.id} className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        v.decision === 'APPROVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {v.decision === 'APPROVE' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </div>
                    ))}
                    {Array.from({ length: 5 - (selectedCase.councilVotes?.length || 0) }).map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border border-dashed border-text-primary/20 flex items-center justify-center text-text-secondary/30 text-xs">?</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-bg-secondary p-6 border-t border-text-primary/10 flex justify-end gap-3">
              <button 
                onClick={() => handleVote(selectedCase.id, 'REJECT')}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                Veto & Reject
              </button>
              <button 
                onClick={() => handleVote(selectedCase.id, 'APPROVE')}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
              >
                Approve to Archive
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[500px] border border-dashed border-text-primary/10 rounded-3xl flex flex-col items-center justify-center space-y-6 bg-white/30 text-center p-12">
            <div className="w-20 h-20 bg-white rounded-full shadow-inner flex items-center justify-center">
              <Gavel className="w-10 h-10 text-brand-primary/20" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-xl font-serif italic text-brand-primary opacity-40">Select a case to examine</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary leading-relaxed">
                The Council exists to break stalemates and protect the cultural integrity of the archive.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
