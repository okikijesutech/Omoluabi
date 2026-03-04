import Link from "next/link";
import { BookOpen, Map, Library, PenTool, Database } from "lucide-react";

export function SideNav() {
  return (
    <aside className="w-64 border-r border-brand-indigo/10 bg-brand-cream hidden md:flex flex-col dark:bg-zinc-950 dark:border-zinc-800 font-sans">
      <div className="h-16 flex items-center px-6 border-b border-brand-indigo/10 dark:border-zinc-800">
        <Link href="/" className="font-serif font-bold text-2xl text-brand-indigo dark:text-brand-cream flex items-center gap-2">
          Ọmọlúàbí
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-8 flex flex-col gap-8">
        <div className="space-y-2">
          <Link 
            href="/learn" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-brand-earth/10 text-brand-earth font-medium transition-colors dark:bg-brand-earth/30 dark:text-brand-gold group"
          >
            <Map className="w-5 h-5 text-brand-earth dark:text-brand-gold group-hover:scale-110 transition-transform" />
            Learn
          </Link>
        </div>

        <div className="space-y-2">
          <h3 className="px-3 text-xs font-semibold tracking-wider text-brand-indigo/60 uppercase dark:text-brand-cream/60 mb-2">
            The Vault
          </h3>
          <Link 
            href="/explore/words" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-brand-indigo/80 font-medium hover:bg-brand-indigo/5 hover:text-brand-indigo transition-colors dark:text-brand-cream/80 dark:hover:bg-zinc-900 dark:hover:text-brand-cream"
          >
            <BookOpen className="w-4 h-4" />
            Vocabulary
          </Link>
          <Link 
            href="/explore/proverbs" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-brand-indigo/80 font-medium hover:bg-brand-indigo/5 hover:text-brand-indigo transition-colors dark:text-brand-cream/80 dark:hover:bg-zinc-900 dark:hover:text-brand-cream"
          >
            <Library className="w-4 h-4" />
            Òwe (Proverbs)
          </Link>
          <Link 
            href="/explore/dialects" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-brand-indigo/80 font-medium hover:bg-brand-indigo/5 hover:text-brand-indigo transition-colors dark:text-brand-cream/80 dark:hover:bg-zinc-900 dark:hover:text-brand-cream"
          >
            <Database className="w-4 h-4" />
            Dialect Explorer
          </Link>
        </div>

        <div className="mt-auto space-y-2 pb-4">
          <Link 
            href="/contribute" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-brand-indigo/60 font-medium hover:bg-brand-indigo/5 hover:text-brand-indigo transition-colors dark:text-brand-cream/60 dark:hover:bg-zinc-900 dark:hover:text-brand-cream"
          >
            <PenTool className="w-4 h-4" />
            Contribute
          </Link>
        </div>
      </nav>
    </aside>
  );
}
