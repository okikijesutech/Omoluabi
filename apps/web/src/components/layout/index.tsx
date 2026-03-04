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
}: LayoutProps & { size?: "sm" | "md" | "archive" | "lg" | "xl" }) {
  const sizes = {
    sm: "max-w-2xl", // 672px
    md: "max-w-[760px]", // Focused reading/forms
    archive: "max-w-[900px]", // Homepage & Archive Index
    lg: "max-w-5xl", // 1024px (Dashboard)
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
}: LayoutProps & { spacing?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "none" }) {
  const spacings = {
    none: "py-0",
    xs: "py-space-2",  // 16px
    sm: "py-space-4",  // 32px
    md: "py-space-8",  // 64px
    lg: "py-20",      // 80px
    xl: "py-[120px]", // Custom
    xxl: "py-[160px]", // Custom
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
export { Header } from "./Header";
export { Footer } from "./Footer";
