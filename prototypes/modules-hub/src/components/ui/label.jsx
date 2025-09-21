import * as LabelPrimitive from '@radix-ui/react-label';
import React from 'react';
import { cn } from '@/lib/utils';

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn('text-sm font-medium text-slate-200', className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
