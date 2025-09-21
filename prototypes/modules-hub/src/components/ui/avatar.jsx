import React from 'react';
import { cn } from '@/lib/utils';

function Avatar({ name, src, className }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return <img src={src} alt={name} className={cn('h-10 w-10 rounded-full object-cover', className)} />;
  }

  return (
    <div className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary', className)}>
      {initials}
    </div>
  );
}

export { Avatar };
