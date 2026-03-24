"use client";

import React, { useState, useEffect, useRef } from "react";
import { PageContainer, Section, Header, Footer, Divider } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Search, Info, ShieldCheck, MapPin, BookOpen, Trash2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { YorubaKeyboard, Badge } from "@/components/ui";

export default function ContributePage() {
  const [dialects, setDialects] = useState<any[]>([]);
  const [activeField, setActiveField] = useState<'word' | 'context' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    type: "WORD",
    word: "",
    dialect: "",
    context: "",
    source: "",
    reflection: ""
  });

  const wordRef = useRef<HTMLInputElement>(null);
  const contextRef = useRef<HTMLTextAreaElement>(null);

  // Fetch real dialects from API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/dialects`)
      .then(res => res.json())
      .then(data => setDialects(data))
      .catch(err => console.error("Failed to fetch dialects", err));
  }, []);

  const handleInsert = (char: string) => {
    if (activeField === 'word') {
      const start = wordRef.current?.selectionStart || 0;
      const end = wordRef.current?.selectionEnd || 0;
      const newText = formData.word.substring(0, start) + char + formData.word.substring(end);
      setFormData(prev => ({ ...prev, word: newText }));
      // Refocus after state update
      setTimeout(() => {
        wordRef.current?.focus();
        wordRef.current?.setSelectionRange(start + char.length, start + char.length);
      }, 0);
    } else if (activeField === 'context') {
      const start = contextRef.current?.selectionStart || 0;
      const end = contextRef.current?.selectionEnd || 0;
      const newText = formData.context.substring(0, start) + char + formData.context.substring(end);
      setFormData(prev => ({ ...prev, context: newText }));
      setTimeout(() => {
        contextRef.current?.focus();
        contextRef.current?.setSelectionRange(start + char.length, start + char.length);
      }, 0);
    }
  };

  const isFormValid = formData.dialect !== "" && formData.context !== "" && formData.word !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/contributions/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-guest-test': 'true' // Dev bypass
        },
        body: JSON.stringify({
          authorId: 'guest-contributor-id',
          type: 'CREATE', 
          dialectTag: formData.dialect,
          payload: {
            type: formData.type,
            title: formData.word,
            description: formData.context,
            dialectId: formData.dialect,
            textWithTone: formData.word,
            source: formData.source,
            reflection: formData.reflection
          }
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          type: "WORD",
          word: "",
          dialect: "",
          context: "",
          source: "",
          reflection: ""
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      <Header />

      <main className="pb-32 relative">
        <PageContainer size="md" className="pt-24 space-y-16">
          
          {/* PAGE TITLE SECTION */}
          <header className="space-y-6">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <h1 className="text-5xl font-serif font-bold text-brand-primary tracking-tighter">
                        Contribute to Archive
                    </h1>
                    <p className="text-xl font-serif text-text-secondary italic opacity-60 leading-relaxed">
                        Preserving the Yorùbá linguistic record for future generations.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setFormData({...formData, type: 'WORD'})}
                        className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${formData.type === 'WORD' ? 'bg-brand-primary text-bg-primary' : 'bg-bg-secondary text-brand-primary opacity-40'}`}
                    >
                        Word
                    </button>
                    <button 
                         onClick={() => setFormData({...formData, type: 'PROVERB'})}
                         className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${formData.type === 'PROVERB' ? 'bg-brand-primary text-bg-primary' : 'bg-bg-secondary text-brand-primary opacity-40'}`}
                    >
                        Proverb
                    </button>
                </div>
            </div>
          </header>

          <Divider className="opacity-10" />

          {submitStatus === 'success' && (
            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl flex items-center gap-4 text-green-700 animate-in fade-in slide-in-from-top-4">
              <CheckCircle2 className="w-6 h-6" />
              <div>
                <p className="font-bold">Submission Successful</p>
                <p className="text-sm opacity-80 font-serif italic">Your contribution has been sent for community review.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex items-center gap-4 text-red-700 animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="w-6 h-6" />
              <div>
                <p className="font-bold">Submission Failed</p>
                <p className="text-sm opacity-80 font-serif italic">There was an error connecting to the archive. Please try again.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-24">
            
            {/* SECTION 1 — KNOWLEDGE ENTRY */}
            <section className="space-y-8 relative">
                <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                        Knowledge Entry
                    </label>
                    {activeField === 'word' && (
                        <div className="absolute -top-12 right-0 left-0 z-50 animate-in fade-in zoom-in-95">
                            <YorubaKeyboard onInsert={handleInsert} />
                        </div>
                    )}
                </div>
                <div className="space-y-4">
                    <input 
                        ref={wordRef}
                        type="text"
                        placeholder={`Enter ${formData.type.toLowerCase()} with tone marks`}
                        className="w-full text-4xl font-serif text-brand-primary bg-transparent border-b border-text-primary/10 py-6 focus:border-brand-primary outline-none transition-all placeholder:text-text-secondary/20"
                        value={formData.word}
                        onFocus={() => setActiveField('word')}
                        onBlur={() => setTimeout(() => setActiveField(prev => prev === 'word' ? null : prev), 200)}
                        onChange={(e) => setFormData({...formData, word: e.target.value})}
                    />
                    <p className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-3 h-3" /> Tone marks are required for archival approval.
                    </p>
                </div>
            </section>

            {/* SECTION 2 — DIALECT (Required) */}
            <section className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                        Dialect
                    </label>
                    <p className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest italic">
                        Preserving linguistic diversity. Every entry must specify its regional origin.
                    </p>
                </div>
                <select 
                    className="w-full bg-[#D8CFC7]/10 border border-text-primary/10 rounded-xl p-6 text-xl font-serif italic outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer"
                    value={formData.dialect}
                    onChange={(e) => setFormData({...formData, dialect: e.target.value})}
                >
                    <option value="" disabled>Select dialect from database</option>
                    {dialects.map((d: any) => (
                        <option key={d.id} value={d.id}>{d.name} ({d.region})</option>
                    ))}
                    {dialects.length === 0 && (
                        <option disabled>Loading dialects from archive...</option>
                    )}
                </select>
            </section>

            {/* SECTION 3 — CULTURAL CONTEXT (Required) */}
            <section className="space-y-8 relative">
                <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                        Cultural Context
                    </label>
                    {activeField === 'context' && (
                        <div className="absolute -top-24 right-0 left-0 z-50 animate-in fade-in zoom-in-95">
                             <YorubaKeyboard onInsert={handleInsert} />
                        </div>
                    )}
                </div>
                <textarea 
                    ref={contextRef}
                    placeholder="Explain the cultural meaning, usage, and significance."
                    className="w-full min-h-[200px] bg-transparent border border-text-primary/10 rounded-2xl p-8 text-xl font-serif text-text-secondary leading-relaxed outline-none focus:border-brand-primary transition-all placeholder:text-text-secondary/20 resize-none"
                    value={formData.context}
                    onFocus={() => setActiveField('context')}
                    onBlur={() => setTimeout(() => setActiveField(prev => prev === 'context' ? null : prev), 200)}
                    onChange={(e) => setFormData({...formData, context: e.target.value})}
                />
            </section>

            {/* SECTION 4 — SOURCE & REFLECTION */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                        Source of Knowledge
                    </label>
                    <div className="grid grid-cols-1 gap-4">
                        {["Oral tradition (elder)", "Family memory", "Community usage", "Academic text", "Historical record"].map((source) => (
                            <button 
                                key={source}
                                type="button"
                                onClick={() => setFormData({...formData, source})}
                                className={`p-6 rounded-2xl border text-left transition-all ${formData.source === source ? "bg-brand-accent/10 border-brand-accent text-brand-primary" : "border-text-primary/5 hover:border-brand-primary/20 text-text-secondary/60"}`}
                            >
                                <span className="text-xs font-bold uppercase tracking-widest">{source}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-8">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                        Preservation Reflection
                    </label>
                    <textarea 
                        placeholder="Why is this important for future generations?"
                        className="w-full min-h-[240px] bg-bg-secondary/20 border border-text-primary/5 rounded-2xl p-6 text-lg font-serif italic text-text-secondary outline-none focus:border-brand-primary/20 transition-all resize-none"
                        value={formData.reflection}
                        onChange={(e) => setFormData({...formData, reflection: e.target.value})}
                    />
                </div>
            </section>

            {/* PRE-SUBMISSION NOTICE PANEL */}
            <div className="bg-[#D8CFC7]/10 border-l-4 border-brand-accent p-8 rounded-r-2xl space-y-4">
                <div className="flex items-center gap-3 text-brand-accent">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Integrity Protocol</span>
                </div>
                <div className="space-y-2 text-sm font-serif italic text-text-secondary/70 leading-relaxed">
                    <p>Your submission will be queued for community-led cultural review.</p>
                    <p>Trust score adjustments occur upon successful archival.</p>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="pt-12 flex flex-col sm:flex-row gap-6 items-center border-t border-text-primary/5">
                <Button 
                    type="submit"
                    size="lg" 
                    disabled={!isFormValid || isSubmitting}
                    className={`flex-1 w-full rounded-full py-8 text-lg font-serif tracking-tight shadow-xl transition-all ${isFormValid && !isSubmitting ? "bg-brand-primary text-bg-primary hover:bg-brand-primary/90" : "bg-text-primary/10 text-text-primary/20 cursor-not-allowed"}`}
                >
                    {isSubmitting ? "Submitting to Archive..." : "Submit for Cultural Review"}
                </Button>
            </div>

          </form>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}
