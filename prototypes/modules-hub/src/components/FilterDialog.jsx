import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const typeOptions = [
  { id: 'event', label: 'Veranstaltungen' },
  { id: 'project', label: 'Projekte & Gruppen' },
  { id: 'media', label: 'Medien & Stories' },
  { id: 'offer', label: 'Marktplatz & Angebote' },
  { id: 'quest', label: 'Quests & Herausforderungen' },
];

const timeframeOptions = [
  { id: 'all', label: 'Alle' },
  { id: 'today', label: 'Heute' },
  { id: 'week', label: 'Nächste Woche' },
  { id: 'upcoming', label: 'Bevorstehend' },
  { id: 'past', label: 'Vergangen' },
];

function FilterDialog({ open, onOpenChange, filters, onApply, availableTags, availableTypes = typeOptions.map((entry) => entry.id) }) {
  const [draft, setDraft] = useState(filters);

  useEffect(() => {
    setDraft(filters);
  }, [filters]);

  const toggleType = (typeId) => {
    setDraft((prev) => {
      const hasType = prev.types.includes(typeId);
      return {
        ...prev,
        types: hasType ? prev.types.filter((entry) => entry !== typeId) : [...prev.types, typeId],
      };
    });
  };

  const toggleTag = (tag) => {
    setDraft((prev) => {
      const active = prev.tags.includes(tag);
      return {
        ...prev,
        tags: active ? prev.tags.filter((item) => item !== tag) : [...prev.tags, tag],
      };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <div className="space-y-6">
          <header className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-white">Filter & Signale</h2>
            <p className="text-sm text-slate-400">Kombiniere Inhaltstypen, Zeiträume und Menschen, um deinen perfekten Überblick zu erhalten.</p>
          </header>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Inhaltstypen</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {typeOptions.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => toggleType(type.id)}
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 text-left text-sm transition hover:border-primary/40',
                    draft.types.includes(type.id) && 'border-primary/50 bg-primary/10 text-white',
                  )}
                >
                  <Checkbox checked={draft.types.includes(type.id)} />
                  {type.label}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Zeitfenster</h3>
            <div className="flex flex-wrap gap-2">
              {timeframeOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setDraft((prev) => ({ ...prev, timeframe: option.id }))}
                  className={cn(
                    'rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:text-primary',
                    draft.timeframe === option.id && 'border-primary/60 bg-primary/15 text-primary',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Umkreis</h3>
              <span className="text-xs text-slate-400">{draft.distance} km</span>
            </div>
            <Slider
              min={1}
              max={50}
              step={1}
              value={[draft.distance]}
              onValueChange={([value]) => setDraft((prev) => ({ ...prev, distance: value }))}
            />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Schlagworte</h3>
              <Label className="flex items-center gap-2 text-xs text-slate-400">
                <Checkbox
                  checked={draft.onlyWithLocation}
                  onCheckedChange={(value) => setDraft((prev) => ({ ...prev, onlyWithLocation: Boolean(value) }))}
                />
                Nur Inhalte mit Standort
              </Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 transition hover:text-primary',
                    draft.tags.includes(tag) && 'border-primary/60 bg-primary/15 text-primary',
                  )}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setDraft({ ...filters, types: availableTypes, tags: [], timeframe: 'all', distance: 15, onlyWithLocation: false });
              }}
            >
              Filter zurücksetzen
            </Button>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Abbrechen
              </Button>
              <Button
                onClick={() => {
                  onApply(draft);
                  onOpenChange(false);
                }}
              >
                Filter anwenden
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FilterDialog;
