"use client";

import React from "react";

interface DialectTabsProps {
  activeDialect: string;
  onDialectChange: (dialect: string) => void;
  dialects: Record<string, { definition: string; usage: string }>;
}

export function DialectTabs({ activeDialect, onDialectChange, dialects }: DialectTabsProps) {
  return (
    <section className="space-y-12 py-12 border-t border-text-primary/5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-text-primary/5 pb-2">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">
          Regional Variations
        </h3>
        <div className="flex gap-8">
          {Object.keys(dialects).map((d) => (
            <button
              key={d}
              onClick={() => onDialectChange(d)}
              className={`pb-2 text-[11px] font-bold uppercase tracking-widest transition-all relative ${
                activeDialect === d 
                  ? "text-brand-primary" 
                  : "text-text-secondary/40 hover:text-text-secondary"
              }`}
            >
              {d}
              {activeDialect === d && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary animate-in fade-in slide-in-from-left-2" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest">Definition ({activeDialect})</span>
          <p className="text-xl font-serif text-text-primary leading-relaxed">
            {dialects[activeDialect].definition}
          </p>
        </div>
        <div className="space-y-4">
          <span className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest">Local Usage</span>
          <p className="text-lg italic text-text-secondary leading-relaxed border-l-2 border-brand-accent/10 pl-6">
            {dialects[activeDialect].usage}
          </p>
        </div>
      </div>
    </section>
  );
}
