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
  Loader2
} from 'lucide-react';
import { YorubaText } from '@/components/ui';
import ComparisonPane from './ComparisonPane';

type Contribution = {
  id: string;
  type: string;
  status: string;
  content: any;
  author: {
    email: string;
    trustScore: number;
    role: string;
  };
  knowledgeUnit?: {
      title: string;
  }
  createdAt: string;
};

export default function ReviewQueue() {
  const [queue, setQueue] = useState<Contribution[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQueue();
  }, []);

  const fetchQueue = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/governance/pending`, {
          headers: {
              'x-guest-test': 'true'
          }
      });
      if (res.ok) {
        const data = await res.json();
        setQueue(data);
      }
    } catch (e) {
      console.error("Failed to fetch queue", e);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return null; // Handled by parent

  if (queue.length === 0) {
    return (
      <div className="border border-dashed border-text-primary/10 rounded-3xl py-32 text-center space-y-4 bg-white/30">
        <div className="w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-green-600/40" />
        </div>
        <div className="space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">The Archive is Balanced</p>
          <p className="text-sm text-text-secondary font-serif italic">There are no pending contributions requiring your validation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left: Queue List */}
      <div className="lg:col-span-4 space-y-4">
        <div className="flex items-center justify-between px-2 mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-primary/60">Pending Workflow</h3>
          <span className="text-[10px] bg-brand-primary/10 px-2 py-1 rounded-full font-bold text-brand-primary">{queue.length} Items</span>
        </div>
        
        {queue.map(item => (
          <button 
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className={`w-full text-left p-6 rounded-2xl border transition-all group ${
              selectedId === item.id 
                ? 'bg-brand-primary border-brand-primary shadow-xl shadow-brand-primary/20 scale-[1.02]' 
                : 'bg-white border-text-primary/5 hover:border-brand-accent/30 hover:shadow-lg'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                selectedId === item.id ? 'bg-white/20 text-white' : 'bg-bg-secondary text-brand-primary/60'
              }`}>
                {item.type}
              </span>
              <span className={`text-[10px] font-serif ${selectedId === item.id ? 'text-white/60' : 'text-text-secondary'}`}>
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className={`text-xl font-serif mb-4 leading-tight ${selectedId === item.id ? 'text-white' : 'text-brand-primary'}`}>
              {item.content?.title || item.knowledgeUnit?.title || "Language Variation"}
            </div>

            <div className={`flex items-center gap-3 pt-4 border-t ${selectedId === item.id ? 'border-white/10' : 'border-text-primary/5'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedId === item.id ? 'bg-white/20' : 'bg-bg-secondary'}`}>
                <User className={`w-3 h-3 ${selectedId === item.id ? 'text-white' : 'text-brand-primary'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[9px] font-bold truncate ${selectedId === item.id ? 'text-white' : 'text-text-primary'}`}>{item.author.email}</p>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-2.5 h-2.5 text-brand-accent" />
                  <p className={`text-[8px] font-bold uppercase tracking-widest ${selectedId === item.id ? 'text-white/50' : 'text-text-secondary'}`}>Trust: {item.author.trustScore}</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedId === item.id ? 'text-white' : 'text-text-secondary'}`} />
            </div>
          </button>
        ))}
      </div>

      {/* Right: Focused Review Area */}
      <div className="lg:col-span-8">
        {selectedId ? (
          <ComparisonPane contributionId={selectedId} onProcessed={() => {
              setSelectedId(null);
              fetchQueue();
          }} />
        ) : (
          <div className="h-full min-h-[500px] border border-dashed border-text-primary/10 rounded-3xl flex flex-col items-center justify-center space-y-6 bg-white/30 text-center p-12">
            <div className="w-20 h-20 bg-white rounded-full shadow-inner flex items-center justify-center">
              <MessageSquare className="w-10 h-10 text-brand-primary/20" />
            </div>
            <div className="max-w-md space-y-2">
              <h3 className="text-xl font-serif italic text-brand-primary opacity-40 italic">Select a contribution to focus analysis</h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary leading-relaxed">
                Reviewers must verify tonal accuracy and dialect context before committing to the archive.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
