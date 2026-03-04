import Link from "next/link";
import { BookOpen, Map, Library, PenTool, Database } from "lucide-react";

export function SideNav() {
  return (
    <aside className="w-64 border-r border-zinc-200 bg-white hidden md:flex flex-col dark:bg-zinc-950 dark:border-zinc-800 font-sans">
      <div className="h-16 flex items-center px-6 border-b border-zinc-100 dark:border-zinc-800">
        <Link href="/" className="font-serif font-bold text-xl tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          Ọmọlúàbí
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-8 flex flex-col gap-8">
        <div className="space-y-2">
          <Link 
            href="/learn" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-emerald-50 text-emerald-800 font-medium transition-colors dark:bg-emerald-900/30 dark:text-emerald-400 group"
          >
            <Map className="w-5 h-5 text-emerald-600 dark:text-emerald-500 group-hover:scale-110 transition-transform" />
            Learn
          </Link>
        </div>

        <div className="space-y-2">
          <h3 className="px-3 text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400 mb-2">
            The Vault
          </h3>
          <Link 
            href="/explore/words" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            <BookOpen className="w-4 h-4" />
            Vocabulary
          </Link>
          <Link 
            href="/explore/proverbs" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            <Library className="w-4 h-4" />
            Òwe (Proverbs)
          </Link>
          <Link 
            href="/explore/dialects" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-600 font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
          >
            <Database className="w-4 h-4" />
            Dialect Explorer
          </Link>
        </div>

        <div className="mt-auto space-y-2 pb-4">
          <Link 
            href="/contribute" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-500 font-medium hover:bg-zinc-50 hover:text-zinc-900 transition-colors dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
          >
            <PenTool className="w-4 h-4" />
            Contribute
          </Link>
        </div>
      </nav>
    </aside>
  );
}
