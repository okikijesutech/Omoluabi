import Link from "next/link";
import { BookOpen, Map, Library, PenTool, Database } from "lucide-react";

export function SideNav() {
  return (
    <aside className="w-64 border-r border-text-primary/5 bg-bg-secondary hidden md:flex flex-col font-sans">
      <div className="h-16 flex items-center px-6 border-b border-text-primary/5">
        <Link href="/" className="font-serif font-bold text-2xl text-brand-primary flex items-center gap-2">
          Ọmọlúàbí
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-8 flex flex-col gap-8">
        <div className="space-y-2">
          <Link 
            href="/learn" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-primary/10 text-brand-primary font-medium transition-colors group"
          >
            <Map className="w-5 h-5 text-brand-accent group-hover:scale-110 transition-transform" />
            Learn
          </Link>
        </div>

        <div className="space-y-2">
          <h3 className="px-3 text-[10px] font-bold tracking-[0.3em] text-text-secondary/40 uppercase mb-4">
            The Vault
          </h3>
          <Link 
            href="/explore/words" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary font-medium hover:bg-white/50 hover:text-brand-primary transition-colors"
          >
            <BookOpen className="w-4 h-4 text-brand-accent/40" />
            Vocabulary
          </Link>
          <Link 
            href="/explore/proverbs" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary font-medium hover:bg-white/50 hover:text-brand-primary transition-colors"
          >
            <Library className="w-4 h-4 text-brand-accent/40" />
            Òwe (Proverbs)
          </Link>
          <Link 
            href="/explore/dialects" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary font-medium hover:bg-white/50 hover:text-brand-primary transition-colors"
          >
            <Database className="w-4 h-4 text-brand-accent/40" />
            Dialect Explorer
          </Link>
        </div>

        <div className="mt-auto space-y-2 pb-4">
          <Link 
            href="/contribute" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary/60 font-medium hover:bg-white/50 hover:text-brand-primary transition-colors"
          >
            <PenTool className="w-4 h-4" />
            Contribute
          </Link>
        </div>
      </nav>
    </aside>
  );
}
