import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Map, Rss, Filter, ArrowDownUp, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import FeedView from '@/components/views/FeedView';
import MapView from '@/components/views/MapView';
import CalendarView from '@/components/views/CalendarView';
import ProfileView from '@/components/profile/ProfileView';
import { postToProfileData } from '@/lib/profileAdapter';
import { generateProfileConfig } from '@/lib/profileConfig';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const MainContent = ({ currentView, onSelectPost, selectedPost, onCloseDetail, postToOpenOnMap, postToOpenOnCalendar, setSelectedPost, onCreatePost, onSwitchToMapView, onBackToFeed, showBackToFeed, onCreateEvent }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [sortOrder, setSortOrder] = useState('chronological');

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    setPosts(storedPosts);
    setUsers(storedUsers);
  }, []);

  const handleNotImplemented = () => {
    toast({
      title: "🚧 Feature nicht implementiert",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const isMapView = currentView === 'map';
  const isCalendarView = currentView === 'calendar';
  const showDetailAsModal = selectedPost && currentView !== 'map' && currentView !== 'calendar'; // Only show modal when not in map/calendar view

  const getViewContent = () => {
    switch (currentView) {
      case 'feed':
        return <FeedView posts={posts} sortOrder={sortOrder} onSelectPost={onSelectPost} onCreatePost={onCreatePost} />;
      case 'map':
        return <MapView posts={posts} onSelectPost={onSelectPost} postToOpen={postToOpenOnMap} setSelectedPost={setSelectedPost} selectedPost={selectedPost} onCloseDetail={onCloseDetail} onBackToFeed={onBackToFeed} showBackToFeed={showBackToFeed} />;
      case 'calendar':
        return <CalendarView posts={posts} onSelectPost={onSelectPost} postToOpen={postToOpenOnCalendar} setSelectedPost={setSelectedPost} selectedPost={selectedPost} onCloseDetail={onCloseDetail} onBackToFeed={onBackToFeed} showBackToFeed={showBackToFeed} onCreateEvent={onCreateEvent} />;
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
      className={`relative flex-1 min-h-0 ${isMapView || isCalendarView ? 'p-0' : 'p-4 md:p-8'} overflow-y-auto`}
    >
      {/* Only show controls for feed view - calendar and map have their own */}
      {currentView === 'feed' && (
        <div className="flex justify-end mb-8 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
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
            <Button variant="outline" onClick={handleNotImplemented} className="bg-slate-800/60 border-white/20 text-white hover:bg-slate-700/80 hover:text-white backdrop-blur-sm shadow-lg">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>
      )}
        
      <div className={isMapView || isCalendarView ? 'h-full w-full' : 'max-w-3xl mx-auto'}>
        {getViewContent()}
      </div>

      <AnimatePresence>
        {showDetailAsModal && (
          <ProfileView
            data={postToProfileData(selectedPost, users, posts)}
            config={generateProfileConfig(selectedPost)}
            isModal={true}
            onClose={onCloseDetail}
            onSwitchToMap={() => onSwitchToMapView(selectedPost)}
            navigationSource={null}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default MainContent;
