import Link from "next/link";

export function SideNav() {
  return (
    <aside className="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 bg-brand-indigo">
        <Link href="/" className="font-bold text-2xl text-white tracking-tight flex items-center gap-2">
          Omoluabi
        </Link>
      </div>
      
      <nav className="flex-1 p-4 flex flex-col gap-2">
        <Link href="/learn" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-slate-100 text-brand-terracotta font-bold border-2 border-slate-200 hover:bg-slate-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> Learn
        </Link>
        <Link href="/leaderboard" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg> Leaderboard
        </Link>
        <Link href="/contribute" className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-500 font-bold hover:bg-slate-50 transition-colors mt-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg> Contribute
        </Link>
      </nav>
    </aside>
  );
}
