'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  BookOpen, 
  Globe, 
  ShieldCheck, 
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ToneAssistant } from './ToneAssistant';
import { apiRequest } from '@/lib/api';
import { YorubaText } from '../ui/YorubaText';

const STEPS = [
  { id: 'seed', name: 'The Seed', description: 'Core linguistic data', icon: BookOpen },
  { id: 'roots', name: 'The Roots', description: 'Regional heritage', icon: Globe },
  { id: 'spirit', name: 'The Spirit', description: 'Cultural essence', icon: ShieldCheck },
];

export function ContributionStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [dialects, setDialects] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    type: 'WORD',
    word: '',
    dialectId: '',
    context: '',
    source: '',
    reflection: ''
  });

  const refs = {
    word: useRef<HTMLInputElement>(null),
    context: useRef<HTMLTextAreaElement>(null),
    reflection: useRef<HTMLTextAreaElement>(null),
  };

  useEffect(() => {
    apiRequest('/dialects').then(setDialects).catch(console.error);
    // Load draft if exists
    const draft = localStorage.getItem('omoluabi_contribution_draft');
    if (draft) setFormData(JSON.parse(draft));
  }, []);

  useEffect(() => {
    localStorage.setItem('omoluabi_contribution_draft', JSON.stringify(formData));
  }, [formData]);

  const handleInsert = (char: string) => {
    const field = activeField as keyof typeof refs;
    if (!field || !refs[field]?.current) return;

    const input = refs[field].current as any;
    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const val = formData[field as keyof typeof formData] as string;
    
    const newVal = val.substring(0, start) + char + val.substring(end);
    setFormData(prev => ({ ...prev, [field]: newVal }));

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + char.length, start + char.length);
    }, 0);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const isStepValid = (step: number) => {
    if (step === 0) return formData.word.length > 1;
    if (step === 1) return formData.dialectId !== '';
    if (step === 2) return formData.context.length > 5;
    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await apiRequest('/contributions/submit', {
        method: 'POST',
        body: JSON.stringify({
          type: 'CREATE',
          payload: {
            ...formData,
            title: formData.word,
            description: formData.context,
            textWithTone: formData.word
          }
        })
      });
      setSubmitStatus('success');
      localStorage.removeItem('omoluabi_contribution_draft');
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="py-20 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 ring-1 ring-emerald-500/20">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-serif text-brand-primary">Legacy Preserved</h2>
        <p className="mt-4 text-brand-earth/60 italic font-serif">
          Your contribution has been forged into the archive. +10 XP earned.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-12 px-8 py-3 bg-brand-indigo text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all"
        >
          Forge Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Stepper Progress */}
      <div className="flex items-center justify-between mb-16 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-brand-indigo/5 -translate-y-1/2 z-0" />
        {STEPS.map((step, idx) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${
              idx <= currentStep 
                ? 'bg-brand-indigo border-brand-indigo text-white shadow-lg shadow-brand-indigo/20' 
                : 'bg-white border-brand-indigo/10 text-brand-indigo/20'
            }`}>
              <step.icon className="w-5 h-5" />
            </div>
            <div className="text-center">
              <p className={`text-[10px] font-black uppercase tracking-widest ${idx <= currentStep ? 'text-brand-indigo' : 'text-brand-indigo/20'}`}>
                {step.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-12 shadow-2xl shadow-brand-indigo/5 border border-brand-indigo/5 min-h-[500px] flex flex-col">
        
        {currentStep === 0 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-2">
                <h3 className="text-3xl font-serif text-brand-primary">The Seed</h3>
                <p className="text-sm text-brand-earth/60 font-serif italic">The core linguistic unit to be preserved.</p>
             </div>

             <div className="relative pt-12">
                <label className="absolute top-0 left-0 text-[10px] font-black uppercase tracking-widest text-brand-indigo/40 italic">
                  Primary Entry
                </label>
                <input 
                   ref={refs.word}
                   value={formData.word}
                   onChange={(e) => setFormData({...formData, word: e.target.value})}
                   onFocus={() => setActiveField('word')}
                   placeholder="Enter word or proverb..."
                   className="w-full bg-transparent border-b-2 border-brand-indigo/10 focus:border-brand-indigo text-5xl font-serif text-brand-primary py-4 outline-none transition-all"
                />
                <div className="mt-4 flex items-center gap-2 text-brand-gold">
                   <Sparkles className="w-3.5 h-3.5" />
                   <span className="text-[9px] font-bold uppercase tracking-widest">Potential: +5 XP</span>
                </div>
             </div>

             {activeField === 'word' && (
                <div className="mt-8">
                   <ToneAssistant onInsert={handleInsert} activeValue={formData.word} />
                </div>
             )}
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-2">
                <h3 className="text-3xl font-serif text-brand-primary">The Roots</h3>
                <p className="text-sm text-brand-earth/60 font-serif italic">Where does this linguistic artifact belong?</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dialects.map((dialect) => (
                   <button 
                      key={dialect.id}
                      onClick={() => setFormData({...formData, dialectId: dialect.id})}
                      className={`p-6 rounded-3xl border text-left transition-all ${
                        formData.dialectId === dialect.id 
                          ? 'bg-brand-indigo border-brand-indigo text-white shadow-xl shadow-brand-indigo/10' 
                          : 'bg-brand-indigo/[0.02] border-brand-indigo/5 hover:border-brand-indigo/20 text-brand-primary/60'
                      }`}
                   >
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{dialect.region}</p>
                      <p className="text-xl font-serif">{dialect.name}</p>
                   </button>
                ))}
             </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="space-y-2">
                <h3 className="text-3xl font-serif text-brand-primary">The Spirit</h3>
                <p className="text-sm text-brand-earth/60 font-serif italic">Breathing life and context into the record.</p>
             </div>

             <div className="space-y-8">
                <div className="relative pt-8">
                   <label className="absolute top-0 left-0 text-[10px] font-black uppercase tracking-widest text-brand-indigo/40 italic">Cultural Essence</label>
                   <textarea 
                      ref={refs.context}
                      value={formData.context}
                      onChange={(e) => setFormData({...formData, context: e.target.value})}
                      onFocus={() => setActiveField('context')}
                      placeholder="What is the story or usage behind this?"
                      className="w-full bg-brand-indigo/[0.02] border border-brand-indigo/5 rounded-2xl p-6 min-h-[150px] font-serif text-brand-primary italic focus:border-brand-indigo outline-none transition-all resize-none"
                   />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-brand-indigo/40 italic">Heritage Reflection</label>
                      <textarea 
                        value={formData.reflection}
                        onChange={(e) => setFormData({...formData, reflection: e.target.value})}
                        placeholder="Why must this be preserved?"
                        className="w-full bg-brand-indigo/[0.02] border border-brand-indigo/5 rounded-2xl p-4 min-h-[100px] text-xs font-serif text-brand-primary italic focus:border-brand-indigo outline-none transition-all resize-none"
                      />
                   </div>
                   <div className="bg-brand-indigo text-white rounded-3xl p-6 relative overflow-hidden shadow-2xl shadow-brand-indigo/20 translate-y-2">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                      <h4 className="text-lg font-serif">Archival Goal</h4>
                      <p className="mt-2 text-xs text-white/60 leading-relaxed italic">
                        By providing this context, you help future generations understand not just the word, but the soul of the language.
                      </p>
                      <div className="mt-6 flex items-center gap-2 text-brand-gold">
                         <ShieldCheck className="w-4 h-4" />
                         <span className="text-[9px] font-black uppercase tracking-widest">Integrity Score +1.5</span>
                      </div>
                   </div>
                </div>
             </div>
             
             {activeField === 'context' && (
                <div className="mt-8">
                   <ToneAssistant onInsert={handleInsert} activeValue={formData.context} />
                </div>
             )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-auto pt-16 flex items-center justify-between border-t border-brand-indigo/5">
           <button 
              onClick={prevStep}
              className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-brand-indigo/60 hover:text-brand-indigo'
              }`}
           >
              <ChevronLeft className="w-4 h-4" />
              Previous
           </button>

           <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                 <p className="text-[8px] font-bold uppercase tracking-widest text-brand-indigo/40">Next Milestone</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-brand-indigo">
                    {currentStep === 2 ? 'Submit to Forge' : STEPS[currentStep + 1].name}
                 </p>
              </div>
              
              {currentStep === STEPS.length - 1 ? (
                <button 
                   onClick={handleSubmit}
                   disabled={!isStepValid(currentStep) || isSubmitting}
                   className="px-10 py-4 bg-brand-indigo text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold transition-all shadow-xl shadow-brand-indigo/20 flex items-center gap-3 group disabled:opacity-50"
                >
                   {isSubmitting ? 'Forging...' : 'Complete Forge'}
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                   onClick={nextStep}
                   disabled={!isStepValid(currentStep)}
                   className="px-10 py-4 bg-brand-indigo text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-gold transition-all shadow-xl shadow-brand-indigo/20 flex items-center gap-3 group disabled:opacity-50"
                >
                   Continue
                   <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
