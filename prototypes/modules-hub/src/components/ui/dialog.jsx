import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out', className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-x-4 bottom-8 z-50 mx-auto w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-lg data-[state=open]:animate-in data-[state=closed]:animate-out sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-6 top-6 text-slate-400 transition hover:text-slate-200">
        <span className="sr-only">Schließen</span>
        ×
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription };
