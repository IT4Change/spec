import React from 'react';
import { ListChecks, MapPinned, Network, Timer } from 'lucide-react';
import EntryCard from '@/components/feed/EntryCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sortOptions = [
  { id: 'recent', label: 'Aktualität', icon: Timer },
  { id: 'distance', label: 'Entfernung', icon: MapPinned },
  { id: 'network', label: 'Netzwerk', icon: Network },
];

function FeedView({ entries, onOpenEntry, sort, onChangeSort }) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="border-b border-slate-800/60 bg-slate-900/50 px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Community Feed</h2>
            <p className="text-sm text-slate-400">Neue Beiträge, Events und Quests in deinem Umfeld</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {sortOptions.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={sort === id ? 'default' : 'outline'}
                size="sm"
                className={cn('rounded-full border border-slate-700/70 text-sm', sort === id ? 'bg-primary text-slate-950' : 'bg-slate-900/60 text-slate-200 hover:text-primary')}
                onClick={() => onChangeSort(id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Button>
            ))}
            <Button variant="ghost" size="sm" className="gap-2 text-sm text-slate-300">
              <ListChecks className="h-4 w-4" />
              Personalisierter Mix aktiv
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onOpen={onOpenEntry} />
          ))}
          {entries.length === 0 && (
            <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-12 text-center text-slate-400">
              Keine Beiträge für deine aktuelle Filterkombination.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedView;
