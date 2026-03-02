import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    const variants = {
      primary:
        "bg-brand-primary text-white hover:bg-orange-600 focus:ring-brand-primary shadow-sm shadow-orange-200 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1",
      secondary:
        "bg-brand-secondary text-white hover:bg-sky-600 focus:ring-brand-secondary shadow-sm shadow-sky-200 border-b-4 border-sky-700 active:border-b-0 active:translate-y-1",
      danger:
        "bg-error text-white hover:bg-red-600 focus:ring-error shadow-sm shadow-red-200 border-b-4 border-red-700 active:border-b-0 active:translate-y-1",
      outline:
        "border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 focus:ring-slate-200 border-b-4 active:border-b-2 active:translate-y-0.5",
      ghost:
        "bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-200",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      icon: "h-11 w-11",
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
