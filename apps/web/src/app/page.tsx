import Link from "next/link";
import { BookOpen, Map, Library, Database, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center pt-12 pb-24 px-6 sm:px-12 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center text-center gap-12">
        <div className="space-y-6">
          <h1 className="text-5xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl font-bold">
            Learn Yorùbá <br/>
            <span className="text-emerald-700 dark:text-emerald-500">The Right Way.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            A structured, interactive learning path powered by a deep cultural preservation archive. 
            Master the tone, dialect, and context of the culture.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <Link 
            href="/learn" 
            className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-emerald-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-emerald-800 hover:shadow-md dark:bg-emerald-600 dark:hover:bg-emerald-500 group"
          >
            Start Learning
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="w-full max-w-3xl mt-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
            <span className="text-sm font-semibold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">Explore The Archive</span>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          </div>
          
          <div className="grid w-full gap-4 sm:grid-cols-3">
            <Link 
              href="/explore/words" 
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-emerald-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-emerald-700/50"
            >
              <BookOpen className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Vocabulary</span>
            </Link>

            <Link 
              href="/explore/proverbs" 
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-amber-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-amber-700/50"
            >
              <Library className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Òwe (Proverbs)</span>
            </Link>

            <Link 
              href="/explore/dialects" 
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-indigo-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-indigo-700/50"
            >
              <Database className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
              <span className="font-medium text-zinc-900 dark:text-zinc-100">Dialects</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
