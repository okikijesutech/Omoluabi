import React from "react";
import { Play, User } from "lucide-react";

interface OralSectionProps {
  elderName: string;
  community: string;
}

export function OralSection({ elderName, community }: OralSectionProps) {
  return (
    <div className="space-y-8 py-12 border-t border-text-primary/5">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">
        Oral Tradition
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-10 bg-bg-secondary/20 p-8 rounded-md">
        <div className="relative w-24 h-24 rounded-full bg-bg-primary border border-brand-accent/10 flex items-center justify-center text-brand-accent">
          <User className="w-10 h-10 opacity-20" />
          <div className="absolute inset-0 rounded-full border-2 border-brand-accent/5 animate-pulse" />
        </div>

        <div className="flex-1 space-y-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="text-lg font-serif font-bold text-brand-primary italic">Recorded by {elderName}</h4>
            <p className="text-xs uppercase tracking-[0.2em] text-text-secondary/60">Community: {community}</p>
          </div>
          
          <button className="flex items-center gap-4 bg-brand-primary text-bg-primary px-8 py-4 rounded-full hover:bg-brand-primary/90 transition-all group mx-auto sm:mx-0 shadow-lg shadow-brand-primary/10">
            <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Listen to Archival Audio</span>
          </button>
        </div>
      </div>
    </div>
  );
}
