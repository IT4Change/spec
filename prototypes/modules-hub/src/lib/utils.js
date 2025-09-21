import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDistanceKm(km) {
  if (km == null) return '–';
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

export function formatRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);
  const diff = (target.getTime() - now.getTime()) / 1000;
  const abs = Math.abs(diff);

  const units = [
    { label: 'Jahren', seconds: 3600 * 24 * 365 },
    { label: 'Monaten', seconds: 3600 * 24 * 30 },
    { label: 'Wochen', seconds: 3600 * 24 * 7 },
    { label: 'Tagen', seconds: 3600 * 24 },
    { label: 'Stunden', seconds: 3600 },
    { label: 'Minuten', seconds: 60 },
  ];

  for (const unit of units) {
    if (abs >= unit.seconds) {
      const value = Math.round(abs / unit.seconds);
      const prefix = diff >= 0 ? 'in' : 'vor';
      return `${prefix} ${value} ${unit.label}`;
    }
  }

  return diff >= 0 ? 'gleich' : 'soeben';
}

export function isEntryActiveInRange(entry, range) {
  if (!range || range === 'all') return true;
  const now = new Date();
  const start = new Date(entry.start);
  const end = entry.end ? new Date(entry.end) : start;

  switch (range) {
    case 'today':
      return start.toDateString() === now.toDateString();
    case 'week': {
      const limit = new Date(now);
      limit.setDate(now.getDate() + 7);
      return start <= limit && end >= now;
    }
    case 'upcoming':
      return end >= now;
    case 'past':
      return end < now;
    default:
      return true;
  }
}

export function sortEntries(entries, mode) {
  const sorted = [...entries];
  switch (mode) {
    case 'distance':
      return sorted.sort((a, b) => (a.distance ?? Number.POSITIVE_INFINITY) - (b.distance ?? Number.POSITIVE_INFINITY));
    case 'network':
      return sorted.sort((a, b) => (a.networkDistance ?? Number.POSITIVE_INFINITY) - (b.networkDistance ?? Number.POSITIVE_INFINITY));
    case 'recent':
    default:
      return sorted.sort((a, b) => new Date(b.updatedAt || b.start) - new Date(a.updatedAt || a.start));
  }
}
