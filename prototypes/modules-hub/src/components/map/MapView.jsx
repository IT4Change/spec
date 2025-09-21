import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Avatar } from '@/components/ui/avatar';
import { formatDistanceKm } from '@/lib/utils';
import { CalendarDays, MapPin, Pause, Play, Users } from 'lucide-react';

const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const highlightedIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [1, -34],
  className: 'drop-shadow-xl hue-rotate-90',
});

function MapView({
  entries,
  contacts,
  activeEntry,
  onOpenEntry,
  timelineValue,
  onTimelineChange,
  timeCursor,
  isPlaying,
  onTogglePlay,
}) {
  const entriesWithCoords = useMemo(
    () =>
      entries
        .filter((entry) => entry.location?.lat && entry.location?.lng)
        .filter((entry) => {
          const start = new Date(entry.start);
          const end = entry.end ? new Date(entry.end) : start;
          return start <= timeCursor && end >= timeCursor;
        }),
    [entries, timeCursor],
  );

  const bounds = useMemo(() => {
    if (entriesWithCoords.length === 0) return [51.3127, 9.4909];
    const latSum = entriesWithCoords.reduce((sum, entry) => sum + entry.location.lat, 0);
    const lngSum = entriesWithCoords.reduce((sum, entry) => sum + entry.location.lng, 0);
    return [latSum / entriesWithCoords.length, lngSum / entriesWithCoords.length];
  }, [entriesWithCoords]);

  useEffect(() => {
    L.Icon.Default.mergeOptions({ iconUrl: defaultIcon.options.iconUrl, iconRetinaUrl: defaultIcon.options.iconRetinaUrl });
  }, []);

  const timelineLabel = timeCursor.toLocaleString('de-DE', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <div className="absolute left-4 right-4 top-4 z-20 flex flex-col gap-3 sm:left-6 sm:right-6">
        <div className="flex flex-col gap-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 shadow-lg backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Timeline</p>
              <p className="text-sm font-semibold text-white">{timelineLabel}</p>
            </div>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full border-slate-700/80 bg-slate-900/90 text-slate-100"
              onClick={onTogglePlay}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          <Slider
            value={[timelineValue]}
            onValueChange={([value]) => onTimelineChange(value)}
            min={0}
            max={100}
            step={1}
          />
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Vergangen</span>
            <span>Live</span>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {entriesWithCoords.map((entry) => (
            <button
              key={entry.id}
              onClick={() => onOpenEntry(entry)}
              className="min-w-[240px] rounded-2xl border border-slate-800/70 bg-slate-900/80 p-4 text-left text-xs text-slate-300 shadow-lg transition hover:border-primary/40"
            >
              <p className="text-sm font-semibold text-white">{entry.title}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-primary/80">{entry.type}</p>
              <div className="mt-2 flex items-center gap-2 text-[11px]">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {entry.location.name}
              </div>
              <div className="mt-1 flex items-center gap-2 text-[11px]">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                {new Date(entry.start).toLocaleString('de-DE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {entry.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary">#{tag}</Badge>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <MapContainer
        center={Array.isArray(bounds) ? bounds : [bounds.lat, bounds.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {entriesWithCoords.map((entry) => (
          <Marker
            key={entry.id}
            position={[entry.location.lat, entry.location.lng]}
            eventHandlers={{ click: () => onOpenEntry(entry) }}
            icon={activeEntry?.id === entry.id ? highlightedIcon : defaultIcon}
          >
            <Popup className="rounded-xl border border-slate-800/70 bg-slate-900/90 p-2 text-slate-100">
              <div className="space-y-1 text-xs">
                <p className="text-sm font-semibold text-white">{entry.title}</p>
                <p className="text-slate-300">{entry.location.name}</p>
                <p className="text-slate-400">{formatDistanceKm(entry.distance)}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {contacts.map((contact) => (
          <Marker key={contact.id} position={[contact.lat, contact.lng]} icon={defaultIcon}>
            <Popup>
              <div className="space-y-1 text-xs">
                <p className="text-sm font-semibold text-slate-900">{contact.name}</p>
                <p className="text-slate-600">{contact.connection}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <AnimatePresence>
        {activeEntry && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none absolute right-6 top-20 z-30 hidden w-80 flex-col gap-3 md:flex"
          >
            <div className="pointer-events-auto rounded-2xl border border-primary/40 bg-slate-950/90 p-4 shadow-xl">
              <p className="text-xs uppercase tracking-wide text-primary/80">Aktiv</p>
              <p className="text-lg font-semibold text-white">{activeEntry.title}</p>
              <p className="mt-1 text-sm text-slate-400">{activeEntry.excerpt}</p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar name={activeEntry.author.name} src={activeEntry.author.avatar} className="h-10 w-10" />
                <div>
                  <p className="text-sm font-semibold text-white">{activeEntry.author.name}</p>
                  <p className="text-xs text-slate-400">{activeEntry.author.role}</p>
                </div>
              </div>
              <Button size="sm" className="mt-4 w-full rounded-full" variant="default" onClick={() => onOpenEntry(activeEntry)}>
                Detail öffnen
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-24 left-4 right-4 z-20 flex flex-wrap gap-3 md:hidden">
        <div className="flex min-w-[220px] flex-1 items-center gap-3 rounded-2xl border border-slate-800/80 bg-slate-900/90 p-4 text-xs text-slate-200 shadow-lg">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-semibold text-white">{contacts.length} Kontakte in Sichtweite</p>
            <p className="text-[11px] text-slate-400">Beweg die Karte, um weitere Orte zu entdecken</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;
