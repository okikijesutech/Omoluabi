"use client";
import React, { useEffect, useState } from 'react';
import { Map, Loader2 } from 'lucide-react';
import { KnowledgeCard } from '@/components/ui/KnowledgeCard';

export default function DialectExplorePage() {
  const [dialects, setDialects] = useState<any[]>([]);
  const [selectedDialectId, setSelectedDialectId] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDialects();
  }, []);

  const fetchDialects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/dialects`);
      if (res.ok) {
        const data = await res.json();
        setDialects(data);
        if (data.length > 0) {
          setSelectedDialectId(data[0].id);
          fetchResults(data[0].id);
        } else {
            setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const fetchResults = async (dId: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/knowledge/search?dialectId=${dId}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialectChange = (newId: string) => {
    setSelectedDialectId(newId);
    fetchResults(newId);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <header className="space-y-4">
        <h1 className="text-5xl font-serif text-brand-indigo flex items-center gap-4 dark:text-brand-cream">
          <Map className="w-10 h-10 text-brand-accent" />
          Dialect Explorer
        </h1>
        <p className="text-brand-earth/80 text-lg max-w-3xl leading-relaxed dark:text-brand-gold/80">
          Discover how the Yoruba language shifts across regions. Select a dialect to see words and phrases unique to that region—or observe tonal shifts from the standard terminology.
        </p>
      </header>

      {dialects.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-6 hide-scrollbar py-2">
          {dialects.map(d => (
            <button 
              key={d.id}
              onClick={() => handleDialectChange(d.id)}
              className={`whitespace-nowrap px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
                selectedDialectId === d.id 
                  ? 'bg-brand-indigo text-white shadow-lg shadow-brand-indigo/20 dark:bg-brand-cream dark:text-zinc-900 border-transparent' 
                  : 'bg-white text-brand-indigo/60 hover:bg-brand-indigo/5 hover:text-brand-indigo border border-brand-indigo/10 dark:bg-zinc-900 dark:border-zinc-800 dark:text-brand-cream/60 dark:hover:text-brand-cream'
              }`}
            >
              {d.name === 'Òyó (Standard)' ? '👑' : ''} {d.name}
            </button>
          ))}
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="w-10 h-10 text-brand-indigo/20 animate-spin dark:text-brand-cream/20" />
        </div>
      ) : results.length === 0 ? (
        <div className="py-32 text-center border border-dashed border-brand-indigo/10 rounded-3xl bg-white/50 dark:bg-zinc-900/50 dark:border-zinc-800">
          <p className="text-brand-indigo/60 font-serif text-xl dark:text-brand-cream/60">No recorded entries found for this dialect region.</p>
          <p className="text-sm font-medium mt-2 text-brand-accent cursor-pointer hover:underline">Be the first to contribute →</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(item => (
            <KnowledgeCard 
              key={item.id}
              type={item.type}
              standardText={item.title}
              translation={item.description || 'No translation provided.'}
              dialects={item.variations
                .filter((v: any) => v.dialectId === selectedDialectId)
                .map((v: any) => ({
                id: v.id,
                dialectName: v.dialect.name,
                variationText: v.textWithTone,
                explanation: v.notes
              }))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
