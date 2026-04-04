"use client";

import React, { useEffect, useState } from 'react';
import { MapPin, Loader2, ChevronDown } from 'lucide-react';

interface Dialect {
  id: string;
  name: string;
  region: string;
}

interface DialectSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DialectSelector({ value, onChange, className = "" }: DialectSelectorProps) {
  const [dialects, setDialects] = useState<Dialect[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDialects() {
      try {
        const res = await fetch('http://localhost:3001/dialects'); // Assuming port 3001 for API
        const data = await res.json();
        setDialects(data);
      } catch (error) {
        console.error("Failed to fetch dialects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDialects();
  }, []);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary/60 ml-1">
        Target Dialect (Èdè)
      </label>
      <div className="relative group">
        {loading ? (
          <div className="w-full px-6 py-4 bg-white/50 border border-text-primary/10 rounded-2xl flex items-center justify-between">
            <span className="text-text-secondary/30 italic font-serif">Loading dialects...</span>
            <Loader2 className="w-4 h-4 text-brand-accent animate-spin" />
          </div>
        ) : (
          <>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-text-primary/10 rounded-2xl font-serif text-lg text-brand-primary appearance-none focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all cursor-pointer"
            >
              <option value="" disabled>Select a dialect...</option>
              {dialects.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.region})
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary/40 group-hover:text-brand-accent transition-all">
              <ChevronDown className="w-5 h-5" />
            </div>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <MapPin className="w-4 h-4 text-brand-accent/20" />
            </div>
            {/* Custom padding for the MapPin */}
            <style jsx>{`
                select { padding-left: 3.5rem; }
            `}</style>
          </>
        )}
      </div>
    </div>
  );
}
