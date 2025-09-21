import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceKm, formatRelativeTime } from '@/lib/utils';
import { CalendarPlus, Globe, MapPin, Share2, X } from 'lucide-react';

function EntryDetail({ entry, onClose, view }) {
  return (
    <AnimatePresence>
      {entry && (
        <motion.aside
          key={entry.id}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          className="fixed inset-x-0 bottom-16 top-20 z-50 overflow-hidden rounded-t-3xl border border-slate-800/70 bg-slate-950/95 shadow-2xl shadow-black/40 backdrop-blur md:right-6 md:top-24 md:bottom-6 md:w-[420px] md:rounded-3xl"
        >
          <div className="relative h-48 overflow-hidden">
            <img src={entry.banner} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-black/20 to-transparent" />
            <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/40 md:hidden" />
            <button
              type="button"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 text-slate-200 hover:text-white"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
            <div className="flex items-start gap-4">
              <Avatar name={entry.author.name} src={entry.author.avatar} className="h-12 w-12" />
              <div className="flex-1">
                <p className="text-xs uppercase tracking-wide text-primary/70">{entry.type}</p>
                <h2 className="text-lg font-semibold text-white">{entry.title}</h2>
                <p className="text-xs text-slate-400">{entry.author.name} · {entry.author.role}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-200">{entry.description}</p>

            <div className="mt-5 grid gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{entry.location?.name ?? 'Online'} · {entry.location?.address}</span>
                {entry.distance != null && <span className="ml-auto text-slate-400">{formatDistanceKm(entry.distance)}</span>}
              </div>
              <div className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4 text-primary" />
                <span>
                  {new Date(entry.start).toLocaleString('de-DE', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Globe className="h-4 w-4 text-primary" />
                Aktualisiert {formatRelativeTime(entry.updatedAt || entry.start)}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <Badge key={tag} variant="secondary">#{tag}</Badge>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Teilnehmer:innen</p>
              <div className="mt-3 flex -space-x-3">
                {entry.participants?.map((person) => (
                  <Avatar key={person.name} name={person.name} src={person.avatar} className="h-10 w-10 border-2 border-slate-900" />
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">Quest-Level {entry.quest?.levelRequirement ?? 1} · XP {entry.quest?.xpReward ?? 120}</p>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <Button variant="default" className="w-full rounded-full" size="lg">
                In Kalender synchronisieren
              </Button>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" className="rounded-full" size="sm">
                  <Share2 className="mr-2 h-4 w-4" /> Teilen
                </Button>
                <Button variant="outline" className="rounded-full" size="sm">
                  Push aktivieren
                </Button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default EntryDetail;
