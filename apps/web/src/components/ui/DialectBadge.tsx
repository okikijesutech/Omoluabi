import React from 'react';

type DialectBadgeProps = {
  dialect: string;
  region?: string;
  className?: string;
};

export function DialectBadge({ dialect, region, className = '' }: DialectBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-brand-gold/10 px-2 py-1 text-xs font-medium text-brand-earth ring-1 ring-inset ring-brand-gold/20 dark:bg-brand-gold/10 dark:text-brand-gold dark:ring-brand-gold/20 ${className}`}
      title={region ? `Region: ${region}` : 'Dialect Variation'}
    >
      <svg className="h-1.5 w-1.5 fill-brand-gold" viewBox="0 0 6 6" aria-hidden="true">
        <circle cx={3} cy={3} r={3} />
      </svg>
      {dialect}
    </span>
  );
}
