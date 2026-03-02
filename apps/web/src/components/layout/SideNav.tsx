import Link from "next/link";
import { FiHome, FiAward, FiEdit3 } from "react-icons/fi";

export function SideNav() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-brand-primary">
        <Link href="/" className="font-bold text-2xl text-white tracking-tight flex items-center gap-2">
          Omoluabi
        </Link>
      </div>
      
      <nav className="flex-1 p-4 flex flex-col gap-2">
        <Link href="/learn" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-slate-100 text-brand-primary font-bold border-2 border-slate-200 hover:bg-slate-50 transition-colors">
          <FiHome className="w-6 h-6" /> Learn
        </Link>
        <Link href="/leaderboard" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors">
          <FiAward className="w-6 h-6" /> Leaderboard
        </Link>
        <Link href="/contribute" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors mt-8">
          <FiEdit3 className="w-6 h-6" /> Contribute
        </Link>
      </nav>
    </aside>
  );
}
