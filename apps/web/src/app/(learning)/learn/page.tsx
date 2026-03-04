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
    <div className="flex flex-col items-center pt-12 pb-24 px-6 sm:px-12 bg-brand-cream dark:bg-zinc-950 font-sans min-h-screen">
      <div className="w-full max-w-3xl space-y-12">
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif tracking-tight text-brand-indigo dark:text-brand-cream font-bold">
            The Learning Path
          </h1>
          <p className="text-lg text-brand-indigo/70 dark:text-brand-cream/70">
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
                    ? "bg-white border-brand-earth shadow-md ring-1 ring-brand-earth/20 dark:bg-zinc-900 dark:border-brand-gold/50" 
                    : isCompleted
                      ? "bg-brand-indigo/5 border-brand-earth/30 dark:bg-zinc-900/30 dark:border-brand-gold/30"
                      : "bg-brand-indigo/5 border-zinc-200 opacity-70 dark:bg-zinc-900/30 dark:border-zinc-800"
                }`}
              >
                {/* Connecting Line (except for last item) */}
                {index < learningPath.length - 1 && (
                  <div className={`absolute top-24 bottom-[-1.5rem] left-10 md:left-12 w-0.5 ${
                      isCompleted ? "bg-brand-earth/40 dark:bg-brand-gold/40" : "bg-zinc-200 dark:bg-zinc-800"
                    }`} 
                  />
                )}

                <div className="relative z-10 flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <div className="rounded-full bg-brand-earth/10 p-1 text-brand-earth dark:bg-brand-gold/20 dark:text-brand-gold">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                  ) : isActive ? (
                    <div className="rounded-full bg-brand-earth/10 p-1 text-brand-earth dark:bg-brand-gold/20 dark:text-brand-gold ring-4 ring-brand-earth/5 dark:ring-brand-gold/10">
                      <Circle className="w-6 h-6 fill-brand-earth stroke-brand-earth dark:fill-brand-gold dark:stroke-brand-gold" />
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
                      isActive || isCompleted ? "text-brand-earth dark:text-brand-gold" : "text-zinc-500 dark:text-zinc-400"
                    }`}>
                      {module.level} • {module.lessons} Lessons
                    </span>
                  </div>
                  
                  <h3 className={`text-2xl font-serif font-bold ${
                    isLocked ? "text-zinc-500 dark:text-zinc-400" : "text-brand-indigo dark:text-brand-cream"
                  }`}>
                    {module.title}
                  </h3>
                  
                  <p className={`text-base leading-relaxed ${
                    isLocked ? "text-zinc-500 dark:text-zinc-500" : "text-brand-indigo/70 dark:text-brand-cream/70"
                  }`}>
                    {module.description}
                  </p>

                  {isActive && (
                    <button className="mt-4 self-start rounded-lg bg-brand-indigo px-6 py-2.5 text-sm font-semibold text-brand-cream transition-all hover:bg-brand-indigo/90 dark:bg-brand-gold dark:text-zinc-900 dark:hover:bg-brand-gold/90">
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
