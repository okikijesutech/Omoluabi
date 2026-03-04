import React from "react";

const DIALECTS = [
  { value: "standard", label: "Standard Yorùbá" },
  { value: "oyo", label: "Òyó" },
  { value: "ijebu", label: "Ìjẹ̀bú" },
  { value: "egba", label: "Ẹ̀gbá" },
  { value: "ijesa", label: "Ìjẹ̀ṣà" },
  { value: "ikale", label: "Ìkálẹ̀" },
  { value: "ondo", label: "Ondo" },
  { value: "igbomina", label: "Igbomina" },
];

export function DialectSelector({ 
  value, 
  onChange, 
  className = "" 
}: { value: string; onChange: (val: string) => void; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-brand-indigo/10 rounded-lg focus:ring-2 focus:ring-brand-earth/20 focus:border-brand-earth outline-none transition-all appearance-none cursor-pointer"
        required
      >
        <option value="" disabled>Select a dialect...</option>
        {DIALECTS.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
      <span className="block text-xs text-brand-indigo/40 italic">
        Dialect inclusion preserves linguistic diversity. Accuracy is prioritized.
      </span>
    </div>
  );
}
