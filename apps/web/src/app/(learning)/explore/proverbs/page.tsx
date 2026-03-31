'use client';

import React, { useState, useEffect } from 'react';
import { PageContainer, Header, Footer } from '@/components/layout';
import { PageTitle } from '@/components/typography';
import { YorubaText } from '@/components/ui';
import { BookOpen, Search, Filter, Sparkles, Quote, ChevronRight, Globe, Info } from 'lucide-react';
import { apiRequest } from '@/lib/api';

interface Proverb {
  id: string;
  title: string;
  description: string; // Cultural context
  variations: {
    textWithTone: string;
    notes: string;
    dialect: {
      name: string;
      region: string;
    }
  }[];
}

export default function ProverbsPage() {
  const [proverbs, setProverbs] = useState<Proverb[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch KnowledgeUnits of type PROVERB
    apiRequest('/knowledge?type=PROVERB')
      .then(setProverbs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProverbs = proverbs.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-cream/30 dark:bg-zinc-950">
      <Header />

      <main className="pt-24 pb-32">
        <PageContainer size="archive">
          {/* Hero Section */}
          <header className="mb-20 space-y-8 max-w-4xl">
            <div className="flex items-center gap-3 text-brand-gold">
               <div className="p-2 bg-brand-gold/10 rounded-xl ring-1 ring-brand-gold/20">
                  <Quote className="w-5 h-5" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Vault of Wisdom</span>
            </div>
            <PageTitle className="!text-7xl !text-brand-primary tracking-tighter leading-tight">
               Àwọn Òwe Yorùbá
            </PageTitle>
            <p className="text-xl font-serif text-brand-earth/60 italic leading-relaxed border-l-2 border-brand-gold/20 pl-8">
               Proverbs are the horses of speech; if the truth is lost, proverbs are used to find it. 
               Explore the collective intelligence of the Yorùbá heritage.
            </p>
          </header>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-6 mb-16">
            <div className="flex-1 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-primary/20 group-focus-within:text-brand-gold transition-colors" />
              <input 
                type="text"
                placeholder="Search proverbs or meanings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-3xl py-5 pl-16 pr-8 text-lg font-serif italic focus:outline-none focus:ring-4 focus:ring-brand-gold/5 focus:border-brand-gold transition-all shadow-sm"
              />
            </div>
            <button className="px-8 py-5 bg-white dark:bg-zinc-900 border border-brand-indigo/5 rounded-3xl text-[10px] font-black uppercase tracking-widest text-brand-primary hover:bg-brand-indigo/5 transition-all flex items-center gap-3">
               <Filter className="w-4 h-4" />
               Filters
            </button>
          </div>

          {/* Proverbs Grid */}
          {loading ? (
            <div className="py-32 text-center animate-pulse">
               <div className="w-12 h-12 bg-brand-gold/10 rounded-full mx-auto mb-4" />
               <p className="text-[10px] font-black uppercase tracking-widest text-brand-indigo/20">Unearthing Wisdom...</p>
            </div>
          ) : filteredProverbs.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {filteredProverbs.map((proverb) => (
                 <div key={proverb.id} className="group relative bg-white dark:bg-zinc-900 rounded-[3rem] p-10 border border-brand-indigo/5 hover:border-brand-gold/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-gold/5 overflow-hidden">
                    {/* Decorative Background Icon */}
                    <Quote className="absolute -right-4 -top-4 w-32 h-32 text-brand-gold/5 group-hover:rotate-12 transition-transform duration-700" />
                    
                    <div className="space-y-8 relative z-10">
                       <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2 px-3 py-1 bg-brand-indigo/5 rounded-lg border border-brand-indigo/5">
                             <Globe className="w-3 h-3 text-brand-indigo/40" />
                             <span className="text-[8px] font-black uppercase tracking-widest text-brand-indigo/40">
                                {proverb.variations[0]?.dialect.name || 'Standard Yorùbá'}
                             </span>
                          </div>
                          <div className="p-2 bg-brand-gold/10 text-brand-gold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                             <Sparkles className="w-4 h-4" />
                          </div>
                       </div>

                       <div className="space-y-4">
                          <h3 className="text-3xl font-serif text-brand-primary leading-tight">
                             <YorubaText>{proverb.variations[0]?.textWithTone || proverb.title}</YorubaText>
                          </h3>
                          <p className="text-sm text-brand-earth/60 font-serif italic border-l-2 border-brand-indigo/5 pl-4">
                             &ldquo;{proverb.description || 'Literal meaning awaiting verification.'}&rdquo;
                          </p>
                       </div>

                       <div className="pt-8 border-t border-brand-indigo/5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-brand-indigo/[0.03] border border-brand-indigo/5 flex items-center justify-center text-brand-indigo/40">
                                <Info className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-brand-indigo/20">Cultural Notes</p>
                                <p className="text-[10px] font-bold text-brand-primary">View Usage & Lore</p>
                             </div>
                          </div>
                          <button className="w-12 h-12 rounded-2xl bg-brand-primary text-white flex items-center justify-center group-hover:translate-x-2 transition-transform shadow-xl shadow-brand-primary/20">
                             <ChevronRight className="w-5 h-5" />
                          </button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="py-32 text-center bg-white/30 rounded-[3rem] border border-dashed border-brand-indigo/10">
               <BookOpen className="w-12 h-12 text-brand-indigo/10 mx-auto mb-6" />
               <p className="text-2xl font-serif text-brand-primary/40 italic">No proverbs found in this branch of heritage.</p>
               <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-brand-gold hover:underline">
                  Contribute One to the Archive
               </button>
            </div>
          )}
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}
