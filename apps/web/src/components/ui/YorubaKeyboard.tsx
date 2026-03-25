"use client";

import React from 'react';
import { Sparkles, Type } from 'lucide-react';

const GROUPS = [
  {
    label: "Vowels (A, E, Ẹ)",
    chars: ['á', 'à', 'ā', 'é', 'è', 'ē', 'ẹ́', 'ẹ̀', 'ẹ̄']
  },
  {
    label: "Vowels (I, O, Ọ)",
    chars: ['í', 'ì', 'ī', 'ó', 'ò', 'ō', 'ọ́', 'ọ̀', 'ọ̄']
  },
  {
    label: "Vowels (U) & Nasals (N, M)",
    chars: ['ú', 'ù', 'ū', 'ń', 'ǹ', 'm̀', 'ḿ']
  }
];

interface YorubaKeyboardProps {
  onInsert: (char: string) => void;
  className?: string;
}

export function YorubaKeyboard({ onInsert, className = "" }: YorubaKeyboardProps) {
  return (
    <div className={`p-6 bg-white/80 backdrop-blur-xl border border-brand-primary/10 rounded-3xl shadow-2xl shadow-brand-primary/5 ${className}`}>
      <div className="flex items-center gap-2 mb-6 text-brand-accent uppercase tracking-[0.3em] text-[10px] font-bold">
        <Sparkles className="w-3 h-3" />
        Archival Tone Picker
      </div>
      
      <div className="space-y-6">
        {GROUPS.map((group) => (
          <div key={group.label} className="space-y-3">
            <p className="text-[9px] font-bold text-text-secondary/40 uppercase tracking-widest pl-1">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.chars.map((char) => (
                <button
                  key={char}
                  type="button"
                  onClick={() => onInsert(char)}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white border border-text-primary/5 text-xl font-serif text-brand-primary hover:border-brand-accent hover:text-brand-accent hover:shadow-lg hover:shadow-brand-accent/10 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-text-primary/5 flex items-center gap-3 text-text-secondary/40">
        <Type className="w-3 h-3" />
        <p className="text-[9px] font-medium italic">
          Select a character (Amin) to insert at the cursor position.
        </p>
      </div>
    </div>
  );
}
