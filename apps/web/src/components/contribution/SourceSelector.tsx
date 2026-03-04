import React from "react";

const SOURCES = [
  "Oral tradition (elder)",
  "Family memory",
  "Community usage",
  "Academic text",
  "Historical record"
];

export function SourceSelector({ 
  value, 
  onChange, 
  className = "" 
}: { value: string; onChange: (val: string) => void; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${className}`}>
      {SOURCES.map((source) => (
        <label 
          key={source} 
          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors group ${
            value === source 
              ? "border-brand-earth bg-brand-earth/5" 
              : "border-brand-indigo/10 hover:bg-brand-indigo/5"
          }`}
        >
          <input 
            type="radio" 
            name="source" 
            value={source} 
            checked={value === source}
            onChange={() => onChange(source)}
            className="accent-brand-earth" 
          />
          <span className={`text-sm transition-colors ${
            value === source ? "text-brand-earth font-semibold" : "text-brand-indigo/70 group-hover:text-brand-indigo"
          }`}>
            {source}
          </span>
        </label>
      ))}
    </div>
  );
}
