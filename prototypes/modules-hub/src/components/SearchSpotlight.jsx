import React, { useMemo } from 'react';
import { Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

function SearchSpotlight({ open, onClose, query, onQueryChange, entries, onSelectEntry }) {
  const suggestions = useMemo(() => {
    if (!query) return entries.slice(0, 5);
    return entries.filter((entry) => entry.title.toLowerCase().includes(query.toLowerCase())).slice(0, 7);
  }, [entries, query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/60 backdrop-blur">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="mt-24 w-full max-w-2xl rounded-3xl border border-slate-800/70 bg-slate-900/90 p-6 shadow-2xl"
          >
            <div className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/80 px-4 py-3">
              <Command className="h-5 w-5 text-primary" />
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Suche nach Orten, Menschen, Quests oder Tags"
                className="w-full bg-transparent text-sm text-white outline-none"
              />
            </div>
            <div className="mt-4 space-y-2 text-sm text-slate-200">
              {suggestions.map((entry) => (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => {
                    onSelectEntry(entry);
                    onClose();
                  }}
                  className="w-full rounded-2xl border border-slate-800/70 bg-slate-900/60 px-4 py-3 text-left transition hover:border-primary/50"
                >
                  <p className="text-base font-semibold text-white">{entry.title}</p>
                  <p className="text-xs text-slate-400">{entry.location?.name ?? 'Online'} · {entry.type}</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">#{tag}</Badge>
                    ))}
                  </div>
                </button>
              ))}
              {suggestions.length === 0 && <p className="rounded-2xl border border-slate-800/70 bg-slate-900/60 px-4 py-3 text-xs text-slate-400">Keine Treffer – passe Filter oder Suchbegriff an.</p>}
            </div>
            <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-wide text-slate-500">
              <span>Enter → öffnen</span>
              <button type="button" onClick={onClose} className="text-slate-300 hover:text-white">Esc</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SearchSpotlight;
