'use client';

import React from 'react';
import { Type, Sparkles } from 'lucide-react';

interface ToneAssistantProps {
  onInsert: (char: string) => void;
  activeValue: string;
}

const TONE_GROUPS = [
  { label: 'A', chars: ['á', 'à', 'ā'] },
  { label: 'E', chars: ['é', 'è', 'ē'] },
  { label: 'Ẹ', chars: ['ẹ́', 'ẹ̀', 'ẹ̄'] },
  { label: 'I', chars: ['í', 'ì', 'ī'] },
  { label: 'O', chars: ['ó', 'ò', 'ō'] },
  { label: 'Ọ', chars: ['ọ́', 'ọ̀', 'ọ̄'] },
  { label: 'U', chars: ['ú', 'ù', 'ū'] },
  { label: 'N/M', chars: ['ń', 'ǹ', 'ḿ', 'm̀'] },
];

export function ToneAssistant({ onInsert, activeValue }: ToneAssistantProps) {
  // Logic to suggest the most likely vowel group based on the last typed character
  const lastChar = activeValue.slice(-1).toLowerCase();
  const suggestedGroup = TONE_GROUPS.find(g => g.label.toLowerCase().includes(lastChar));

  return (
    <div className="bg-white/90 backdrop-blur-md border border-brand-indigo/10 rounded-2xl p-4 shadow-2xl shadow-brand-indigo/5 animate-in fade-in zoom-in-95 duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-brand-indigo/40">
           <Type className="w-3 h-3" />
           Tonal Forge
        </div>
        {suggestedGroup && (
           <div className="flex items-center gap-1.5 text-brand-gold animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span className="text-[8px] font-bold uppercase tracking-widest">Suggested: {suggestedGroup.label}</span>
           </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(suggestedGroup ? [suggestedGroup, ...TONE_GROUPS.filter(g => g !== suggestedGroup)] : TONE_GROUPS).map((group) => (
          <div key={group.label} className="flex gap-1 border-r border-brand-indigo/5 pr-2 last:border-0 last:pr-0">
             {group.chars.map((char) => (
               <button
                 key={char}
                 type="button"
                 onClick={() => onInsert(char)}
                 className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-indigo/[0.02] border border-transparent hover:border-brand-gold hover:text-brand-gold hover:bg-white transition-all text-sm font-serif"
               >
                 {char}
               </button>
             ))}
          </div>
        ))}
      </div>
    </div>
  );
}
