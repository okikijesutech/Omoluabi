"use client";

import React from 'react';

const YORUBA_CHARS = [
  'á', 'à', 'ā',
  'é', 'è', 'ē',
  'ẹ́', 'ẹ̀', 'ẹ̄',
  'í', 'ì', 'ī',
  'ó', 'ò', 'ō',
  'ọ́', 'ọ̀', 'ọ̄',
  'ú', 'ù', 'ū',
  'ń', 'ǹ',
  'ḿ', 'm̀'
];

interface YorubaKeyboardProps {
  onInsert: (char: string) => void;
  className?: string;
}

export function YorubaKeyboard({ onInsert, className = "" }: YorubaKeyboardProps) {
  return (
    <div className={`p-4 bg-bg-secondary/50 backdrop-blur-md border border-text-primary/10 rounded-2xl shadow-inner ${className}`}>
      <div className="flex flex-wrap gap-2 justify-center">
        {YORUBA_CHARS.map((char) => (
          <button
            key={char}
            type="button"
            onClick={() => onInsert(char)}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-bg-primary border border-brand-primary/10 text-lg font-serif text-brand-primary hover:bg-brand-accent hover:text-bg-primary hover:scale-110 active:scale-95 transition-all shadow-sm"
          >
            {char}
          </button>
        ))}
      </div>
      <p className="text-[9px] font-bold text-text-secondary/30 uppercase tracking-[0.2em] text-center mt-3">
        Linguistic Tone Picker (Amin)
      </p>
    </div>
  );
}
