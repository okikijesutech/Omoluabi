"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BookOpen, 
  Map, 
  Library, 
  PenTool, 
  Database, 
  ShieldCheck, 
  Settings,
  ChevronRight,
  Sparkles,
  Award
} from "lucide-react";

export function SideNav() {
  const pathname = usePathname();

  const navGroups = [
    {
      label: "Explorer",
      links: [
        { name: "Journey", href: "/learn", icon: Map },
        { name: "Leaderboard", href: "/leaderboard", icon: Award },
      ]
    },
    {
      label: "The Vault",
      links: [
        { name: "Vocabulary", href: "/explore/words", icon: BookOpen },
        { name: "Proverbs", href: "/explore/proverbs", icon: Library },
        { name: "Dialects", href: "/explore/dialects", icon: Database },
      ]
    },
    {
      label: "Artisan",
      links: [
        { name: "Contribute", href: "/contribute", icon: PenTool },
        { name: "Governance", href: "/governance", icon: ShieldCheck },
      ]
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-72 border-r border-brand-indigo/5 bg-brand-cream/20 hidden md:flex flex-col font-sans h-screen sticky top-0 overflow-y-auto">
      {/* Sidebar Header */}
      <div className="h-20 flex items-center px-8 border-b border-brand-indigo/5 bg-white/50 backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-3 outline-none">
          <div className="w-8 h-8 rounded-xl bg-brand-primary text-bg-primary flex items-center justify-center font-serif text-xl font-bold shadow-lg shadow-brand-primary/20 group-hover:rotate-12 transition-transform duration-500">
            Ọ
          </div>
          <span className="font-serif font-bold text-2xl text-brand-primary tracking-tighter">Ọmọlúàbí</span>
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-10 flex flex-col gap-10">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <h3 className="px-5 text-[9px] font-black tracking-[0.4em] text-brand-indigo/60 uppercase mb-5">
              {group.label}
            </h3>
            
            <div className="space-y-1">
              {group.links.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`group flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
                    isActive(link.href)
                      ? 'bg-brand-indigo text-white shadow-xl shadow-brand-indigo/10 translate-x-1' 
                      : 'text-brand-earth/80 hover:bg-brand-indigo/5 hover:text-brand-primary'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <link.icon className={`w-4 h-4 transition-transform group-hover:scale-110 duration-500 ${
                      isActive(link.href) ? 'text-brand-gold' : 'text-brand-indigo/60'
                    }`} />
                    <span className="text-xs font-bold tracking-tight">{link.name}</span>
                  </div>
                  {isActive(link.href) ? (
                    <div className="w-1 h-1 rounded-full bg-brand-gold animate-pulse" />
                  ) : (
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Action Callout */}
        <div className="mt-auto px-4 pb-4">
           <div className="p-6 bg-brand-gold/[0.03] rounded-3xl border border-brand-gold/10 relative overflow-hidden group/card shadow-sm">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/card:opacity-10 transition-opacity">
                 <Sparkles className="w-12 h-12 text-brand-gold" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-2">Guardian Protocol</p>
              <p className="text-[10px] text-brand-earth/60 leading-relaxed font-serif italic">
                Archives expansion target: 5,000 units by Q4.
              </p>
           </div>
        </div>
      </nav>

      {/* Footer Settings */}
      <div className="p-6 border-t border-brand-indigo/5 bg-white/30 backdrop-blur-sm">
         <Link 
            href="/settings" 
            className="flex items-center gap-4 px-5 py-2.5 rounded-xl text-brand-earth/80 hover:bg-white/50 hover:text-brand-primary transition-all text-[10px] font-black uppercase tracking-widest"
         >
            <Settings className="w-4 h-4" />
            Control Registry
         </Link>
      </div>
    </aside>
  );
}
