import { BookOpen, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function LearnPage() {
  const levels = [
    {
      id: "l1",
      title: "Foundation",
      description: "Basic tonal awareness and foundational structure.",
      modules: [
        { id: "m1", title: "The Three Tones", status: "completed" },
        { id: "m2", title: "Greetings & Respect", status: "active" },
        { id: "m3", title: "Family Concepts", status: "locked" }
      ]
    },
    {
      id: "l2",
      title: "Cultural Depth",
      description: "Proverbs, honorifics, and dialect introductions.",
      modules: [
        { id: "m4", title: "Intro to Òwe (Proverbs)", status: "locked" },
        { id: "m5", title: "Dialect Comparison", status: "locked" }
      ]
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-16">
        <h1 className="text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          Thematic Progression
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          A structured, philosophical approach to mastering the Yorùbá worldview.
        </p>
      </div>
      
      <div className="space-y-16 relative">
        <div className="absolute left-6 top-8 bottom-8 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />

        {levels.map((level) => (
          <section key={level.id} className="relative z-10 pl-0 sm:pl-16">
            <div className="absolute left-[-5px] top-1.5 hidden sm:block">
              <div className="h-3 w-3 rounded-full bg-emerald-600 ring-4 ring-emerald-50 dark:bg-emerald-500 dark:ring-emerald-900/50" />
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-serif text-zinc-900 dark:text-zinc-50">{level.title}</h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">{level.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {level.modules.map(module => (
                <div 
                  key={module.id} 
                  className={`flex flex-col justify-between rounded-xl border p-5 transition-all ${
                    module.status === 'completed' 
                      ? 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-900/10' 
                      : module.status === 'active'
                      ? 'border-zinc-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900'
                      : 'border-zinc-100 bg-zinc-50/50 opacity-75 grayscale dark:border-zinc-800/50 dark:bg-zinc-900/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className={`font-medium ${
                      module.status === 'locked' ? 'text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'
                    }`}>
                      {module.title}
                    </h3>
                    {module.status === 'completed' && <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-500" />}
                    {module.status === 'active' && <BookOpen className="h-5 w-5 text-zinc-400" />}
                  </div>
                  
                  {module.status !== 'locked' && (
                    <div className="mt-6 flex justify-end">
                      <button className={`text-sm font-medium ${
                        module.status === 'completed' ? 'text-emerald-700 dark:text-emerald-400' : 'text-emerald-600 dark:text-emerald-500'
                      }`}>
                        {module.status === 'completed' ? 'Review' : 'Continue'} &rarr;
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
