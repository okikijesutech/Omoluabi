import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline" | "minimal";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      primary:
        "bg-brand-earth text-white hover:bg-brand-earth/90 focus:ring-brand-earth shadow-sm",
      secondary:
        "bg-brand-indigo text-white hover:bg-brand-indigo/90 focus:ring-brand-indigo shadow-sm",
      danger:
        "bg-error text-white hover:bg-red-600 focus:ring-error shadow-sm",
      outline:
        "border border-brand-indigo/20 bg-transparent hover:bg-brand-indigo/5 text-brand-indigo focus:ring-brand-indigo/20",
      ghost:
        "bg-transparent hover:bg-brand-indigo/5 text-brand-indigo focus:ring-brand-indigo/20",
      minimal:
        "bg-transparent text-brand-indigo/70 hover:text-brand-indigo hover:bg-brand-indigo/5 underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
      icon: "h-11 w-11",
    };

    const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild && React.isValidElement(children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child = children as React.ReactElement<any>;
      // eslint-disable-next-line react-hooks/refs
      return React.cloneElement(child, {
        ...props,
        className: `${combinedClassName} ${child.props.className || ""}`,
        ref,
      });
    }

    return (
      <button
        className={combinedClassName}
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
