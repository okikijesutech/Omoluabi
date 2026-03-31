"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Shield, Loader2, ArrowRight, Mail, Lock, UserCircle } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-brand-cream p-4">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl border border-brand-indigo/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block p-3 bg-brand-indigo/5 rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-brand-accent" />
            </Link>
            <h1 className="text-3xl font-serif text-brand-indigo tracking-tight">Join the Preservation</h1>
            <p className="text-sm text-brand-earth/60 uppercase tracking-widest font-bold">New Guardian Registration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 animate-in fade-in zoom-in-95">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 ml-1">Role Path</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole('LEARNER')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                      role === 'LEARNER' 
                        ? 'bg-brand-indigo text-white border-brand-indigo shadow-md' 
                        : 'bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 border-transparent'
                    }`}
                  >
                    Learner
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('CONTRIBUTOR')}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                      role === 'CONTRIBUTOR' 
                        ? 'bg-brand-indigo text-white border-brand-indigo shadow-md' 
                        : 'bg-brand-indigo/5 text-brand-indigo hover:bg-brand-indigo/10 border-transparent'
                    }`}
                  >
                    Contributor
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-indigo/30" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-brand-indigo/5 border border-transparent rounded-2xl outline-none focus:border-brand-accent/30 transition-all text-brand-indigo"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo/50 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-indigo/30" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-brand-indigo/5 border border-transparent rounded-2xl outline-none focus:border-brand-accent/30 transition-all text-brand-indigo"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 py-4 bg-brand-indigo text-white rounded-2xl font-bold hover:bg-brand-indigo/90 shadow-lg shadow-brand-indigo/20 transition-all disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register'}
              {!isSubmitting && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <p className="text-center text-sm text-brand-earth/60">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-accent font-bold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
