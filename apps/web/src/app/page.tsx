import Link from "next/link";
import { 
  ArrowRight, 
  BookOpen, 
  Library, 
  Database,
  CheckCircle2,
  Globe2,
  ShieldCheck,
  Languages
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-cream dark:bg-zinc-950 font-sans text-brand-indigo dark:text-brand-cream">
      
      {/* 1. Hero Section */}
      <section className="flex flex-col items-center justify-center pt-24 pb-20 px-6 sm:px-12 text-center max-w-4xl mx-auto gap-8">
        <h1 className="text-5xl sm:text-6xl font-serif font-bold tracking-tight text-brand-indigo dark:text-brand-cream leading-tight">
          Learn Yorùbá with clarity, <br className="hidden sm:block" />
          depth, and <span className="text-brand-earth dark:text-brand-gold">cultural integrity.</span>
        </h1>
        <p className="text-xl sm:text-2xl text-brand-indigo/70 dark:text-brand-cream/70 font-sans max-w-3xl leading-relaxed">
          Ọmọlúàbí is a preservation-first learning platform designed to help you reconnect with your language — and pass it forward.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full justify-center max-w-md">
          <Link 
            href="/learn" 
            className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl bg-brand-indigo px-8 py-4 text-lg font-semibold text-brand-cream transition-all hover:bg-brand-indigo/90 shadow-sm dark:bg-brand-earth dark:hover:bg-brand-earth/90 group"
          >
            Begin Your Learning Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/explore/proverbs" 
            className="flex-1 inline-flex justify-center items-center gap-2 rounded-xl border-2 border-brand-indigo/10 px-8 py-4 text-lg font-semibold text-brand-indigo transition-all hover:border-brand-earth/30 hover:bg-brand-indigo/5 dark:border-zinc-800 dark:text-brand-cream dark:hover:bg-zinc-900"
          >
            Explore Proverbs
          </Link>
        </div>
      </section>

      {/* 2. Structured Learning Path Section */}
      <section className="py-24 px-6 sm:px-12 bg-white dark:bg-zinc-900/50 border-y border-brand-indigo/5 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold">The Learning Path</h2>
            <p className="text-brand-indigo/70 dark:text-brand-cream/70 text-lg">A deliberate, structured progression.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { level: "Beginner", desc: "Build strong foundations in tone, pronunciation, and everyday speech." },
              { level: "Intermediate", desc: "Expand vocabulary, grammar, and dialect awareness." },
              { level: "Advanced", desc: "Master nuance, proverbs, and layered meanings." },
              { level: "Cultural Depth", desc: "Oríkì, history, philosophy, and linguistic heritage." }
            ].map((node, i) => (
              <div key={node.level} className="flex flex-col gap-4 p-8 rounded-2xl border border-brand-indigo/10 bg-brand-cream dark:bg-zinc-900/80 dark:border-zinc-800 relative transition-transform hover:-translate-y-1 hover:shadow-md">
                <span className="text-sm font-semibold tracking-widest uppercase text-brand-earth dark:text-brand-gold">0{i+1}</span>
                <h3 className="text-2xl font-serif font-bold">{node.level}</h3>
                <p className="text-brand-indigo/70 dark:text-brand-cream/70 text-base leading-relaxed">{node.desc}</p>
                {i < 3 && <ArrowRight className="hidden md:block absolute -right-6 lg:-right-7 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-indigo/20 dark:text-zinc-600 z-10" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 & 4. Why Omoluabi Is Different & Cultural Preservation */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 space-y-8 text-left">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">Language is more than vocabulary.</h2>
            <div className="space-y-4 text-xl font-serif text-brand-indigo/80 dark:text-brand-cream/80">
              <p>It carries tone.</p>
              <p>It carries history.</p>
              <p>It carries worldview.</p>
            </div>
            <p className="text-lg leading-relaxed text-brand-indigo/70 dark:text-brand-cream/70">
              Ọmọlúàbí preserves Yorùbá in its fullness — dialects included — while guiding learners through structured paths designed for real understanding.
            </p>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-1 gap-4">
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-brand-indigo/5 dark:border-zinc-800 transition-colors hover:border-brand-earth/30 dark:hover:border-brand-gold/30">
              <CheckCircle2 className="w-6 h-6 text-brand-earth dark:text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-lg">Tonal marks preserved</h4>
                <p className="text-brand-indigo/60 dark:text-brand-cream/60 text-sm mt-1">We respect the correct orthography.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-brand-indigo/5 dark:border-zinc-800 transition-colors hover:border-brand-earth/30 dark:hover:border-brand-gold/30">
              <Languages className="w-6 h-6 text-brand-earth dark:text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-lg">Dialect variations respected</h4>
                <p className="text-brand-indigo/60 dark:text-brand-cream/60 text-sm mt-1">Moving beyond just Standard Yorùbá.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-brand-indigo/5 dark:border-zinc-800 transition-colors hover:border-brand-earth/30 dark:hover:border-brand-gold/30">
              <Library className="w-6 h-6 text-brand-earth dark:text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-lg">Cultural context included</h4>
                <p className="text-brand-indigo/60 dark:text-brand-cream/60 text-sm mt-1">Deep meanings alongside translations.</p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-brand-indigo/5 dark:border-zinc-800 transition-colors hover:border-brand-earth/30 dark:hover:border-brand-gold/30">
              <ShieldCheck className="w-6 h-6 text-brand-earth dark:text-brand-gold shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-lg">Community-validated</h4>
                <p className="text-brand-indigo/60 dark:text-brand-cream/60 text-sm mt-1">Verified by speakers and scholars.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Expansion Vision (Optional Section) */}
      <section className="py-16 px-6 bg-brand-earth/5 dark:bg-zinc-900/30 text-center border-y border-brand-indigo/5 dark:border-zinc-800">
        <div className="flex flex-col items-center justify-center gap-3 text-brand-indigo/70 dark:text-brand-cream/70">
          <Globe2 className="w-8 h-8 text-brand-earth/60 dark:text-brand-gold/60 mb-2" />
          <p className="text-base font-semibold tracking-wide uppercase">Beginning with Yorùbá. Designed for African languages.</p>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="py-12 px-6 sm:px-12 bg-white dark:bg-zinc-950 mt-auto border-t border-brand-indigo/5 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-serif font-bold text-2xl text-brand-indigo dark:text-brand-cream">
            Ọmọlúàbí
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold text-brand-indigo/60 dark:text-brand-cream/60">
            <Link href="/about" className="hover:text-brand-indigo dark:hover:text-brand-cream transition-colors">About</Link>
            <Link href="/governance" className="hover:text-brand-indigo dark:hover:text-brand-cream transition-colors">Governance</Link>
            <Link href="/contribute" className="hover:text-brand-indigo dark:hover:text-brand-cream transition-colors">Contribute</Link>
            <Link href="https://github.com/okikijesutech/Omoluabi" target="_blank" className="hover:text-brand-indigo dark:hover:text-brand-cream transition-colors">GitHub</Link>
            <Link href="/manifesto" className="hover:text-brand-indigo dark:hover:text-brand-cream transition-colors">Manifesto</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
