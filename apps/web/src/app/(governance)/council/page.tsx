import React from 'react';
import CouncilQueue from '@/components/governance/CouncilQueue';
import { ShieldAlert } from 'lucide-react';

export default function CouncilPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center border border-red-100">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-brand-primary">The Council</h1>
            <p className="text-sm font-medium text-text-secondary mt-1">Resolve escalated cultural disputes</p>
          </div>
        </div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-text-secondary max-w-2xl leading-relaxed">
          Cases that fail to reach a community consensus or involve sensitive dialect modifications are escalated here. A simple majority of 5 trusted council members is required to execute a resolution.
        </p>
      </header>

      <CouncilQueue />
    </div>
  );
}
