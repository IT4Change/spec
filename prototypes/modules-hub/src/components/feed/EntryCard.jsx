import React from 'react';
import { CalendarClock, Heart, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, formatDistanceKm, formatRelativeTime } from '@/lib/utils';

const typeColors = {
  event: { label: 'Veranstaltung', tone: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' },
  project: { label: 'Projekt', tone: 'bg-sky-500/15 text-sky-300 border border-sky-500/30' },
  media: { label: 'Media', tone: 'bg-violet-500/15 text-violet-300 border border-violet-500/30' },
  offer: { label: 'Angebot', tone: 'bg-amber-500/15 text-amber-200 border border-amber-500/30' },
  quest: { label: 'Quest', tone: 'bg-pink-500/10 text-pink-200 border border-pink-400/30' },
};

function EntryCard({ entry, onOpen }) {
  const typeStyle = typeColors[entry.type] ?? typeColors.media;
  const startDate = new Date(entry.start);
  const dateLabel = startDate.toLocaleDateString('de-DE', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article
      className="group overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/80 shadow-xl shadow-black/20 transition hover:border-primary/40 hover:bg-slate-900"
    >
      <button type="button" className="w-full text-left" onClick={() => onOpen(entry)}>
        <div className="relative h-56 overflow-hidden">
          <img src={entry.banner} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
            <span className={cn('rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide', typeStyle.tone)}>
              {typeStyle.label}
            </span>
            {entry.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary">#{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex items-start gap-4">
            <Avatar name={entry.author.name} src={entry.author.avatar} className="h-12 w-12 shadow-lg shadow-black/40" />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-white">{entry.title}</p>
                  <p className="text-xs text-slate-400">{entry.author.name} · {formatRelativeTime(entry.updatedAt || entry.start)}</p>
                </div>
                <Button size="sm" variant="subtle" className="text-xs">Verbinden</Button>
              </div>

              <p className="mt-3 line-clamp-3 text-sm text-slate-300">{entry.excerpt}</p>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 text-xs text-slate-300 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="font-semibold text-slate-200">{entry.location?.name ?? 'Online'}</p>
                <p className="text-[11px] text-slate-400">{formatDistanceKm(entry.distance)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-primary" />
              <div>
                <p className="font-semibold text-slate-200">{dateLabel}</p>
                {entry.end && (
                  <p className="text-[11px] text-slate-400">bis {new Date(entry.end).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-slate-300"><MessageCircle className="h-4 w-4 text-primary" />{entry.stats?.comments ?? 0}</span>
                <span className="flex items-center gap-1 text-slate-300"><Heart className="h-4 w-4 text-primary" />
                  {entry.stats?.reactions?.heart ?? 0}
                </span>
                <span className="flex items-center gap-1 text-slate-300"><Sparkles className="h-4 w-4 text-primary" />
                  {entry.stats?.reactions?.sparkles ?? entry.stats?.reactions?.star ?? 0}
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">Tap für Detail & Kommentare</p>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}

export default EntryCard;
