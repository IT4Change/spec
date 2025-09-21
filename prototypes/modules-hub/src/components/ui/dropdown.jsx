import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { cn } from '@/lib/utils';

const DropdownMenu = DropdownPrimitive.Root;
const DropdownMenuTrigger = DropdownPrimitive.Trigger;
const DropdownMenuGroup = DropdownPrimitive.Group;
const DropdownMenuPortal = DropdownPrimitive.Portal;
const DropdownMenuSub = DropdownPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownPrimitive.RadioGroup;

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 8, ...props }, ref) => (
  <DropdownPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 min-w-[12rem] overflow-hidden rounded-xl border border-slate-700 bg-slate-900/95 p-1.5 shadow-lg backdrop-blur',
      className,
    )}
    {...props}
  />
));
DropdownMenuContent.displayName = DropdownPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-slate-200 outline-none transition-colors focus:bg-primary/15 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = DropdownPrimitive.Item.displayName;

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownPrimitive.Label
    ref={ref}
    className={cn('px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400', inset && 'pl-8', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = DropdownPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownPrimitive.Separator ref={ref} className={cn('my-1 h-px bg-slate-700', className)} {...props} />
));
DropdownMenuSeparator.displayName = DropdownPrimitive.Separator.displayName;

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
};
