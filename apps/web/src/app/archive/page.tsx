'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout';
import { PageTitle, BodyText } from '@/components/typography';
import { Search, Filter, Loader2, Sparkles, Database } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';
import { KnowledgeCard } from '@/components/ui/KnowledgeCard';
import { apiRequest } from '@/lib/api';

export default function ArchivePage() {
  const { results, loading, error, search, debouncedSearch } = useSearch();
  const [keyword, setKeyword] = useState('');
  const [dialectId, setDialectId] = useState('all');
  const [type, setType] = useState('all');
  const [dialects, setDialects] = useState<any[]>([]);

  useEffect(() => {
    // Initial fetch
    search({ limit: 20 });
    fetchDialects();
  }, [search]);

  const fetchDialects = async () => {
    try {
      const data = await apiRequest('/dialects');
      setDialects(data);
    } catch (err) {
      console.error('Failed to fetch dialects:', err);
    }
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setKeyword(val);
    debouncedSearch({ keyword: val, dialectId, type, limit: 20 });
  };

  const handleFilterChange = (newDialectId: string, newType: string) => {
    setDialectId(newDialectId);
    setType(newType);
    search({ keyword, dialectId: newDialectId, type: newType, limit: 20 });
  };

  return (
    <div className="min-h-screen bg-brand-cream/30 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 border-b border-text-primary/5 pt-12 pb-8">
        <PageContainer size="archive">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-indigo/10 rounded-lg text-brand-indigo ring-1 ring-brand-indigo/20">
                <Database className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-indigo/60">
                Linguistic Repository
              </span>
            </div>
            <PageTitle>Immortal Archive</PageTitle>
            <BodyText className="mt-4 max-w-2xl">
              Explore the collective wisdom of the Yorùbá people. Search through thousands of words, 
              proverbs, and dialectal variations preserved for eternity.
            </BodyText>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary/30 group-focus-within:text-brand-indigo transition-colors" />
              <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                placeholder="Search by word, meaning, or tonal variation..."
                className="w-full pl-16 pr-6 py-5 bg-white dark:bg-zinc-800 border border-text-primary/10 rounded-2xl font-serif text-xl focus:outline-none focus:ring-2 focus:ring-brand-indigo/10 focus:border-brand-indigo transition-all shadow-sm"
              />
              {loading && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 text-brand-indigo animate-spin" />
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <div className="relative flex-1 md:w-48">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/40" />
                <select
                  value={type}
                  onChange={(e) => handleFilterChange(dialectId, e.target.value)}
                  className="w-full pl-10 pr-4 py-5 bg-white dark:bg-zinc-800 border border-text-primary/10 rounded-2xl text-sm font-bold uppercase tracking-widest text-text-secondary appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-indigo/10"
                >
                  <option value="all">All Types</option>
                  <option value="WORD">Words</option>
                  <option value="PHRASE">Phrases</option>
                  <option value="PROVERB">Proverbs</option>
                  <option value="ORIKI">Oríkì</option>
                </select>
              </div>

              <div className="relative flex-1 md:w-48">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/40">
                   <Sparkles className="w-4 h-4" />
                </div>
                <select
                  value={dialectId}
                  onChange={(e) => handleFilterChange(e.target.value, type)}
                  className="w-full pl-10 pr-4 py-5 bg-white dark:bg-zinc-800 border border-text-primary/10 rounded-2xl text-sm font-bold uppercase tracking-widest text-text-secondary appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-indigo/10"
                >
                  <option value="all">All Dialects</option>
                  {dialects.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      <PageContainer size="archive" className="py-12">
        {error && (
          <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 mb-8 flex items-center gap-4">
             <AlertCircle className="w-6 h-6" />
             <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.length > 0 ? (
            results.map((unit: any) => (
              <KnowledgeCard
                key={unit.id}
                type={unit.type}
                standardText={unit.title}
                translation={unit.description || 'No translation provided'}
                culturalContext={unit.description} // Using same for now if no specific context field
                dialects={unit.variations?.map((v: any) => ({
                  id: v.id,
                  dialectName: v.dialect.name,
                  variationText: v.textWithTone,
                  explanation: v.notes
                }))}
              />
            ))
          ) : !loading && (
            <div className="col-span-full py-24 text-center">
               <div className="w-20 h-20 bg-brand-indigo/5 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-indigo/20">
                  <Search className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-serif text-brand-primary">Linguistic Silence</h3>
               <p className="text-text-secondary mt-2 max-w-md mx-auto">
                 We couldn't find any records matching "{keyword}". Perhaps this is your opportunity to 
                 <a href="/contribute" className="text-brand-indigo font-bold ml-1 hover:underline">add it to the archive?</a>
               </p>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}

import { AlertCircle } from 'lucide-react';
