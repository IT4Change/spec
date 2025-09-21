import React from 'react';
import { Menu, Filter, Plus, Bell, Grid, Map, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const viewItems = [
  { id: 'feed', label: 'Feed', icon: Grid },
  { id: 'map', label: 'Karte', icon: Map },
  { id: 'calendar', label: 'Kalender', icon: Calendar },
];

function TopNav({ view, onViewChange, onToggleSidebar, isSidebarOpen, onOpenFilter, onOpenComposer, onToggleSearch, user }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-slate-800/80 bg-slate-950/75 px-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-200 hover:bg-slate-800 md:hidden"
          onClick={() => onToggleSidebar(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-lg font-bold text-primary">
            sp
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Spektrum</p>
            <p className="text-xs text-slate-400">Netzwerk Navigator</p>
          </div>
        </div>
      </div>

      <nav className="ml-6 hidden md:flex items-center gap-2 rounded-full border border-slate-800/70 bg-slate-900/60 px-2 py-1.5">
        {viewItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={cn(
              'flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-slate-300 transition',
              view === id && 'bg-primary/20 text-primary',
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-200 hover:text-primary"
          onClick={onToggleSearch}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-200 hover:text-primary"
          onClick={onOpenFilter}
        >
          <Filter className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:inline-flex rounded-full border border-slate-700/70 bg-slate-900/80 text-slate-200 hover:text-primary"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Button
          onClick={onOpenComposer}
          variant="default"
          size="sm"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 text-sm font-semibold text-slate-950 shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          Beitrag erstellen
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full border border-slate-700/70 bg-slate-900/70 px-2 py-1 pr-3 text-left text-slate-200 transition hover:border-primary/60">
              <Avatar name={user.name} src={user.avatar} className="h-9 w-9" />
              <span className="hidden text-sm font-semibold sm:inline">{user.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Einstellungen</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default TopNav;
