import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "steward" | "guardian";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-700",
    steward: "bg-brand-earth/10 text-brand-earth border border-brand-earth/20",
    guardian: "bg-brand-indigo text-brand-gold border border-brand-gold/30",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
