'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TonalInput } from '../ui/TonalInput';
import { 
  MessageSquare, 
  Send, 
  X, 
  ShieldCheck, 
  Sparkles, 
  User, 
  ChevronRight,
  Loader2,
  Clock
} from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    role: string;
    level: number;
  };
}

export function CommunityChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const data = await apiRequest('/chat?limit=50');
      // Messages come in DESC order from API (newest first). 
      // We want to show them in CHRONO order in the list.
      setMessages(data.reverse());
    } catch (err) {
      console.error('Chat fetch failed:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetchMessages().finally(() => setLoading(false));
      
      const interval = setInterval(fetchMessages, 5000); // Poll every 5s
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!newMessage.trim() || isSending) return;
    
    setIsSending(true);
    try {
      await apiRequest('/chat', {
        method: 'POST',
        body: JSON.stringify({ content: newMessage })
      });
      setNewMessage('');
      fetchMessages();
    } catch (err) {
      console.error('Send failed:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Launcher Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-10 z-[60] w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-primary/40 hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageSquare className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-brand-primary animate-bounce">
          •
        </div>
      </button>

      {/* Chat Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-brand-primary/10 backdrop-blur-sm transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Drawer */}
      <aside className={`
        fixed right-0 top-0 bottom-0 z-[110] w-full md:w-[450px] bg-white dark:bg-zinc-950 shadow-[-20px_0_60px_rgba(0,0,0,0.1)] border-l border-brand-indigo/5
        transform transition-all duration-700 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <header className="p-8 border-b border-brand-indigo/5 bg-brand-primary text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
           <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                 <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">The Intersection</span>
                 </div>
                 <h2 className="text-3xl font-serif">Guardian Encounters</h2>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
           </div>
        </header>

        {/* Message List */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
        >
          {loading ? (
             <div className="h-full flex flex-col items-center justify-center space-y-6 text-brand-indigo/20">
                <Loader2 className="w-10 h-10 animate-spin" />
                <p className="text-[10px] font-black uppercase tracking-widest">Synchronizing Archives...</p>
             </div>
          ) : messages.map((msg, idx) => (
            <div key={msg.id} className={`flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-brand-indigo/5 flex items-center justify-center text-brand-indigo/40 border border-brand-indigo/5">
                        <User className="w-4 h-4" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-brand-primary tracking-tight">
                           {msg.user.email.split('@')[0]}
                        </p>
                        <div className="flex items-center gap-2">
                           <ShieldCheck className="w-2.5 h-2.5 text-brand-gold" />
                           <span className="text-[8px] font-black uppercase tracking-widest text-brand-accent/60">Level {msg.user.level} Guardian</span>
                        </div>
                     </div>
                  </div>
                  <span className="text-[8px] font-bold text-brand-indigo/20 uppercase tracking-widest flex items-center gap-1">
                     <Clock className="w-2.5 h-2.5" />
                     {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
               </div>
               
               <div className="bg-brand-indigo/[0.03] border border-brand-indigo/5 rounded-2xl p-4 font-serif text-brand-primary leading-relaxed shadow-sm">
                  {msg.content}
               </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <footer className="p-8 border-t border-brand-indigo/5 bg-brand-cream/10 backdrop-blur-xl">
           <TonalInput 
             value={newMessage}
             onChange={setNewMessage}
             placeholder="Speak, Guardian..."
             className="mb-6"
           />
           <button 
             onClick={handleSend}
             disabled={!newMessage.trim() || isSending}
             className="w-full py-5 bg-brand-primary text-white rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-brand-gold transition-all shadow-xl shadow-brand-primary/20 group disabled:opacity-50"
           >
             {isSending ? 'Transmitting...' : 'Commit to Record'}
             <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </button>
        </footer>
      </aside>
    </>
  );
}
