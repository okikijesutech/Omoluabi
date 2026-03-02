export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
      <h1 className="text-5xl font-bold tracking-tight text-slate-900">
        Learn Yoruba, <span className="text-brand-primary">Together.</span>
      </h1>
      <p className="text-xl text-slate-600 max-w-2xl">
        Omoluabi is an open, community-driven platform to learn and master the Yoruba language through gamified lessons and real-world exercises.
      </p>
      <div className="flex gap-4 mt-4">
        <a href="/learn" className="px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
          Start Learning
        </a>
        <a href="/contribute" className="px-6 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
          Become a Contributor
        </a>
      </div>
    </div>
  );
}
