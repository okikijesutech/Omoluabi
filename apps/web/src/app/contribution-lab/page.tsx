"use client";

import React, { useState } from 'react';
import { PageContainer, Section, Header, Footer } from '@/components/layout';
import { PageTitle } from '@/components/typography';
import { TonalInput, YorubaText, DialectSelector } from '@/components/ui';
import { FlaskConical, Save, Languages, History, Info, Loader2, CheckCircle2 } from 'lucide-react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ContributionLab() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [notes, setNotes] = useState("");
  const [dialectId, setDialectId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSaveDraft = async () => {
    if (!word || !dialectId) {
      alert("Please enter a word and select a dialect.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/contributions/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('omoluabi_token')}`
        },
        body: JSON.stringify({
          type: 'CREATE',
          dialectTag: dialectId,
          payload: {
            title: word,
            meaning,
            notes,
            dialectId
          }
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-bg-primary">
        <Header />
        
        <main className="pb-24">
          {/* Header Section */}
          <Section spacing="lg" className="border-b border-text-primary/5 bg-white/50">
            <PageContainer size="archive">
              <header className="space-y-6 pt-16 max-w-3xl">
                <div className="flex items-center gap-3 text-brand-accent uppercase tracking-[0.4em] text-[10px] font-bold">
                  <FlaskConical className="w-4 h-4" />
                  Preservation Sandbox
                </div>
                <PageTitle className="!text-6xl !text-brand-primary tracking-tighter">Contribution Lab</PageTitle>
                <p className="text-xl font-serif text-text-secondary italic leading-relaxed max-w-2xl border-l-2 border-brand-accent/10 pl-8">
                  Testing the structural integrity of the Tonal Keyboard and the Preservation-First philosophy in data entry.
                </p>
              </header>
            </PageContainer>
          </Section>

          {/* Input Lab Section */}
          <Section spacing="xl">
            <PageContainer size="archive">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                
                {/* Left Column: The Form */}
                <div className="lg:col-span-7 space-y-12">
                  <div className="space-y-8 bg-white/50 p-12 rounded-3xl border border-text-primary/5 shadow-xl shadow-brand-primary/5">
                    <div className="space-y-6">
                      <DialectSelector 
                        value={dialectId} 
                        onChange={setDialectId} 
                        className="max-w-md" 
                      />

                      <TonalInput
                        label="Word / Phrase (Ọ̀rọ̀)"
                        value={word}
                        onChange={setWord}
                        placeholder="e.g. Ọmọluàbí, Àṣà..."
                        className="max-w-xl"
                      />
                      
                      <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary/60 ml-1">
                              Primary Meaning (Ìtumọ̀)
                          </label>
                          <textarea
                              value={meaning}
                              onChange={(e) => setMeaning(e.target.value)}
                              placeholder="Describe the cultural and literal meaning..."
                              rows={4}
                              className="w-full px-6 py-4 bg-white border border-text-primary/10 rounded-2xl font-serif text-lg text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all resize-none"
                          />
                      </div>

                      <TonalInput
                        label="Cultural Notes & Etymology"
                        value={notes}
                        onChange={setNotes} // Correcting this to setNotes if I missed it, wait let me check the previous code
                        placeholder="Discuss the history, dialect origins, or proverb usage..."
                        multiline
                      />
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                      <button 
                        onClick={handleSaveDraft}
                        disabled={isSubmitting || submitted}
                        className={`flex items-center gap-2 px-8 py-4 ${submitted ? 'bg-green-600' : 'bg-brand-primary'} text-bg-primary rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-brand-accent hover:-translate-y-1 transition-all shadow-lg shadow-brand-primary/20 disabled:opacity-50 disabled:translate-y-0`}
                      >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : submitted ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                        {submitted ? 'Contribution Saved' : 'Save Draft'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Live Data Preview */}
                <div className="lg:col-span-5 space-y-8 sticky top-32">
                  <div className="bg-brand-primary p-12 rounded-3xl text-bg-primary shadow-2xl shadow-brand-primary/30 relative overflow-hidden group">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="space-y-12 relative z-10">
                      <header className="flex justify-between items-start">
                          <div className="space-y-2">
                              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Live Analysis</p>
                              <h3 className="text-2xl font-serif italic text-brand-accent">Archival Preview</h3>
                          </div>
                          <Languages className="w-8 h-8 text-brand-accent" />
                      </header>

                      <div className="space-y-8 min-h-[120px]">
                          <div className="space-y-2">
                              <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Tonal Integrity</p>
                              <div className="text-4xl font-serif">
                                  {word ? <YorubaText>{word}</YorubaText> : <span className="opacity-20 italic">No entry yet...</span>}
                              </div>
                          </div>
                          
                          {meaning && (
                              <div className="space-y-2">
                                  <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">Literal Mapping</p>
                                  <p className="text-lg opacity-80 leading-relaxed font-serif italic">
                                      &ldquo;{meaning}&rdquo;
                                  </p>
                              </div>
                          )}
                      </div>

                      <div className="pt-8 border-t border-white/10 flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest opacity-40">
                          <History className="w-4 h-4" />
                          Awaiting Contribution Submission
                      </div>
                    </div>
                  </div>

                  {/* Educational Note */}
                  <div className="p-8 bg-bg-secondary/20 rounded-2xl border border-text-primary/5 flex gap-4 items-start">
                      <Info className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                      <div className="space-y-2">
                          <p className="text-[11px] font-bold text-brand-primary uppercase tracking-widest">Why Tonal Integrity Matters</p>
                          <p className="text-sm text-text-secondary leading-relaxed font-serif italic">
                              In Yoruba, a change in tone (*Amin*) changes the meaning. The "Archival Tone Picker" ensures you can perfectly capture the soul of the word before it is committed to the immutable records.
                          </p>
                      </div>
                  </div>
                </div>

              </div>
            </PageContainer>
          </Section>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
