import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error" | "brand";
}

export function Badge({ className = "", variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-700",
    brand: "bg-orange-100 text-brand-primary",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
