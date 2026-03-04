import Link from "next/link";
import { BookOpen, Library, Map } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center pt-24 pb-12 px-6 sm:px-12 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <main className="flex w-full max-w-4xl flex-col items-center text-center gap-12">
        <div className="space-y-6">
          <h1 className="text-5xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-7xl font-bold">
            Ọmọlúàbí Archive
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            A preservation engine that teaches through preservation. 
            Discover the profound knowledge, dialectical richness, and philosophical worldview of the Yorùbá people.
          </p>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-3 mt-8">
          <Link 
            href="/explore/words" 
            className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-emerald-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-700/50"
          >
            <div className="rounded-full bg-emerald-50 p-4 text-emerald-700 group-hover:scale-110 transition-transform dark:bg-emerald-950/30 dark:text-emerald-500">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Vocabulary</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">The foundational words of the culture.</p>
            </div>
          </Link>

          <Link 
            href="/explore/proverbs" 
            className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-amber-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-amber-700/50"
          >
            <div className="rounded-full bg-amber-50 p-4 text-amber-700 group-hover:scale-110 transition-transform dark:bg-amber-950/30 dark:text-amber-500">
              <Library className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Òwe (Proverbs)</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">The horses of speech and wisdom.</p>
            </div>
          </Link>

          <Link 
            href="/learn" 
            className="group flex flex-col items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-8 transition-all hover:border-indigo-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-700/50"
          >
            <div className="rounded-full bg-indigo-50 p-4 text-indigo-700 group-hover:scale-110 transition-transform dark:bg-indigo-950/30 dark:text-indigo-500">
              <Map className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Thematic Path</h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Structured progression of knowledge.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
