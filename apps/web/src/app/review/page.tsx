"use client";

import React, { useState, useEffect } from "react";
import { PageContainer, Header, Footer, Divider } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, AlertTriangle, User, Calendar, BookOpen, MapPin, Loader2 } from "lucide-react";
import { Badge, YorubaText } from "@/components/ui";
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function ReviewPage() {
  const [pending, setPending] = useState<any[]>([]);
  const [dialects, setDialects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const [pendingRes, dialectsRes] = await Promise.all([
        fetch(`${apiBase}/reviews/pending`, { 
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('omoluabi_token')}` 
          } 
        }),
        fetch(`${apiBase}/dialects`)
      ]);

      if (!pendingRes.ok) throw new Error("Failed to fetch queue");
      
      const [pendingData, dialectsData] = await Promise.all([
        pendingRes.json(),
        dialectsRes.json()
      ]);

      setPending(pendingData);
      setDialects(dialectsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getDialectName = (id: string) => {
    const d = dialects.find(d => d.id === id);
    return d ? d.name : id;
  };

  const handleReview = async (contributionId: string, approved: boolean) => {
    setProcessingId(contributionId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/reviews/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('omoluabi_token')}`
        },
        body: JSON.stringify({
          contributionId,
          approved,
          comment: approved ? "Verified for cultural and tonal accuracy." : "Requires correction of tonal marks or cultural context."
        })
      });

      if (response.ok) {
        await fetchData();
      } else {
        const data = await response.json();
        alert(data.message || "Review failed");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setProcessingId(null);
    }
  };

  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-bg-primary">
          <Header />
          <PageContainer className="pt-32 text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-serif text-brand-primary">Error loading reviewer queue</h1>
              <p className="text-text-secondary opacity-60 mb-8">{error}</p>
              <Button onClick={fetchData}>Try Again</Button>
          </PageContainer>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
        <Header />

        <main className="pb-32">
          <PageContainer size="lg" className="pt-24 space-y-12">
            
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                  <Badge variant="outline" className="text-brand-accent border-brand-accent/20 hover:bg-brand-accent/5">Reviewer Authority</Badge>
                  <h1 className="text-5xl font-serif font-bold text-brand-primary tracking-tighter">
                      Review Queue
                  </h1>
                  <p className="text-xl font-serif text-text-secondary italic opacity-60">
                      Validate contributions to ensure linguistic integrity.
                  </p>
              </div>
              <div className="bg-[#D8CFC7]/10 p-6 rounded-3xl border border-text-primary/5 flex gap-12 backdrop-blur-sm">
                  <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">In Queue</p>
                      <p className="text-3xl font-serif text-brand-primary">{pending.length}</p>
                  </div>
                  <div className="text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Security</p>
                      <p className="text-[10px] font-bold text-brand-accent uppercase bg-brand-accent/10 px-2 py-1 rounded">Active Auth</p>
                  </div>
              </div>
            </header>

            <Divider className="opacity-10" />

            {isLoading ? (
              <div className="py-24 text-center space-y-4">
                  <Loader2 className="w-12 h-12 text-brand-accent animate-spin mx-auto" />
                  <p className="text-sm font-bold uppercase tracking-widest text-text-secondary/30">Syncing with Archive...</p>
              </div>
            ) : pending.length === 0 ? (
              <div className="py-32 text-center space-y-6 bg-bg-secondary/20 rounded-[3rem] border border-dashed border-text-primary/10">
                  <CheckCircle2 className="w-16 h-16 text-brand-accent/20 mx-auto" />
                  <div className="space-y-2">
                      <p className="text-3xl font-serif text-brand-primary italic">Archive is up to date.</p>
                      <p className="text-sm text-text-secondary/50 font-serif max-w-sm mx-auto">There are no pending contributions at this time. Great work keeping the cultural record clean!</p>
                  </div>
                  <Button onClick={fetchData} variant="outline" size="sm" className="rounded-full px-8 py-6 uppercase text-[10px] tracking-widest border-brand-primary/10 hover:bg-brand-primary/5">Refresh</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-12">
                {pending.map((item) => (
                  <div key={item.id} className="group bg-white/40 backdrop-blur-sm border border-text-primary/5 rounded-[2.5rem] p-10 hover:border-brand-primary/20 transition-all duration-700 shadow-sm hover:shadow-2xl hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row gap-16">
                      
                      {/* LEFT: CONTRIBUTION CONTENT */}
                      <div className="flex-1 space-y-10">
                          <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                  <Badge className="bg-brand-primary text-bg-primary px-4 py-1 tracking-widest text-[10px] rounded-full uppercase">
                                      {item.content.type}
                                  </Badge>
                                  {item.status === 'ESCALATED' && (
                                      <Badge className="bg-orange-500 text-white border-none px-4 py-1 tracking-widest text-[10px] rounded-full uppercase flex items-center">
                                          <AlertTriangle className="w-3 h-3 mr-2" /> Council Required
                                      </Badge>
                                  )}
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary/30 uppercase tracking-[0.2em]">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                              </div>
                          </div>

                          <div className="space-y-6">
                              <h2 className="text-6xl font-serif text-brand-primary leading-[1.1] tracking-tighter">
                                  <YorubaText>{item.content.title}</YorubaText>
                              </h2>
                              <div className="flex items-center gap-3 bg-brand-accent/5 self-start px-4 py-2 rounded-full border border-brand-accent/10">
                                  <MapPin className="w-4 h-4 text-brand-accent" />
                                  <span className="text-xs font-serif font-bold italic text-brand-accent uppercase tracking-widest">
                                      {getDialectName(item.content.dialectId)}
                                  </span>
                              </div>
                          </div>

                          <div className="space-y-4 bg-bg-secondary/20 p-8 rounded-[2rem] border border-text-primary/5 italic relative">
                              <div className="absolute -top-4 -left-4 w-12 h-12 bg-bg-primary rounded-full border border-text-primary/5 flex items-center justify-center">
                                  <BookOpen className="w-5 h-5 text-brand-accent/40" />
                              </div>
                              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-secondary/30 block ml-6">Cultural Context & Meaning</label>
                              <p className="text-2xl font-serif text-text-secondary leading-relaxed pl-6">
                                  "{item.content.description}"
                              </p>
                          </div>
                      </div>

                      {/* RIGHT: METRICS & DECISION */}
                      <div className="w-full lg:w-96 space-y-8">
                          <div className="p-8 bg-bg-primary/80 rounded-[2rem] border border-text-primary/5 space-y-8 shadow-inner">
                              <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40">Review Progress</span>
                                      <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest bg-brand-accent/10 px-2 py-1 rounded">
                                          {item.reviews.length}/2 Completed
                                      </span>
                                  </div>
                                  <div className="w-full bg-bg-secondary h-2.5 rounded-full overflow-hidden p-0.5 border border-text-primary/5">
                                      <div 
                                          className="h-full bg-brand-accent rounded-full transition-all duration-1000 ease-out" 
                                          style={{ width: `${Math.min(100, (item.reviews.length / 2) * 100)}%` }}
                                      />
                                  </div>
                              </div>
                              
                              <div className="flex items-center gap-4 pt-4 border-t border-text-primary/5">
                                  <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center border border-brand-primary/10">
                                      <User className="w-8 h-8 text-brand-primary/20" />
                                  </div>
                                  <div className="flex-1">
                                      <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/40 mb-1">Author's Trust Level</p>
                                      <div className="flex items-baseline gap-2">
                                          <p className="text-3xl font-serif text-brand-primary">{item.author.trustScore.toFixed(1)}</p>
                                          <Badge variant="outline" className="text-[8px] py-0 border-brand-primary/20 opacity-40">Contributor</Badge>
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="flex flex-col gap-4">
                              <Button 
                                  onClick={() => handleReview(item.id, true)}
                                  disabled={processingId === item.id}
                                  className="w-full bg-brand-primary text-bg-primary rounded-[1.5rem] py-10 flex flex-col items-center justify-center gap-3 hover:bg-brand-primary/95 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl font-serif italic text-xl group/btn"
                              >
                                  {processingId === item.id ? (
                                      <Loader2 className="w-6 h-6 animate-spin" />
                                  ) : (
                                      <>
                                          <CheckCircle2 className="w-8 h-8 group-hover/btn:scale-110 transition-transform" />
                                          <span>Approve for Archival</span>
                                      </>
                                  )}
                              </Button>
                              <Button 
                                  onClick={() => handleReview(item.id, false)}
                                  disabled={processingId === item.id}
                                  variant="outline" 
                                  className="w-full border-brand-primary/10 text-brand-primary/40 rounded-[1.5rem] py-8 flex flex-col items-center justify-center gap-2 hover:bg-brand-primary/5 hover:text-brand-primary hover:border-brand-primary/20 transition-all font-serif italic"
                              >
                                  <XCircle className="w-6 h-6" />
                                  <span>Reject Submission</span>
                              </Button>
                          </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}

          </PageContainer>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
