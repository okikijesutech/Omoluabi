import React from "react";
import { ShieldCheck } from "lucide-react";

/**
 * PreservationNotice - Soft-background panel for integrity/legal notice
 */
export function PreservationNotice({ className = "" }: { className?: string }) {
  return (
    <div className={`p-6 rounded-xl bg-brand-indigo/5 border border-brand-indigo/10 space-y-4 ${className}`}>
      <div className="flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-semibold text-brand-indigo">Integrity Notice</h4>
          <p className="text-sm text-brand-indigo/60 leading-relaxed">
            Your contribution will undergo community review. Preservation prioritizes accuracy over speed. 
            By submitting, you certify its cultural authenticity to the best of your knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * FieldLabel - Standardized label with optional subtext
 */
export function FieldLabel({ 
  label, 
  required, 
  subtext, 
  className = "" 
}: { label: string; required?: boolean; subtext?: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-brand-indigo/80">
          {label} {required && <span className="text-brand-earth">*</span>}
        </span>
      </div>
      {subtext && <div className="text-xs text-brand-indigo/40 italic flex items-center gap-1.5">{subtext}</div>}
    </div>
  );
}
