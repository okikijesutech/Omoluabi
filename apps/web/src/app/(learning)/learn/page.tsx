import { CheckCircle2, Circle, Lock, ArrowRight, Play } from "lucide-react";
import { PageContainer, Section, Header, Footer } from "@/components/layout";

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
    <div className="min-h-screen bg-bg-primary selection:bg-brand-accent/20">
      <Header />

      <main className="pb-24">
        {/* Archival Header */}
        <Section spacing="lg" className="border-b border-text-primary/5">
          <PageContainer size="archive">
            <header className="space-y-6 pt-16 max-w-3xl">
              <div className="flex items-center gap-3 text-brand-accent uppercase tracking-[0.4em] text-[10px] font-bold">
                <Play className="w-4 h-4 shadow-[0_0_10px_rgba(140,106,63,0.3)]" />
                Preservation Path
              </div>
              <h1 className="text-6xl font-serif text-brand-primary tracking-tighter">The Learning Path</h1>
              <p className="text-xl font-serif text-text-secondary italic leading-relaxed max-w-2xl border-l-2 border-brand-accent/10 pl-8">
                A structured progression through the Ọmọlúàbí Archive. Master the language through the lens of history and dialect.
              </p>
            </header>
          </PageContainer>
        </Section>

        {/* Path Grid */}
        <Section spacing="xl">
          <PageContainer size="archive" className="relative group">
            
            <div className="space-y-12">
              {learningPath.map((module, index) => {
                const isCompleted = module.status === "completed";
                const isActive = module.status === "active";
                const isLocked = module.status === "locked";

                return (
                  <div 
                    key={module.id} 
                    className={`relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start transition-all duration-500 ${isLocked ? 'opacity-40 grayscale' : ''}`}
                  >
                    {/* Progress Indicator Column */}
                    <div className="md:col-span-1 flex flex-col items-center pt-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 z-10 transition-all duration-700 shadow-sm ${
                            isCompleted ? 'bg-success/5 border-success/20 text-success' : 
                            isActive ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-lg shadow-brand-accent/20 animate-pulse' :
                            'bg-white border-text-primary/10 text-text-secondary/30'
                        }`}>
                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : 
                             isActive ? <Circle className="w-3 h-3 fill-brand-accent" /> :
                             <Lock className="w-5 h-5" />}
                        </div>
                        {/* Connecting Line */}
                        {index < learningPath.length - 1 && (
                            <div className={`w-px h-32 md:h-24 border-l-2 border-dashed mt-4 ${isCompleted ? 'border-success/30' : 'border-brand-accent/10'}`} />
                        )}
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-11">
                        <div className={`p-10 rounded-[32px] border transition-all duration-500 overflow-hidden relative group/card ${
                            isCompleted ? 'bg-bg-secondary/40 border-text-primary/5 hover:bg-bg-secondary/60' :
                            isActive ? 'bg-white/80 backdrop-blur-xl border-brand-accent/20 shadow-2xl shadow-brand-primary/5 ring-1 ring-brand-accent/5' :
                            'bg-white border-text-primary/5'
                        }`}>
                            {/* Decorative Corner (Active) */}
                            {isActive && (
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            )}

                            <div className="space-y-6 relative z-10">
                                <div className="flex justify-between items-center">
                                    <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${
                                        isActive || isCompleted ? "text-brand-accent" : "text-text-secondary/40"
                                    }`}>
                                        {module.level} • {module.lessons} Lessons
                                    </span>
                                    {isCompleted && (
                                        <span className="text-[10px] font-bold text-success uppercase tracking-widest bg-success/5 px-3 py-1 rounded-full border border-success/10">
                                            Archived
                                        </span>
                                    )}
                                </div>
                                
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-serif font-bold text-brand-primary">
                                        {module.title}
                                    </h3>
                                    <p className="text-lg font-serif italic text-text-secondary leading-relaxed opacity-80 max-w-2xl">
                                        {module.description}
                                    </p>
                                </div>

                                {isActive && (
                                    <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-bg-primary rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-brand-accent hover:-translate-y-1 transition-all shadow-xl shadow-brand-primary/10">
                                        Continue Path <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </PageContainer>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
