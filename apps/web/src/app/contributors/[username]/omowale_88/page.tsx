"use client";

import { PageTitle } from "@/components/typography";
import { PageContainer, Section, Header, Footer, Divider } from "@/components/layout";
import { ShieldCheck, Database, MessageSquare, History, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ContributorProfile() {
  const contributions = [
    { word: "Ọmọlúàbí", dialect: "Òyó", date: "2 days ago", type: "Approval" },
    { word: "Àṣẹ", dialect: "General", date: "1 week ago", type: "Oral Source" },
    { word: "Ooni", dialect: "Ìfẹ̀", date: "2 weeks ago", type: "Structural Fix" },
  ];

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main className="pb-32">
        
        {/* HEADER */}
        <Section spacing="lg" className="border-b border-text-primary/5 bg-bg-secondary/10">
          <PageContainer size="archive">
            <div className="flex flex-col md:flex-row gap-12 items-center text-center md:text-left pt-16">
                <div className="w-32 h-32 rounded-3xl bg-white border border-brand-accent/10 flex items-center justify-center shadow-xl shadow-brand-primary/5">
                    <div className="text-4xl font-serif font-bold text-brand-primary">O.W</div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-brand-accent">Cultural Steward</h2>
                        <PageTitle className="!text-5xl !text-brand-primary tracking-tighter">Omowale_88</PageTitle>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">
                        <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#2F5D50]" /> Steward Tier</span>
                        <span className="flex items-center gap-2"><Database className="w-4 h-4" /> 142 Contributions</span>
                        <span className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> 88 Reviews</span>
                    </div>
                </div>
            </div>
          </PageContainer>
        </Section>

        {/* STEWARDSHIP SUMMARY */}
        <Section spacing="xl">
            <PageContainer size="archive" className="grid grid-cols-1 md:grid-cols-12 gap-24">
                
                <div className="md:col-span-4 space-y-12">
                    <div className="space-y-6">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Stewardship Focus</h3>
                        <p className="text-lg font-serif italic text-text-secondary/70 leading-relaxed">
                            Specializing in Oyo oral tradition and moral philosophy records. Lead contributor for the "Values of Character" unit.
                        </p>
                    </div>
                    
                    <div className="space-y-6">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Dialects Preserved</h3>
                        <div className="flex flex-wrap gap-2">
                            <DialectTag name="Òyó" />
                            <DialectTag name="Ìfẹ̀" />
                            <DialectTag name="General" />
                        </div>
                    </div>
                </div>

                <div className="md:col-span-8 space-y-12">
                    <div className="space-y-4">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-brand-accent">Archival Record</h3>
                        <p className="text-2xl font-serif text-brand-primary italic">Validated Contributions</p>
                    </div>

                    <div className="space-y-4">
                        {contributions.map((con) => (
                            <div key={con.word} className="p-8 bg-white border border-text-primary/5 rounded-2xl group hover:border-brand-primary/20 transition-all flex justify-between items-center">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-4">
                                        <h4 className="text-2xl font-serif font-bold text-brand-primary">{con.word}</h4>
                                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#2F5D50]/60 bg-[#2F5D50]/5 px-3 py-1 rounded-full">{con.type}</span>
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Dialect: {con.dialect} • {con.date}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-brand-accent opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-6 border border-dashed border-text-primary/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] text-text-secondary/30 hover:border-brand-primary/30 hover:text-brand-primary transition-all">
                        View Complete Archival History
                    </button>
                </div>

            </PageContainer>
        </Section>

      </main>

      <Footer />
    </div>
  );
}

function DialectTag({ name }: { name: string }) {
    return (
        <span className="px-5 py-2 bg-white border border-text-primary/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-text-secondary/60">
            {name}
        </span>
    )
}
