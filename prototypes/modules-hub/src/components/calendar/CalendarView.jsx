import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarRange, Clock, MapPin } from 'lucide-react';
import { formatDistanceKm } from '@/lib/utils';

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay() === 0 ? 7 : d.getDay();
  d.setDate(d.getDate() - (day - 1));
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, amount) {
  const d = new Date(date);
  d.setDate(d.getDate() + amount);
  return d;
}

function formatDayLabel(date) {
  return date.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' });
}

function eventMatchesDay(event, day) {
  const start = new Date(event.start);
  const end = event.end ? new Date(event.end) : start;
  return start <= day && end >= day;
}

const viewModes = [
  { id: 'month', label: 'Monat' },
  { id: 'week', label: 'Woche' },
  { id: 'list', label: 'Liste' },
];

function CalendarView({ entries, onOpenEntry }) {
  const [mode, setMode] = useState('month');
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const monthMatrix = useMemo(() => {
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const start = startOfWeek(firstOfMonth);
    const matrix = [];
    let current = new Date(start);
    for (let week = 0; week < 6; week += 1) {
      const row = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
        row.push(new Date(current));
        current = addDays(current, 1);
      }
      matrix.push(row);
    }
    return matrix;
  }, [today]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(today);
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [today]);

  const chronological = useMemo(() => {
    return [...entries]
      .filter((entry) => entry.type === 'event' || entry.type === 'quest')
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [entries]);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-800/60 bg-slate-900/50 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Planung & Kalender</h2>
          <p className="text-sm text-slate-400">Synchronisere deine Veranstaltungen, Quests und Erinnerungen</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {viewModes.map(({ id, label }) => (
            <Button
              key={id}
              variant={mode === id ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
              onClick={() => setMode(id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
        {mode === 'month' && (
          <div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 shadow-xl">
            <div className="grid grid-cols-7 gap-3 text-xs uppercase tracking-wide text-slate-400">
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((label) => (
                <div key={label} className="text-center">
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-7 gap-3 text-sm">
              {monthMatrix.flat().map((day, index) => {
                const dayEvents = entries.filter((entry) => eventMatchesDay(entry, day));
                const isToday = day.toDateString() === today.toDateString();
                const isCurrentMonth = day.getMonth() === today.getMonth();
                return (
                  <button
                    key={`${day.toISOString()}-${index}`}
                    onClick={() => dayEvents[0] && onOpenEntry(dayEvents[0])}
                    className={`flex min-h-[110px] flex-col rounded-2xl border px-3 py-2 text-left transition ${
                      isToday ? 'border-primary/60 bg-primary/10' : 'border-slate-800/70 bg-slate-900/60'
                    } ${isCurrentMonth ? 'text-slate-200' : 'text-slate-500'}`}
                    type="button"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold ${isToday ? 'text-primary' : ''}`}>{day.getDate()}</span>
                      {dayEvents.length > 0 && <Badge variant="secondary">{dayEvents.length} Einträge</Badge>}
                    </div>
                    <div className="mt-2 flex flex-col gap-1 text-xs text-slate-300">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div key={event.id} className="rounded-xl border border-slate-800/60 bg-slate-900/80 px-2 py-1">
                          <p className="font-semibold text-slate-100">{event.title}</p>
                          <p className="text-[11px] text-slate-400">
                            {new Date(event.start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {mode === 'week' && (
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Diese Woche</h3>
              <p className="text-sm text-slate-400">{formatDayLabel(weekDays[0])} – {formatDayLabel(weekDays[6])}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
              {weekDays.map((day) => {
                const dayEvents = entries.filter((entry) => eventMatchesDay(entry, day));
                return (
                  <div key={day.toISOString()} className="flex min-h-[160px] flex-col rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{day.toLocaleDateString('de-DE', { weekday: 'short' })}</p>
                    <p className="text-base font-semibold text-white">{day.getDate()}.</p>
                    <div className="mt-2 flex flex-1 flex-col gap-2 text-xs text-slate-300">
                      {dayEvents.map((event) => (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => onOpenEntry(event)}
                          className="rounded-2xl border border-primary/30 bg-primary/10 p-3 text-left transition hover:border-primary/60"
                        >
                          <p className="text-sm font-semibold text-white">{event.title}</p>
                          <p className="mt-1 text-[11px] text-slate-200">{event.location?.name ?? 'Online'}</p>
                          <p className="text-[11px] text-primary/90">
                            {new Date(event.start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </button>
                      ))}
                      {dayEvents.length === 0 && <p className="text-[11px] text-slate-500">Keine Einträge</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {mode === 'list' && (
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
            {chronological.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => onOpenEntry(event)}
                className="flex flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/70 p-5 text-left text-sm text-slate-200 transition hover:border-primary/40"
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-primary/80">
                  <CalendarRange className="h-4 w-4" />
                  {new Date(event.start).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long' })}
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">{event.title}</p>
                    <p className="text-sm text-slate-400">{event.excerpt}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-xs text-slate-300">
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />
                      {new Date(event.start).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                      {event.end && (
                        <>
                          <span className="mx-1 text-slate-500">–</span>
                          {new Date(event.end).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
                        </>
                      )}
                    </span>
                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{event.location?.name ?? 'Online'} · {formatDistanceKm(event.distance)}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">#{tag}</Badge>
                  ))}
                </div>
              </button>
            ))}
            {chronological.length === 0 && (
              <div className="rounded-3xl border border-slate-800/60 bg-slate-900/60 p-12 text-center text-slate-400">
                Keine Termine gefunden.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarView;
