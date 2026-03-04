import React from 'react';

type DialectBadgeProps = {
  dialect: string;
  region?: string;
  className?: string;
};

export function DialectBadge({ dialect, region, className = '' }: DialectBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/20 ${className}`}
      title={region ? `Region: ${region}` : 'Dialect Variation'}
    >
      <svg className="h-1.5 w-1.5 fill-amber-500" viewBox="0 0 6 6" aria-hidden="true">
        <circle cx={3} cy={3} r={3} />
      </svg>
      {dialect}
    </span>
  );
}
