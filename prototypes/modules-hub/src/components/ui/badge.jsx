import React from 'react';
import { cn } from '@/lib/utils';

function Badge({ className, variant = 'default', children }) {
  const base = 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium';
  const variants = {
    default: 'border-primary/20 bg-primary/10 text-primary',
    secondary: 'border-slate-700 bg-slate-800 text-slate-200',
    success: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
    warning: 'border-amber-500/40 bg-amber-500/10 text-amber-100',
  };
  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}

export { Badge };
