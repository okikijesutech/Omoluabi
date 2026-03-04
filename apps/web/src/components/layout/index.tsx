import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * PageContainer - Standardized max-width wrapper
 * - 720px for focused content (Contribution, Lesson)
 * - 1024px for broader layouts (Home, Governance)
 */
export function PageContainer({ 
  children, 
  className = "", 
  size = "md" 
}: LayoutProps & { size?: "sm" | "md" | "lg" | "xl" }) {
  const sizes = {
    sm: "max-w-2xl", // 672px
    md: "max-w-[760px]", // Focused reading/forms
    lg: "max-w-5xl", // 1024px (Dashboard/Home)
    xl: "max-w-7xl", // 1280px
  };

  return (
    <div className={`mx-auto px-6 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Section - Vertical spacing controller using the 8px grid
 */
export function Section({ 
  children, 
  className = "", 
  spacing = "md",
  as: Component = "section" 
}: LayoutProps & { spacing?: "xs" | "sm" | "md" | "lg" | "xl" | "none" }) {
  const spacings = {
    none: "py-0",
    xs: "py-space-2",  // 16px
    sm: "py-space-4",  // 32px
    md: "py-space-8",  // 64px
    lg: "py-space-10", // 80px
    xl: "py-space-[120px]", // Custom
  };

  return (
    <Component className={`${spacings[spacing]} ${className}`}>
      {children}
    </Component>
  );
}

/**
 * Divider - Subtle horizontal separation
 */
export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-t border-text-primary/10 ${className}`} />;
}
