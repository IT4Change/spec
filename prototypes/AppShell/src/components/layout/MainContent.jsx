import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Map, Rss, Filter, Plus, ArrowDownUp, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import FeedView from '@/components/views/FeedView';
import MapView from '@/components/views/MapView';
import PostDetail from '@/components/shared/PostDetail';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MainContent = ({ currentView, onSelectPost, selectedPost, onCloseDetail, postToOpenOnMap, setSelectedPost }) => {
  const [posts, setPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('chronological');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(storedPosts);
  }, []);

  const handleNotImplemented = () => {
    toast({
      title: "🚧 Feature nicht implementiert",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const isMapView = currentView === 'map';
  const showDetailAsModal = selectedPost && !selectedPost.location;

  const getViewContent = () => {
    switch (currentView) {
      case 'feed':
        return <FeedView posts={posts} sortOrder={sortOrder} onSelectPost={onSelectPost} />;
      case 'map':
        return <MapView posts={posts} onSelectPost={onSelectPost} postToOpen={postToOpenOnMap} setSelectedPost={setSelectedPost} selectedPost={selectedPost} onCloseDetail={onCloseDetail} />;
      case 'calendar':
        return (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 text-center h-full flex flex-col justify-center items-center">
            <Calendar className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-white text-2xl font-semibold mb-2">Kalender Ansicht</h2>
            <p className="text-white/60">Hier würde der Kalender mit Einträgen angezeigt werden, die ein Datum haben.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.main 
      key={currentView}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative ${isMapView ? 'p-0' : 'p-4 md:p-8'} pb-24 md:pb-8 h-[calc(100vh-4rem)] overflow-y-auto`}
    >
      <div className={`${isMapView ? 'absolute top-4 right-4 z-[1001]' : 'flex justify-end mb-8 max-w-3xl mx-auto'}`}>
        <div className="flex items-center space-x-2">
          {currentView === 'feed' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-slate-800/60 border-white/20 text-white hover:bg-slate-700/80 hover:text-white backdrop-blur-sm">
                  <ArrowDownUp className="mr-2 h-4 w-4" />
                  {sortOrder === 'chronological' ? 'Neueste' : 'Entfernung'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onSelect={() => setSortOrder('chronological')} className="cursor-pointer">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Chronologisch</span>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setSortOrder('distance')} className="cursor-pointer">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Entfernung</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="outline" onClick={handleNotImplemented} className="bg-slate-800/60 border-white/20 text-white hover:bg-slate-700/80 hover:text-white backdrop-blur-sm shadow-lg">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>
        
      <div className={isMapView ? 'h-full w-full' : 'max-w-3xl mx-auto'}>
        {getViewContent()}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[1000]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button size="icon" className="rounded-full h-14 w-14 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <Plus className="h-8 w-8" />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mb-2" align="end">
          <DropdownMenuItem onClick={handleNotImplemented} className="cursor-pointer">Veranstaltung erstellen</DropdownMenuItem>
          <DropdownMenuItem onClick={handleNotImplemented} className="cursor-pointer">Projekt/Gruppe erstellen</DropdownMenuItem>
          <DropdownMenuItem onClick={handleNotImplemented} className="cursor-pointer">Angebot/Bedürfnis erstellen</DropdownMenuItem>
          <DropdownMenuItem onClick={handleNotImplemented} className="cursor-pointer">MedienEintrag erstellen</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AnimatePresence>
        {showDetailAsModal && (
          <PostDetail post={selectedPost} onClose={onCloseDetail} isModal={true} />
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default MainContent;