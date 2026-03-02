import Link from "next/link";

export function TopBar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 text-slate-500 font-semibold md:hidden">
        <Link href="/" className="font-bold text-xl text-brand-primary tracking-tight">
          Omoluabi
        </Link>
      </div>
      <div className="hidden md:flex"></div>

      <div className="flex items-center gap-6">
        {/* Placeholder Gamification Stats */}
        <div className="flex items-center gap-2 text-warning font-bold cursor-pointer hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-colors">
          <span className="text-xl">🔥</span> 12
        </div>
        <div className="flex items-center gap-2 text-brand-secondary font-bold cursor-pointer hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-colors">
          <span className="text-xl">💎</span> 450
        </div>
        <div className="flex items-center gap-2 text-error font-bold cursor-pointer hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-colors">
          <span className="text-xl">❤️</span> 5
        </div>
        
        {/* Profile Avatar Placeholder */}
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-300 ml-2" />
      </div>
    </header>
  );
}
