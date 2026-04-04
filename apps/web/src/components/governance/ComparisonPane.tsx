"use client";

import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Loader2, 
  ArrowRight,
  ShieldAlert,
  Archive,
  MessageCircle,
  Clock
} from 'lucide-react';
import { YorubaText } from '@/components/ui';

type ComparisonData = {
  contribution: any;
  proposed: any;
  original: any;
};

export default function ComparisonPane({ contributionId, onProcessed }: { contributionId: string, onProcessed: () => void }) {
  const [data, setData] = useState<ComparisonData | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, [contributionId]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/governance/compare/${contributionId}`, {
          headers: {
              'x-guest-test': 'true'
          }
      });
      if (res.ok) {
        setData(await res.json());
      }
    } catch (e) {
      console.error("Failed to fetch comparison", e);
    }
  };

  const handleAction = async (approved: boolean, escalate: boolean = false) => {
    setIsSubmitting(true);
    try {
      const endpoint = escalate ? 'escalate' : 'review';
      const body = escalate ? {} : { approved, comment };
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/governance/${endpoint}/${contributionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-test': 'true'
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        onProcessed();
      }
    } catch (e) {
      console.error("Action failed", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 py-32">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Reconstructing Archival State...</p>
      </div>
    );
  }

  const { proposed, original, contribution } = data;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12 pb-12">
      {/* Side-by-Side View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-text-primary/5 rounded-3xl overflow-hidden border border-text-primary/5 shadow-2xl backdrop-blur-sm">
        {/* Left: Canonical State */}
        <div className="bg-white/80 p-10 space-y-8">
          <div className="flex items-center gap-3 text-text-secondary opacity-60">
            <Archive className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Canonical Version</span>
          </div>
          
          <div className="space-y-6">
            {original ? (
              <>
                <div className="text-4xl font-serif text-brand-primary/40 line-through decoration-brand-accent/30 decoration-2">
                  <YorubaText>{original.textWithTone || original.title}</YorubaText>
                </div>
                <div className="space-y-2">
                   <p className="text-[9px] font-bold uppercase tracking-widest text-text-secondary">Archived Meaning</p>
                   <p className="text-lg font-serif italic text-text-secondary leading-relaxed line-through decoration-brand-accent/20">
                     &ldquo;{original.description || original.notes || "No archived description"}&rdquo;
                   </p>
                </div>
              </>
            ) : (
              <div className="text-xl font-serif italic text-text-secondary opacity-30 py-12 text-center border-2 border-dashed border-text-primary/5 rounded-2xl">
                This is a new archival entry proposal.
              </div>
            )}
          </div>
        </div>

        {/* Right: Proposed Change */}
        <div className="bg-brand-primary p-10 text-bg-primary relative">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Archive className="w-24 h-24" />
          </div>
          
          <div className="space-y-8 relative z-10">
            <div className="flex items-center gap-3 text-brand-accent">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Proposed Variation</span>
            </div>

            <div className="space-y-6">
              <div className="text-4xl font-serif text-white">
                <YorubaText>{proposed.title || proposed.textWithTone}</YorubaText>
              </div>
              
              <div className="space-y-2">
                 <p className="text-[9px] font-bold uppercase tracking-widest text-brand-accent opacity-60">Proposed Meaning</p>
                 <p className="text-xl font-serif italic leading-relaxed text-white/90">
                   &ldquo;{proposed.meaning || proposed.description || proposed.notes}&rdquo;
                 </p>
              </div>

              {proposed.dialectId && (
                <div className="pt-4 flex items-center gap-3">
                   <div className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest text-brand-accent">
                     Dialect Tracking Active
                   </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Actions Panel */}
      <div className="bg-white/50 backdrop-blur-md rounded-3xl border border-text-primary/5 p-8 shadow-xl space-y-8">
        <div className="flex items-center gap-4 border-b border-text-primary/5 pb-6">
           <MessageCircle className="w-5 h-5 text-brand-primary" />
           <textarea 
             placeholder="Include archival notes or reasoning for your decision..."
             className="w-full bg-transparent focus:outline-none font-serif italic text-lg text-brand-primary min-h-[60px] resize-none"
             value={comment}
             onChange={(e) => setComment(e.target.value)}
           />
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-4">
              <button 
                onClick={() => handleAction(true)}
                disabled={isSubmitting}
                className="flex items-center gap-3 px-10 py-5 bg-green-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-green-700 hover:-translate-y-1 transition-all shadow-lg shadow-green-600/20 disabled:opacity-50"
              >
                <CheckCircle2 className="w-5 h-5" /> Approve Entry
              </button>
              <button 
                onClick={() => handleAction(false)}
                disabled={isSubmitting}
                className="flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-red-700 hover:-translate-y-1 transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                <XCircle className="w-5 h-5" /> Reject Revision
              </button>
            </div>

            <button 
                onClick={() => handleAction(false, true)}
                disabled={isSubmitting}
                className="flex items-center gap-3 px-8 py-5 border-2 border-brand-accent text-brand-primary rounded-2xl font-bold uppercase tracking-widest text-[11px] hover:bg-brand-accent/10 transition-all disabled:opacity-50"
            >
              <ShieldAlert className="w-5 h-5 text-brand-accent" /> Escalate to Council
            </button>
        </div>

        <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-text-secondary opacity-40 justify-center pt-2">
            <AlertTriangle className="w-3 h-3" />
            Decision will affect the author&apos;s trust score algorithmically.
        </div>
      </div>
    </div>
  );
}
