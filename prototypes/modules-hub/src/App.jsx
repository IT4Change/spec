import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Plus } from 'lucide-react';
import TopNav from '@/components/layout/TopNav';
import Sidebar from '@/components/layout/Sidebar';
import BottomNav from '@/components/layout/BottomNav';
import FeedView from '@/components/feed/FeedView';
import MapView from '@/components/map/MapView';
import CalendarView from '@/components/calendar/CalendarView';
import EntryDetail from '@/components/EntryDetail';
import FilterDialog from '@/components/FilterDialog';
import CreateEntryDialog from '@/components/CreateEntryDialog';
import SearchSpotlight from '@/components/SearchSpotlight';
import { entries as sourceEntries, contacts } from '@/data/entries';
import { Button } from '@/components/ui/button';
import { isEntryActiveInRange, sortEntries } from '@/lib/utils';

const currentUser = {
  name: 'Clara Stein',
  avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=300&q=60',
};

function App() {
  const typeUniverse = useMemo(
    () => Array.from(new Set(sourceEntries.map((entry) => entry.type))),
    [],
  );

  const [filters, setFilters] = useState(() => ({
    types: typeUniverse,
    timeframe: 'all',
    distance: 15,
    tags: [],
    onlyWithLocation: false,
  }));
  const [view, setView] = useState('feed');
  const [feedSort, setFeedSort] = useState('recent');
  const [sidebarOpen, setSidebarOpen] = useState(() => (typeof window !== 'undefined' ? window.innerWidth >= 768 : true));
  const [filterOpen, setFilterOpen] = useState(false);
  const [composerOpen, setComposerOpen] = useState(false);
  const [activeEntryId, setActiveEntryId] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [timelineValue, setTimelineValue] = useState(65);
  const [timelinePlaying, setTimelinePlaying] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const handler = (event) => setSidebarOpen(event.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!timelinePlaying) return undefined;
    const interval = setInterval(() => {
      setTimelineValue((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 1200);
    return () => clearInterval(interval);
  }, [timelinePlaying]);

  const availableTags = useMemo(
    () => Array.from(new Set(sourceEntries.flatMap((entry) => entry.tags ?? []))),
    [],
  );

  const timeBounds = useMemo(() => {
    const allDates = sourceEntries.flatMap((entry) => [entry.start, entry.end ?? entry.start]).map((value) => new Date(value).getTime());
    return {
      min: Math.min(...allDates),
      max: Math.max(...allDates),
    };
  }, []);

  const timeCursor = useMemo(() => {
    const { min, max } = timeBounds;
    const span = max - min;
    const value = min + (span * timelineValue) / 100;
    return new Date(value);
  }, [timelineValue, timeBounds]);

  const filteredEntries = useMemo(() => {
    const now = new Date();
    return sortEntries(
      sourceEntries.filter((entry) => {
        const matchesType = filters.types.length === 0 || filters.types.includes(entry.type);
        const matchesTime = isEntryActiveInRange(entry, filters.timeframe);
        const matchesTags = filters.tags.length === 0 || filters.tags.some((tag) => entry.tags?.includes(tag));
        const matchesLocation = !filters.onlyWithLocation || Boolean(entry.location?.lat);
        const withinDistance = entry.distance == null || entry.distance <= filters.distance || entry.location == null;
        const isFutureEnough = new Date(entry.end ?? entry.start) >= now || filters.timeframe === 'past';
        return matchesType && matchesTime && matchesTags && matchesLocation && withinDistance && isFutureEnough;
      }),
      feedSort,
    );
  }, [filters, feedSort]);

  const activeEntry = useMemo(
    () => sourceEntries.find((entry) => entry.id === activeEntryId) ?? null,
    [activeEntryId],
  );

  const handleOpenEntry = (entry) => {
    if (entry.location?.lat && view !== 'map') {
      setView('map');
    }
    setActiveEntryId(entry.id);
  };

  const handleCloseDetail = () => {
    setActiveEntryId(null);
  };

  const mainContentClass = sidebarOpen ? 'md:ml-80' : 'md:ml-0';

  return (
    <>
      <Helmet>
        <title>Spektrum – Netzwerk Prototyp</title>
        <meta
          name="description"
          content="Prototype für Feed, Karte und Kalender einer Community-Plattform inklusive Filter, Quest- und Gamification-Signalen"
        />
      </Helmet>

      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-slate-100">
        <TopNav
          view={view}
          onViewChange={(next) => {
            setView(next);
            setActiveEntryId(null);
          }}
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={setSidebarOpen}
          onOpenFilter={() => setFilterOpen(true)}
          onOpenComposer={() => setComposerOpen(true)}
          onToggleSearch={() => setSearchOpen(true)}
          user={currentUser}
        />

        <div className="relative flex flex-1 overflow-hidden">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            filters={filters}
            onOpenFilters={() => setFilterOpen(true)}
            entries={filteredEntries}
            contacts={contacts}
          />

          <main className={`relative flex-1 overflow-hidden transition-all duration-300 ${mainContentClass}`}>
            {view === 'feed' && (
              <FeedView entries={filteredEntries} onOpenEntry={handleOpenEntry} sort={feedSort} onChangeSort={setFeedSort} />
            )}
            {view === 'map' && (
              <MapView
                entries={filteredEntries}
                contacts={contacts}
                activeEntry={activeEntry}
                onOpenEntry={handleOpenEntry}
                timelineValue={timelineValue}
                onTimelineChange={setTimelineValue}
                timeCursor={timeCursor}
                isPlaying={timelinePlaying}
                onTogglePlay={() => setTimelinePlaying((prev) => !prev)}
              />
            )}
            {view === 'calendar' && <CalendarView entries={filteredEntries} onOpenEntry={handleOpenEntry} />}

            <EntryDetail entry={activeEntry} onClose={handleCloseDetail} view={view} />

            <Button
              variant="default"
              size="icon"
              onClick={() => setComposerOpen(true)}
              className="fixed bottom-24 right-5 z-20 hidden h-16 w-16 rounded-full bg-gradient-to-r from-primary to-accent text-slate-950 shadow-2xl md:flex"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </main>
        </div>

        <BottomNav
          view={view}
          onViewChange={(next) => {
            setView(next);
            setActiveEntryId(null);
          }}
          onOpenFilter={() => setFilterOpen(true)}
          onOpenComposer={() => setComposerOpen(true)}
        />
      </div>

      <FilterDialog
        open={filterOpen}
        onOpenChange={setFilterOpen}
        filters={filters}
        onApply={setFilters}
        availableTags={availableTags}
        availableTypes={typeUniverse}
      />

      <CreateEntryDialog open={composerOpen} onOpenChange={setComposerOpen} />

      <SearchSpotlight
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        entries={filteredEntries}
        onSelectEntry={handleOpenEntry}
      />
    </>
  );
}

export default App;
