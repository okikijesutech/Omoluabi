"use client";

import React, { useState } from "react";
import { PageContainer, Section, Header, Footer, Divider } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Search, Info, ShieldCheck, MapPin, BookOpen, Trash2, Save } from "lucide-react";
import Link from "next/link";

export default function ContributePage() {
  const [formData, setFormData] = useState({
    word: "",
    dialect: "",
    context: "",
    source: "",
    reflection: ""
  });

  const isFormValid = formData.dialect !== "" && formData.context !== "" && formData.word !== "";

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      <Header />

      <main className="pb-32">
        <PageContainer size="md" className="pt-24 space-y-16">
          
          {/* PAGE TITLE SECTION */}
          <header className="space-y-6">
            <h1 className="text-5xl font-serif font-bold text-brand-primary tracking-tighter">
                Contribute to the Cultural Archive
            </h1>
            <p className="text-xl font-serif text-text-secondary italic opacity-60 leading-relaxed">
                Every submission becomes part of a preserved linguistic record for future generations.
            </p>
          </header>

          <Divider className="opacity-10" />

          <form className="space-y-24">
            
            {/* SECTION 1 — KNOWLEDGE ENTRY */}
            <section className="space-y-8">
                <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                    Knowledge Entry
                </label>
                <div className="space-y-4">
                    <input 
                        type="text"
                        placeholder="Enter word or phrase with tone marks"
                        className="w-full text-4xl font-serif text-brand-primary bg-transparent border-b border-text-primary/10 py-6 focus:border-brand-primary outline-none transition-all placeholder:text-text-secondary/20"
                        value={formData.word}
                        onChange={(e) => setFormData({...formData, word: e.target.value})}
                    />
                    <p className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-3 h-3" /> Tone marks are required for archival approval.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-3">
                        <label className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/60">IPA Pronunciation (Optional)</label>
                        <input className="w-full bg-bg-secondary/20 border border-text-primary/5 rounded-xl p-4 text-sm font-serif italic outline-none focus:border-brand-primary/20" placeholder="/a-yo/" />
                    </div>
                </div>
            </section>

            {/* SECTION 2 — DIALECT (Required) */}
            <section className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                        Dialect
                    </label>
                    <p className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest italic">
                        Dialect inclusion preserves linguistic diversity. Every entry must specify origin.
                    </p>
                </div>
                <select 
                    className="w-full bg-[#D8CFC7]/10 border border-text-primary/10 rounded-xl p-6 text-xl font-serif italic outline-none focus:border-brand-primary transition-all appearance-none cursor-pointer"
                    value={formData.dialect}
                    onChange={(e) => setFormData({...formData, dialect: e.target.value})}
                >
                    <option value="" disabled>Select dialect</option>
                    <option value="oyo">Òyó (Standard)</option>
                    <option value="ijebu">Ìjẹ̀bú</option>
                    <option value="egba">Ẹ̀gbá</option>
                    <option value="ekiti">Èkìtì</option>
                    <option value="ondo">Oǹdó</option>
                    <option value="ijesa">Ìjẹ̀ṣà</option>
                </select>
            </section>

            {/* SECTION 3 — CULTURAL CONTEXT (Required) */}
            <section className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                        Cultural Context
                    </label>
                    <p className="text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest italic">
                        Cultural context is required for archival preservation.
                    </p>
                </div>
                <textarea 
                    placeholder="Explain the cultural meaning, not only the linguistic definition."
                    className="w-full min-h-[200px] bg-transparent border border-text-primary/10 rounded-2xl p-8 text-xl font-serif text-text-secondary leading-relaxed outline-none focus:border-brand-primary transition-all placeholder:text-text-secondary/20 resize-none"
                    value={formData.context}
                    onChange={(e) => setFormData({...formData, context: e.target.value})}
                />
            </section>

            {/* SECTION 4 — SOURCE TYPE */}
            <section className="space-y-8">
                <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                    Source of Knowledge
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </section>

            {/* SECTION 5 — PRESERVATION REFLECTION */}
            <section className="space-y-8">
                <label className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent block">
                    Why should this be preserved?
                </label>
                <textarea 
                    placeholder="Explain why this knowledge is important for future generations."
                    className="w-full min-h-[120px] bg-bg-secondary/20 border border-text-primary/5 rounded-2xl p-6 text-lg font-serif italic text-text-secondary outline-none focus:border-brand-primary/20 transition-all resize-none"
                    value={formData.reflection}
                    onChange={(e) => setFormData({...formData, reflection: e.target.value})}
                />
            </section>

            {/* PRE-SUBMISSION NOTICE PANEL */}
            <div className="bg-[#D8CFC7]/10 border-l-4 border-brand-accent p-8 rounded-r-2xl space-y-4">
                <div className="flex items-center gap-3 text-brand-accent">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Integrity Protocol</span>
                </div>
                <div className="space-y-2 text-sm font-serif italic text-text-secondary/70 leading-relaxed">
                    <p>Your submission will undergo structured community review.</p>
                    <p>Preservation prioritizes accuracy over speed.</p>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="pt-12 flex flex-col sm:flex-row gap-6 items-center border-t border-text-primary/5">
                <Button 
                    size="lg" 
                    className={`flex-1 w-full rounded-full py-8 text-lg font-serif tracking-tight shadow-xl transition-all ${isFormValid ? "bg-brand-primary text-bg-primary hover:bg-brand-primary/90" : "bg-text-primary/10 text-text-primary/20 cursor-not-allowed"}`}
                    disabled={!isFormValid}
                >
                    Submit for Cultural Review
                </Button>
                <Button variant="outline" className="rounded-full px-12 py-8 text-xs font-bold uppercase tracking-[0.3em] border-brand-primary/10 text-brand-primary/40 hover:text-brand-primary hover:bg-brand-primary/5 transition-all">
                    <Save className="w-4 h-4 mr-2" /> Save Draft
                </Button>
            </div>

          </form>
        </PageContainer>
      </main>

      <Footer />
    </div>
  );
}
