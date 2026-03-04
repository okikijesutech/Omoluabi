import { CheckCircle2, Circle, Lock } from "lucide-react";

export default function LearnPage() {
  const learningPath = [
    {
      id: "beginner-1",
      level: "Beginner",
      title: "Foundational Vocabulary & Greetings",
      description: "Master the essential words and respectful greetings that form the bedrock of Yorùbá culture.",
      status: "completed",
      lessons: 4
    },
    {
      id: "beginner-2",
      level: "Beginner",
      title: "Family Structure & Pronouns",
      description: "Understand the deep relational ties within the family unit and how to address elders properly.",
      status: "active",
      lessons: 5
    },
    {
      id: "intermediate-1",
      level: "Intermediate",
      title: "Introduction to Òwe (Proverbs)",
      description: "Begin exploring the horses of speech. Learn how to decode and apply foundational proverbs.",
      status: "locked",
      lessons: 6
    },
    {
      id: "intermediate-2",
      level: "Intermediate",
      title: "Dialectical Variations",
      description: "Move beyond Standard Yorùbá and explore the rich nuances of Ìjẹ̀bú, Ẹ̀gbá, and other regional dialects.",
      status: "locked",
      lessons: 8
    }
  ];

  return (
    <div className="flex flex-col items-center pt-12 pb-24 px-6 sm:px-12 bg-zinc-50 dark:bg-zinc-950 font-sans min-h-screen">
      <div className="w-full max-w-3xl space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif tracking-tight text-zinc-900 dark:text-zinc-50 font-bold">
            The Learning Path
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            A structured progression through the Ọmọlúàbí Archive.
          </p>
        </div>

        <div className="space-y-6">
          {learningPath.map((module, index) => {
            const isCompleted = module.status === "completed";
            const isActive = module.status === "active";
            const isLocked = module.status === "locked";

            return (
              <div 
                key={module.id} 
                className={`relative flex gap-6 p-6 md:p-8 rounded-2xl border transition-all ${
                  isActive 
                    ? "bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500/20 dark:bg-zinc-900 dark:border-emerald-600" 
                    : isCompleted
                      ? "bg-zinc-100/50 border-emerald-200 dark:bg-zinc-900/30 dark:border-emerald-900/30"
                      : "bg-zinc-100/50 border-zinc-200 opacity-70 dark:bg-zinc-900/30 dark:border-zinc-800"
                }`}
              >
                {/* Connecting Line (except for last item) */}
                {index < learningPath.length - 1 && (
                  <div className={`absolute top-24 bottom-[-1.5rem] left-10 md:left-12 w-0.5 ${
                      isCompleted ? "bg-emerald-300 dark:bg-emerald-800" : "bg-zinc-200 dark:bg-zinc-800"
                    }`} 
                  />
                )}

                <div className="relative z-10 flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <div className="rounded-full bg-emerald-100 p-1 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-500">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : isActive ? (
                    <div className="rounded-full bg-emerald-50 p-1 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 ring-4 ring-emerald-50 dark:ring-emerald-900/20">
                      <Circle className="w-6 h-6 fill-emerald-500 stroke-emerald-500" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-zinc-100 p-1 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
                      <Lock className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold tracking-widest uppercase ${
                      isActive || isCompleted ? "text-emerald-700 dark:text-emerald-500" : "text-zinc-500 dark:text-zinc-400"
                    }`}>
                      {module.level} • {module.lessons} Lessons
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-serif font-bold ${
                    isLocked ? "text-zinc-500 dark:text-zinc-400" : "text-zinc-900 dark:text-zinc-50"
                  }`}>
                    {module.title}
                  </h3>
                  
                  <p className={`text-base leading-relaxed ${
                    isLocked ? "text-zinc-500 dark:text-zinc-500" : "text-zinc-600 dark:text-zinc-400"
                  }`}>
                    {module.description}
                  </p>

                  {isActive && (
                    <button className="mt-4 self-start rounded-lg bg-emerald-700 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500">
                      Continue Learning
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
