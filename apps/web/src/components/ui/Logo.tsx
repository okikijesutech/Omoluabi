import React from "react";
import Image from "next/image";

/**
 * OmoluabiLogo - Institutional brand assets
 */
export function OmoluabiLogo({ className = "", horizontal = false }: { className?: string, horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-brand-accent/20">
          <Image 
            src="/logo (1).png" 
            alt="Omoluabi Icon" 
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col -space-y-1">
          <span className="text-xl font-serif font-bold text-brand-primary tracking-tight leading-none">
            Ọmọlúàbí
          </span>
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-text-secondary/60">
            Cultural Preservation
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-6 ${className}`}>
      {/* Prime Institutional Logo */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-accent/20 shadow-xl">
        <Image 
          src="/logo (1).png" 
          alt="Omoluabi Primary Logo" 
          fill
          className="object-cover"
        />
      </div>
      <div className="text-center space-y-2">
        <span className="text-4xl font-serif font-bold text-brand-primary tracking-[0.1em] uppercase block">
          Ọmọlúàbí
        </span>
        <div className="flex flex-col items-center gap-2">
          <div className="h-px w-12 bg-brand-accent/30" />
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-secondary/60 block">
            Cultural Preservation & Identity
          </span>
        </div>
      </div>
    </div>
  );
}
