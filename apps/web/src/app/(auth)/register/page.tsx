"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, Loader2, ArrowRight, Mail, Lock, UserCircle, Sparkles, Map } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('LEARNER');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Registration failed');
      }

      const data = await res.json();
      login(data.access_token, data.user);
      router.push('/profile');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] relative overflow-hidden p-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-indigo/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold/10 via-brand-indigo/10 to-brand-gold/10 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        
        <div className="relative bg-white dark:bg-zinc-950 rounded-[2.5rem] p-10 shadow-2xl border border-brand-indigo/5">
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Link href="/" className="inline-block p-4 bg-brand-indigo/5 rounded-2xl relative z-10 transition-transform hover:scale-105 active:scale-95">
                  <Shield className="w-10 h-10 text-brand-indigo" />
                </Link>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-brand-indigo rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Map className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="space-y-1">
                <h1 className="text-4xl font-serif text-brand-indigo dark:text-brand-cream tracking-tight">Begin Journey</h1>
                <p className="text-[10px] text-brand-indigo/40 uppercase tracking-[0.3em] font-black">New Guardian Registration</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 text-xs font-medium p-4 rounded-2xl border border-red-100 animate-in fade-in zoom-in-95">
                  {error}
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 ml-2">Choose Your Path</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('LEARNER')}
                      className={`relative group/role py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        role === 'LEARNER' 
                          ? 'bg-brand-indigo text-white border-brand-indigo shadow-lg shadow-brand-indigo/20' 
                          : 'bg-brand-indigo/[0.03] text-brand-indigo/40 border-transparent hover:border-brand-indigo/10'
                      }`}
                    >
                      Learner
                      {role === 'LEARNER' && <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-brand-gold animate-pulse" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('CONTRIBUTOR')}
                      className={`relative group/role py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                        role === 'CONTRIBUTOR' 
                          ? 'bg-brand-indigo text-white border-brand-indigo shadow-lg shadow-brand-indigo/20' 
                          : 'bg-brand-indigo/[0.03] text-brand-indigo/40 border-transparent hover:border-brand-indigo/10'
                      }`}
                    >
                      Contributor
                      {role === 'CONTRIBUTOR' && <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-brand-gold animate-pulse" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 ml-2">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-indigo/20 group-focus-within:text-brand-indigo transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-14 pr-6 py-5 bg-brand-indigo/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-indigo/10 rounded-2xl outline-none transition-all text-brand-indigo font-medium placeholder:text-brand-indigo/20"
                      placeholder="you@heritage.org"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 ml-2">Create Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-indigo/20 group-focus-within:text-brand-indigo transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-14 pr-6 py-5 bg-brand-indigo/[0.03] focus:bg-white border-2 border-transparent focus:border-brand-indigo/10 rounded-2xl outline-none transition-all text-brand-indigo font-medium placeholder:text-brand-indigo/20"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group/btn overflow-hidden rounded-2xl py-5 bg-brand-indigo text-white font-bold transition-all hover:shadow-[0_20px_50px_rgba(45,39,121,0.3)] disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-indigo via-brand-indigo to-brand-gold/60 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <span className="tracking-widest uppercase text-xs">Join Collective</span>
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            <div className="pt-4 text-center">
              <p className="text-sm text-brand-indigo/40 font-medium">
                Already a guardian?{' '}
                <Link href="/login" className="text-brand-gold font-bold hover:text-brand-gold/80 transition-colors ml-1">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
