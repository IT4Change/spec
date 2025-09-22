import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, Image, MapPin, Type, Users } from 'lucide-react';

const entryTypes = [
  { id: 'event', label: 'Event' },
  { id: 'project', label: 'Projekt' },
  { id: 'media', label: 'Media' },
  { id: 'offer', label: 'Angebot' },
  { id: 'quest', label: 'Quest' },
];

const initialDraft = {
  type: 'event',
  title: 'Gemeinsam bauen wir Pilzmodule',
  summary: 'Workshop zum Einsatz von Kaffeesatz für modulare Pilzfarmen.',
  description:
    'Wir treffen uns Samstagnachmittag im Kulturzentrum Halle 11, diskutieren den Aufbau und markieren Aufgaben. Bringt gerne Materialideen mit!',
  start: new Date().toISOString().slice(0, 16),
  end: new Date(Date.now() + 90 * 60000).toISOString().slice(0, 16),
  location: 'Halle 11 – Kulturzentrum',
  tags: ['Circular Economy', 'Quest'],
  invitees: 'Partnerprojekte, Foodsharing Kassel',
};

function CreateEntryDialog({ open, onOpenChange }) {
  const [draft, setDraft] = useState(initialDraft);

  useEffect(() => {
    if (!open) {
      setDraft(initialDraft);
    }
  }, [open]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onOpenChange(false);
  };

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const removeTag = (tag) => {
    setDraft((prev) => ({ ...prev, tags: prev.tags.filter((entry) => entry !== tag) }));
  };

  const addTag = (event) => {
    event.preventDefault();
    const value = event.target.tag.value.trim();
    if (value && !draft.tags.includes(value)) {
      setDraft((prev) => ({ ...prev, tags: [...prev.tags, value] }));
    }
    event.target.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <form className="grid gap-6 md:grid-cols-[1.2fr_1fr]" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <header className="space-y-1">
              <h2 className="text-xl font-semibold text-white">Neuen Eintrag erstellen</h2>
              <p className="text-sm text-slate-400">Wähle den passenden Typ und bestimme, welche Daten im Feed, auf der Karte oder im Kalender auftauchen.</p>
            </header>

            <div className="flex flex-wrap gap-2">
              {entryTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => updateField('type', item.id)}
                  className={cn(
                    'rounded-full border border-slate-700 px-3 py-1.5 text-sm text-slate-200 transition hover:text-primary',
                    draft.type === item.id && 'border-primary/60 bg-primary/15 text-primary',
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titel</Label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3">
                  <Type className="h-5 w-5 text-primary" />
                  <input
                    type="text"
                    value={draft.title}
                    onChange={(event) => updateField('title', event.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                    placeholder="Titel deines Eintrags"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Teaser</Label>
                <textarea
                  value={draft.summary}
                  onChange={(event) => updateField('summary', event.target.value)}
                  className="min-h-[80px] w-full rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 text-sm text-slate-200 outline-none"
                  placeholder="Kurze Vorschau für Feed & Karte"
                />
              </div>

              <div className="space-y-2">
                <Label>Beschreibung</Label>
                <textarea
                  value={draft.description}
                  onChange={(event) => updateField('description', event.target.value)}
                  className="min-h-[140px] w-full rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 text-sm text-slate-200 outline-none"
                  placeholder="Alle Details, Links, Ressourcen"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start</Label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <input
                      type="datetime-local"
                      value={draft.start}
                      onChange={(event) => updateField('start', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ende</Label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <input
                      type="datetime-local"
                      value={draft.end}
                      onChange={(event) => updateField('end', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Ort / Link</Label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <input
                      type="text"
                      value={draft.location}
                      onChange={(event) => updateField('location', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none"
                      placeholder="Ort, Adresse oder Link"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Menschen einladen</Label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 px-4 py-3">
                    <Users className="h-5 w-5 text-primary" />
                    <input
                      type="text"
                      value={draft.invitees}
                      onChange={(event) => updateField('invitees', event.target.value)}
                      className="w-full bg-transparent text-sm text-white outline-none"
                      placeholder="Gruppen oder Kontakte"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <form className="flex flex-wrap gap-2" onSubmit={addTag}>
                  {draft.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-2">
                      #{tag}
                      <button type="button" onClick={() => removeTag(tag)} className="text-xs text-slate-400 hover:text-white">
                        ×
                      </button>
                    </Badge>
                  ))}
                  <input
                    type="text"
                    name="tag"
                    placeholder="+ neues Tag"
                    className="rounded-full border border-dashed border-slate-700 bg-transparent px-3 py-1.5 text-xs text-slate-300 outline-none"
                  />
                </form>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4 rounded-3xl border border-slate-800/70 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Live-Vorschau</h3>
              <Badge variant="secondary">Feed + Karte</Badge>
            </div>
            <div className="rounded-2xl border border-slate-800/60 bg-slate-900/80">
              <div className="h-32 overflow-hidden rounded-t-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60"
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4 p-4 text-sm text-slate-200">
                <p className="text-xs uppercase tracking-wide text-primary/80">{draft.type}</p>
                <p className="text-lg font-semibold text-white">{draft.title}</p>
                <p className="line-clamp-3 text-slate-400">{draft.summary}</p>
                <div className="grid gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {draft.location || 'Ort wird später gewählt'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    {draft.start ? new Date(draft.start).toLocaleString('de-DE') : '–'}
                  </div>
                  <div className="flex items-center gap-2">
                    <Image className="h-4 w-4 text-primary" />
                    Medien-Uploads folgen im nächsten Schritt
                  </div>
                </div>
              </div>
            </div>
            <Button type="submit" className="mt-auto w-full rounded-full" size="lg">
              Eintrag als Entwurf speichern
            </Button>
          </aside>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEntryDialog;
