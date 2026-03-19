"use client";

import React, { useState } from "react";
import { PageContainer, Header, Divider } from "@/components/layout";
import { 
  ShieldCheck, 
  MessageSquare, 
  XCircle, 
  AlertCircle,
  Clock,
  User,
  MapPin,
  BookOpen,
  Send
} from "lucide-react";

export default function ReviewPortal() {
  const [selectedId, setSelectedId] = useState("1");
  const [comment, setComment] = useState("");

  const pendingSubmissions = [
    { id: "1", word: "Ayo", dialect: "General", date: "2 hrs ago" },
    { id: "2", word: "Ile-Ife", dialect: "Central", date: "5 hrs ago" },
    { id: "3", word: "Olodumare", dialect: "General", date: "1 day ago" },
    { id: "4", word: "Ooni", dialect: "Ìfẹ̀", date: "1 day ago" },
  ];

  const currentSubmission = {
    word: "Ayo",
    dialect: "General Yoruba",
    phonetic: "/a-yo/",
    context: "A traditional board game played with seeds. It represents communal strategy and mental dexterity in Yoruba society.",
    sourceType: "Oral Tradition (Elder Testimony)",
    reflection: "This game is more than recreation; it is how we teach our children patience and the consequences of their moves in life.",
    stewardNote: "Submitted by @omowale_88"
  };

  return (
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      
      <Header />

      <main className="h-[calc(100vh-80px)] overflow-hidden">
        <div className="flex h-full">
            
            {/* LEFT — PENDING SUBMISSIONS LIST */}
            <aside className="w-80 border-r border-text-primary/5 bg-white overflow-y-auto">
                <div className="p-8 space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Pending Review</h2>
                        <p className="text-sm font-serif italic text-text-secondary/40">{pendingSubmissions.length} entries awaiting validation</p>
                    </div>
                    
                    <div className="space-y-4">
                        {pendingSubmissions.map((sub) => (
                            <button 
                                key={sub.id}
                                onClick={() => setSelectedId(sub.id)}
                                className={`w-full text-left p-6 rounded-2xl transition-all border ${selectedId === sub.id ? "bg-bg-secondary/30 border-brand-primary/20" : "border-transparent hover:bg-bg-secondary/10"}`}
                            >
                                <p className="text-xl font-serif font-bold text-brand-primary">{sub.word}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/40">{sub.dialect}</span>
                                    <span className="text-[9px] text-text-secondary/20 flex items-center gap-1"><Clock className="w-2 h-2" /> {sub.date}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </aside>

            {/* RIGHT — SUBMISSION DETAIL VIEW */}
            <section className="flex-1 overflow-y-auto bg-bg-secondary/5">
                <PageContainer size="archive" className="py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        
                        {/* DETAIL CONTENT */}
                        <div className="lg:col-span-8 space-y-12">
                            <header className="space-y-6">
                                <h1 className="text-6xl font-serif font-bold text-brand-primary tracking-tighter">{currentSubmission.word}</h1>
                                <div className="flex gap-8">
                                    <DetailBadge icon={MapPin} label={currentSubmission.dialect} />
                                    <DetailBadge icon={BookOpen} label={currentSubmission.sourceType} />
                                </div>
                            </header>

                            <Divider className="opacity-10" />

                            <div className="space-y-12">
                                <ContentSection title="Cultural Context" content={currentSubmission.context} />
                                <ContentSection title="Preservation Reflection" content={currentSubmission.reflection} italic />
                            </div>
                        </div>

                        {/* DECISION PANEL */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white p-8 rounded-3xl border border-text-primary/5 shadow-xl shadow-brand-primary/5 space-y-8 sticky top-8">
                                <div className="space-y-2">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">Steward Decision</h3>
                                    <p className="text-[9px] font-bold text-text-secondary/30 uppercase tracking-widest">Action requires justification</p>
                                </div>

                                <textarea 
                                    className="w-full h-32 p-4 bg-bg-secondary/20 border border-text-primary/5 rounded-xl text-sm font-serif italic outline-none focus:border-brand-primary/20 transition-all resize-none"
                                    placeholder="Add required comment for this decision..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />

                                <div className="space-y-3">
                                    <DecisionButton icon={ShieldCheck} label="Approve Entry" color="text-[#2F5D50] hover:bg-[#2F5D50]/5" />
                                    <DecisionButton icon={MessageSquare} label="Clarify Details" color="text-brand-accent hover:bg-brand-accent/5" />
                                    <DecisionButton icon={AlertCircle} label="Escalate" color="text-[#4B2E2B] hover:bg-[#4B2E2B]/5" />
                                    <DecisionButton icon={XCircle} label="Reject" color="text-red-900 hover:bg-red-50" />
                                </div>

                                <Divider className="opacity-10" />

                                <div className="flex items-center gap-3 py-2">
                                    <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                                        <User className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-bold uppercase tracking-widest text-text-secondary/40">Your Review Weight</p>
                                        <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Steward Tier</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </PageContainer>
            </section>

        </div>
      </main>

    </div>
  );
}

function DetailBadge({ icon: Icon, label }: { icon: React.ElementType, label: string }) {
    return (
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">
            <Icon className="w-3 h-3" />
            {label}
        </div>
    )
}

function ContentSection({ title, content, italic }: { title: string, content: string, italic?: boolean }) {
    return (
        <div className="space-y-4">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-accent">{title}</h2>
            <p className={`text-xl font-serif text-text-secondary leading-relaxed ${italic ? "italic opacity-70" : ""}`}>
                {content}
            </p>
        </div>
    )
}

function DecisionButton({ icon: Icon, label, color }: { icon: React.ElementType, label: string, color: string }) {
    return (
        <button className={`w-full flex items-center justify-between p-4 rounded-xl border border-text-primary/5 transition-all group ${color}`}>
            <div className="flex items-center gap-4">
                <Icon className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-all" />
                <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
            </div>
            <Send className="w-3 h-3 opacity-0 group-hover:opacity-20 transition-all" />
        </button>
    )
}
