import React from 'react';

// Matches common Yoruba precomposed tonal vowels and syllabic nasals, 
// as well as explicitly combined forms with underdots (ẹ and ọ)
const YORUBA_TONE_REGEX = /([áàéèíìóòúùńǹḿm̀ÁÀÉÈÍÌÓÒÚÙŃǸḾM̀]|e\u0323[\u0301\u0300]|o\u0323[\u0301\u0300]|E\u0323[\u0301\u0300]|O\u0323[\u0301\u0300]|ẹ[\u0301\u0300]|ọ[\u0301\u0300]|Ẹ[\u0301\u0300]|Ọ[\u0301\u0300])/g;

interface YorubaTextProps {
  children: string;
  className?: string;
}

/**
 * Renders text and automatically parses Yorùbá characters, 
 * applying the "Mustard Gold" highlight to any tones (Amin)
 * to train the learner's eye.
 */
export function YorubaText({ children, className = "" }: YorubaTextProps) {
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  // Splitting by a capturing group in JS places the captures directly into the array at odd indices
  const parts = children.split(YORUBA_TONE_REGEX);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        // Odd indices are the captured tonal characters
        if (i % 2 === 1) {
          return (
            <span key={i} className="text-brand-gold font-medium">
              {part}
            </span>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
