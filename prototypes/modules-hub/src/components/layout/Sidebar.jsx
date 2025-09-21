import { AnimatePresence, motion } from 'framer-motion';
import { LucideArrowRight, LucideBadgeCheck, LucideMapPin, LucideSparkles, LucideUsers } from 'lucide-react';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDistanceKm } from '@/lib/utils';

function SidebarSection({ title, description, action, children }) {
  return (
    <section className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-inner shadow-black/20">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {description && <p className="text-xs text-slate-400">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function FilterSummary({ filters }) {
  const activeTypes = filters.types;
  const typeLabel = activeTypes.length === 0 ? 'Alle Inhalte' : `${activeTypes.length} Typen`;
  const timeframeMap = {
    all: 'Alle Zeiträume',
    today: 'Heute',
    week: 'Nächste 7 Tage',
    upcoming: 'Kommend',
    past: 'Vergangen',
  };

  return (
    <div className="flex flex-wrap gap-2 text-xs text-slate-300">
      <Badge variant="secondary">{typeLabel}</Badge>
      <Badge variant="secondary">{timeframeMap[filters.timeframe] || 'Zeit'} </Badge>
      <Badge variant="secondary">Radius {filters.distance} km</Badge>
      {filters.tags.map((tag) => (
        <Badge key={tag} variant="default">#{tag}</Badge>
      ))}
      {filters.onlyWithLocation && <Badge variant="warning">Nur mit Standort</Badge>}
    </div>
  );
}

function Sidebar({ open, onClose, filters, onOpenFilters, entries, contacts }) {
  const upcoming = entries
    .filter((entry) => new Date(entry.start) > new Date())
    .slice(0, 3);
  const quests = entries.filter((entry) => entry.type === 'quest');

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-16 z-30 bg-slate-950/50 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            className="fixed left-0 top-16 z-40 flex h-[calc(100vh-8.5rem)] w-72 flex-col gap-4 overflow-y-auto border-r border-slate-800/70 bg-slate-950/80 p-4 backdrop-blur md:static md:h-auto md:w-80"
          >
            <SidebarSection
              title="Aktive Filter"
              description="Feinjustiere den Netzwerk-Mix"
              action={
                <Button size="sm" variant="ghost" onClick={onOpenFilters} className="text-xs text-primary">
                  Bearbeiten
                </Button>
              }
            >
              <FilterSummary filters={filters} />
            </SidebarSection>

            <SidebarSection title="Nächste Veranstaltungen" description="Kalender im Blick behalten">
              <div className="space-y-3 text-sm">
                {upcoming.map((event) => (
                  <div key={event.id} className="rounded-xl border border-slate-800/60 bg-slate-900/60 p-3">
                    <p className="text-xs uppercase tracking-wide text-primary/70">{new Date(event.start).toLocaleDateString('de-DE', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                    })}</p>
                    <p className="font-semibold text-slate-100">{event.title}</p>
                    <p className="text-xs text-slate-400">{event.location?.name ?? 'Online'} · {formatDistanceKm(event.distance)}</p>
                  </div>
                ))}
                {upcoming.length === 0 && <p className="text-xs text-slate-500">Keine Events im Zeitraum.</p>}
              </div>
            </SidebarSection>

            <SidebarSection
              title="Quests & Badges"
              description="Fortschritt in deinem Fertigkeitenbaum"
              action={<LucideSparkles className="h-4 w-4 text-amber-400" />}
            >
              <div className="space-y-3 text-xs text-slate-300">
                {quests.map((quest) => (
                  <div key={quest.id} className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-3">
                    <div className="mb-1 flex items-center gap-2 text-purple-200">
                      <LucideBadgeCheck className="h-4 w-4" />
                      <span className="text-sm font-semibold">{quest.quest?.badge}</span>
                    </div>
                    <p className="text-sm text-white">{quest.title}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-purple-200/80">
                      <LucideUsers className="h-3.5 w-3.5" /> Max {quest.quest?.maxParticipants}
                      <span className="ml-2">• XP {quest.quest?.xpReward}</span>
                    </p>
                  </div>
                ))}
                {quests.length === 0 && <p className="text-xs text-slate-500">Noch keine aktiven Quests.</p>}
              </div>
            </SidebarSection>

            <SidebarSection title="Menschen in deiner Nähe" description="Gemeinsame Orte & Veranstaltungen">
              <div className="space-y-2 text-xs text-slate-300">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex items-start gap-3 rounded-xl border border-slate-800/70 bg-slate-900/70 p-3">
                    <div className="mt-0.5 h-8 w-8 rounded-full bg-primary/20 text-center text-xs font-semibold leading-8 text-primary">
                      {contact.name.split(' ').map((s) => s[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{contact.name}</p>
                      <p className="text-xs text-slate-400">{contact.connection}</p>
                    </div>
                    <LucideMapPin className="ml-auto mt-1 h-4 w-4 text-primary/70" />
                  </div>
                ))}
              </div>
            </SidebarSection>

            <SidebarSection
              title="Benachrichtigungen"
              description="Telegram · E-Mail · Browser"
              action={<LucideArrowRight className="h-4 w-4 text-slate-500" />}
            >
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• Repair Café Kassel startet in 2 Tagen</li>
                <li>• Neue Antwort im Quest-Thread</li>
                <li>• Essbare Stadt hat 4 neue Mitglieder</li>
              </ul>
            </SidebarSection>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
