import * as React from "react";

export type LessonNodeStatus = "completed" | "active" | "locked";

interface LessonNodeProps {
  id: string;
  title: string;
  status: LessonNodeStatus;
  index: number; // Used to calculate alternating horizontal offset
  onClick?: () => void;
}

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

export function LessonNode({ id, title, status, index, onClick }: LessonNodeProps) {
  // Alternate left/right offset for the path
  const offsetClass = index % 2 === 0 ? "ml-[-60px]" : "ml-[60px]";

  const statusStyles = {
    completed: "bg-brand-terracotta text-white border-brand-terracotta shadow-[0_6px_0_#9c3110] hover:-translate-y-1 hover:shadow-[0_8px_0_#b33812] cursor-pointer", // Terracotta
    active: "bg-brand-gold text-brand-indigo border-brand-gold shadow-[0_6px_0_#c49421] hover:-translate-y-1 hover:shadow-[0_8px_0_#dca626] ring-4 ring-yellow-100 cursor-pointer", // Mustard Gold
    locked: "bg-brand-eggshell text-slate-400 border-slate-300 shadow-[0_6px_0_#cbd5e1] cursor-not-allowed", // Eggshell
  };

  return (
    <div className={`flex flex-col items-center mb-8 relative z-10 ${offsetClass}`}>
      <div className="absolute -top-6 text-sm font-bold text-slate-500 mb-2 truncate max-w-[120px]">
        {title}
      </div>
      
      <button
        onClick={status !== "locked" ? onClick : undefined}
        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${statusStyles[status]}`}
        disabled={status === "locked"}
      >
        {status === "completed" && <CheckIcon />}
        {status === "active" && <StarIcon />}
        {status === "locked" && <LockIcon />}
      </button>

      {/* Connection Line to next node (handled by parent usually, but this is a simplified version) */}
      <div className="w-4 h-12 bg-slate-200 -z-10 absolute -bottom-10" />
    </div>
  );
}
