import Link from "next/link";
import { BookOpen, Map, Library, PenTool, Database } from "lucide-react";

export function SideNav() {
  return (
    <aside className="w-72 border-r border-zinc-200 bg-zinc-50 hidden md:flex flex-col dark:border-zinc-800 dark:bg-zinc-950">
      <div className="h-20 flex items-center px-8">
        <Link href="/" className="font-serif font-bold text-2xl text-zinc-900 tracking-tight flex items-center gap-3 dark:text-zinc-50">
          <Database className="w-6 h-6 text-emerald-700 dark:text-emerald-500" />
          Ọmọlúàbí Vault
        </Link>
      </div>
      
      <nav className="flex-1 px-4 py-8 flex flex-col gap-8">
        <div>
          <h3 className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 dark:text-zinc-400">Knowledge Discovery</h3>
          <div className="flex flex-col gap-1.5 mt-2">
            <Link href="/explore/words" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-200/50 hover:text-zinc-900 transition-colors dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50">
              <BookOpen className="w-4 h-4 text-zinc-400" />
              Explore Words
            </Link>
            <Link href="/explore/proverbs" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-200/50 hover:text-zinc-900 transition-colors dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50">
              <Library className="w-4 h-4 text-zinc-400" />
              Explore Proverbs
            </Link>
            <Link href="/explore/dialects" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-200/50 hover:text-zinc-900 transition-colors dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50">
              <Map className="w-4 h-4 text-zinc-400" />
              Dialect Explorer
            </Link>
          </div>
        </div>

        <div>
           <h3 className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 dark:text-zinc-400">Structured Paths</h3>
           <div className="flex flex-col gap-1.5 mt-2">
            <Link href="/learn" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-200/50 hover:text-zinc-900 transition-colors dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50">
              <Map className="w-4 h-4 text-zinc-400" />
              Thematic Progression
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800">
           <Link href="/contribute" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-200/50 hover:text-zinc-900 transition-colors dark:text-zinc-300 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50">
              <PenTool className="w-4 h-4 text-zinc-400" />
              Contribute Knowledge
            </Link>
        </div>
      </nav>
    </aside>
  );
}
