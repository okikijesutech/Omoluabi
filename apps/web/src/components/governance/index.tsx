import React from "react";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export { default as ReviewQueue } from "./ReviewQueue";
export { default as ComparisonPane } from "./ComparisonPane";

/**
 * GovernanceCard - Standardized card for metrics
 */
export function GovernanceCard({ 
  label, 
  value, 
  subtext, 
  icon: Icon 
}: { label: string; value: string; subtext?: string; icon: React.ElementType }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-brand-indigo/5 shadow-sm space-y-4">
      <div className="w-10 h-10 rounded-lg bg-brand-indigo/5 flex items-center justify-center text-brand-indigo">
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-brand-indigo/40 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-serif font-bold text-brand-indigo">{value}</p>
      </div>
      {subtext && <p className="text-xs text-brand-indigo/60 font-medium italic">{subtext}</p>}
    </div>
  );
}

/**
 * IntegrityStatus - Institutional status report
 */
export function IntegrityStatus() {
  return (
    <div className="p-10 rounded-3xl bg-brand-indigo text-brand-cream space-y-10 relative overflow-hidden">
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-brand-gold">
            <ShieldCheck className="w-8 h-8" />
            <h2 className="text-3xl font-serif font-bold uppercase tracking-wide">System Integrity</h2>
          </div>
          <p className="text-brand-cream/60 max-w-md italic font-serif">
            Continuous verification of cultural protection policies and architectural alignment.
          </p>
        </div>
        <div className="flex items-center gap-6 px-8 py-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-cream/40">Current Status</p>
            <p className="text-4xl font-serif font-bold text-success flex items-center gap-3">
              PASS
              <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-10 border-t border-brand-cream/10 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
        <div className="flex gap-4">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <div>
            <p className="font-bold">Architecture Enforcement</p>
            <p className="text-brand-cream/50 mt-1 italic">Solid modules and type-safety confirmed.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
          <div>
            <p className="font-bold">Dialect Protection Policy</p>
            <p className="text-brand-cream/50 mt-1 italic">Dialect mandatory flag verified across records.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
