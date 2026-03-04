import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * DisplayWord - Very large type for hero words (72px+)
 */
export function DisplayWord({ children, className = "", as: Component = "h1" }: TypographyProps) {
  return (
    <Component className={`text-display sm:text-[96px] font-serif font-bold tracking-tight leading-[1.2] text-brand-primary ${className}`}>
      {children}
    </Component>
  );
}

/**
 * PageTitle - Main titles for pages (36px)
 */
export function PageTitle({ children, className = "", as: Component = "h1" }: TypographyProps) {
  return (
    <Component className={`text-h1 font-serif font-bold tracking-tight text-brand-primary ${className}`}>
      {children}
    </Component>
  );
}

/**
 * SectionTitle - Standardized serif headings (24px)
 */
export function SectionTitle({ children, className = "", as: Component = "h2" }: TypographyProps) {
  return (
    <Component className={`text-h2 font-serif font-bold tracking-tight text-brand-primary ${className}`}>
      {children}
    </Component>
  );
}

/**
 * BodyText - Archival-optimized body text (18px)
 */
export function BodyText({ children, className = "", as: Component = "p", size = "base" }: TypographyProps & { size?: "base" | "lg" }) {
  const sizes = {
    base: "text-body",
    lg: "text-body-lg",
  };
  return (
    <Component className={`${sizes[size]} leading-relaxed text-text-secondary ${className}`}>
      {children}
    </Component>
  );
}

/**
 * PullQuote - Styled blocks for proverbs or emphasis
 */
export function PullQuote({ children, className = "", author }: TypographyProps & { author?: string }) {
  return (
    <div className={`border-l-2 border-brand-accent/20 pl-6 py-2 ${className}`}>
      <blockquote className="text-xl sm:text-2xl font-serif italic text-text-secondary/80 leading-relaxed">
        {children}
      </blockquote>
      {author && (
        <cite className="block mt-4 text-sm font-semibold text-text-secondary/40 uppercase tracking-widest not-italic">
          — {author}
        </cite>
      )}
    </div>
  );
}
