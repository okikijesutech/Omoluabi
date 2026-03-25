"use client";

import React, { useState, useRef, useCallback } from 'react';
import { YorubaKeyboard } from './YorubaKeyboard';
import { Keyboard, X, ChevronDown, ChevronUp } from 'lucide-react';

interface TonalInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  multiline?: boolean;
  className?: string;
}

export function TonalInput({ 
  value, 
  onChange, 
  placeholder = "Enter text...", 
  label,
  multiline = false,
  className = "" 
}: TonalInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleInsert = useCallback((char: string) => {
    if (!inputRef.current) return;

    const start = inputRef.current.selectionStart || 0;
    const end = inputRef.current.selectionEnd || 0;
    const text = value;
    const newValue = text.substring(0, start) + char + text.substring(end);
    
    onChange(newValue);

    // Re-focus and set cursor position after insertion
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const newPos = start + char.length;
        inputRef.current.setSelectionRange(newPos, newPos);
      }
    }, 0);
  }, [value, onChange]);

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary/60 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        <InputComponent
          ref={inputRef as any}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={multiline ? 4 : undefined}
          className={`
            w-full px-6 py-4 bg-white border border-text-primary/10 rounded-2xl
            font-serif text-lg text-brand-primary placeholder:text-text-secondary/30
            focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent
            transition-all duration-300
            ${multiline ? 'resize-none' : ''}
          `}
        />
        
        <button
          type="button"
          onClick={() => setShowKeyboard(!showKeyboard)}
          className={`
            absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl
            transition-all duration-300
            ${showKeyboard 
              ? 'bg-brand-accent text-white shadow-lg shadow-brand-accent/20' 
              : 'text-text-secondary/40 hover:bg-bg-secondary hover:text-brand-accent'}
          `}
          title="Toggle Tonal Keyboard"
        >
          {showKeyboard ? <X className="w-5 h-5" /> : <Keyboard className="w-5 h-5" />}
        </button>
      </div>

      <div className={`
        overflow-hidden transition-all duration-500 ease-in-out
        ${showKeyboard ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
      `}>
        <YorubaKeyboard onInsert={handleInsert} />
      </div>
    </div>
  );
}
