import React from 'react';
import { Calendar, Filter, Grid, Map, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'feed', label: 'Feed', icon: Grid },
  { id: 'map', label: 'Karte', icon: Map },
  { id: 'calendar', label: 'Kalender', icon: Calendar },
];

function BottomNav({ view, onViewChange, onOpenFilter, onOpenComposer }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-around border-t border-slate-800/70 bg-slate-950/90 px-2 backdrop-blur md:hidden">
      {navItems.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={cn(
            'flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-medium text-slate-400 transition',
            view === id && 'bg-primary/10 text-primary',
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </button>
      ))}
      <Button
        variant="default"
        size="icon"
        className="absolute -top-6 right-4 h-14 w-14 rounded-full bg-gradient-to-r from-primary to-accent text-slate-950 shadow-2xl"
        onClick={onOpenComposer}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -top-6 left-4 h-12 w-12 rounded-full border border-slate-700 bg-slate-900/90 text-slate-200"
        onClick={onOpenFilter}
      >
        <Filter className="h-5 w-5" />
      </Button>
    </nav>
  );
}

export default BottomNav;
