"use client";
import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { KnowledgeCard } from '@/components/ui/KnowledgeCard';

export default function WordsExplorePage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResults('');
  }, []);

  const fetchResults = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const qs = searchQuery ? `?keyword=${encodeURIComponent(searchQuery)}&type=WORD` : '?type=WORD';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/knowledge/search${qs}`);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResults(query);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-4">
        <h1 className="text-5xl font-serif tracking-tight text-brand-indigo dark:text-brand-cream">The Vocabulary Vault</h1>
        <p className="text-brand-earth/80 text-lg max-w-2xl dark:text-brand-gold/80">
          Search the authenticated archive for standardized Yoruba words, complete with tonal markings, definitions, and regional dialect variations.
        </p>
      </header>

      <form onSubmit={handleSearch} className="relative group max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-brand-indigo/40 group-focus-within:text-brand-accent transition-colors" />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by spelling, meaning, or tonal variation..."
          className="w-full bg-white border border-brand-indigo/10 rounded-2xl py-4 pl-14 pr-4 text-lg text-brand-indigo font-serif placeholder:font-sans placeholder:text-brand-indigo/30 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent transition-all shadow-sm dark:bg-zinc-900 dark:border-zinc-800 dark:text-brand-cream dark:placeholder:text-brand-cream/30"
        />
      </form>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
           {[1,2,3,4,5,6].map(i => <div key={i} className="h-64 bg-slate-100 rounded-2xl dark:bg-zinc-900" />)}
        </div>
      ) : results.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-brand-indigo/10 rounded-3xl bg-white/50 dark:bg-zinc-900/50 dark:border-zinc-800">
          <p className="text-brand-indigo/60 font-serif text-lg dark:text-brand-cream/60">No entries found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(item => (
            <KnowledgeCard 
              key={item.id}
              type={item.type}
              standardText={item.title}
              translation={item.description || 'No translation provided.'}
              dialects={item.variations.map((v: any) => ({
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
