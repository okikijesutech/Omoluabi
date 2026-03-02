import Link from "next/link";

export function TopBar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-50 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-bold text-xl text-brand-primary tracking-tight">
          Omoluabi
        </Link>
      </div>

      <div className="flex items-center gap-6">
        {/* Placeholder Gamification Stats */}
        <div className="flex items-center gap-2 text-warning font-bold">
          <span className="text-xl">🔥</span> 12
        </div>
        <div className="flex items-center gap-2 text-brand-secondary font-bold">
          <span className="text-xl">💎</span> 450
        </div>
        
        {/* Profile Avatar Placeholder */}
        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-slate-300" />
      </div>
    </header>
  );
}
