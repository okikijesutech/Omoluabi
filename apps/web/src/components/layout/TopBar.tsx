"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { User, Bell } from "lucide-react";
import NotificationDropdown from "../notifications/NotificationDropdown";

export function TopBar() {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="h-20 border-b border-brand-indigo/5 bg-white/70 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-8 shadow-sm">
      <div className="flex items-center gap-4 text-brand-primary md:hidden">
        <Link href="/" className="font-serif font-bold text-2xl tracking-tighter">
          Ọmọlúàbí
        </Link>
      </div>
      
      <div className="hidden md:flex items-center gap-4 animate-in fade-in slide-in-from-left-4 duration-700">
         <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-indigo/80 px-3 py-1 bg-brand-indigo/10 rounded-lg border border-brand-indigo/10">
           Artisan Mode
         </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Gamification Stats */}
        <div className="hidden lg:flex items-center gap-6 mr-6 h-10 px-6 bg-brand-indigo/[0.03] border border-brand-indigo/5 rounded-2xl">
           <div className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95">
             <span className="text-lg group-hover:scale-125 transition-transform">🔥</span> 
             <span className="text-xs font-black text-brand-primary">12</span>
           </div>
           <div className="w-px h-4 bg-brand-indigo/10" />
           <div className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95">
             <span className="text-lg group-hover:scale-125 transition-transform">💎</span> 
             <span className="text-xs font-black text-brand-gold">450</span>
           </div>
           <div className="w-px h-4 bg-brand-indigo/10" />
           <div className="flex items-center gap-2 group cursor-pointer transition-transform active:scale-95">
             <span className="text-lg group-hover:scale-125 transition-transform">❤️</span> 
             <span className="text-xs font-black text-red-500">5</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && <NotificationDropdown />}
          
          <Link href="/profile" className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white dark:bg-zinc-900 border border-brand-indigo/5 hover:border-brand-indigo/20 transition-all shadow-sm group">
            <div className="w-9 h-9 rounded-xl bg-brand-indigo/5 flex items-center justify-center text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white transition-all">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-indigo leading-none mb-0.5">
                {user?.email ? user.email.split('@')[0] : 'Guardian'}
              </p>
              <p className="text-[8px] font-bold uppercase tracking-widest text-brand-accent leading-none">
                {user?.level ? `Level ${user.level} Artisan` : 'Observer'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
