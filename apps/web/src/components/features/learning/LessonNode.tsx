import * as React from "react";
import { FiCheck, FiStar, FiLock } from "react-icons/fi";

export type LessonNodeStatus = "completed" | "active" | "locked";

interface LessonNodeProps {
  id: string;
  title: string;
  status: LessonNodeStatus;
  index: number; // Used to calculate alternating horizontal offset
  onClick?: () => void;
}

export function LessonNode({ id, title, status, index, onClick }: LessonNodeProps) {
  // Alternate left/right offset for the path
  const offsetClass = index % 2 === 0 ? "ml-[-60px]" : "ml-[60px]";

  const statusStyles = {
    completed: "bg-brand-primary text-white border-brand-primary shadow-[0_6px_0_#c2410c] hover:-translate-y-1 hover:shadow-[0_8px_0_#ea580c] cursor-pointer", // Orange
    active: "bg-brand-secondary text-white border-brand-secondary shadow-[0_6px_0_#0369a1] hover:-translate-y-1 hover:shadow-[0_8px_0_#0284c7] ring-4 ring-sky-200 cursor-pointer", // Sky Blue
    locked: "bg-slate-200 text-slate-400 border-slate-300 shadow-[0_6px_0_#cbd5e1] cursor-not-allowed", // Gray
  };

  const Icon = status === "completed" ? FiCheck : status === "active" ? FiStar : FiLock;

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
        <Icon className="w-8 h-8" />
      </button>

      {/* Connection Line to next node (handled by parent usually, but this is a simplified version) */}
      <div className="w-4 h-12 bg-slate-200 -z-10 absolute -bottom-10" />
    </div>
  );
}
