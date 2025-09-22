import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import BottomMenu from '@/components/layout/BottomMenu';
import MainContent from '@/components/layout/MainContent';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import SmartPostWidget, { POST_TYPES } from '@/components/SmartPostWidget';
import { initializeMockData } from '@/data/mockData';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToOpenOnMap, setPostToOpenOnMap] = useState(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerPostType, setComposerPostType] = useState(POST_TYPES.POST);
  const [previousView, setPreviousView] = useState('feed');
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);

  useEffect(() => {
    initializeMockData();
  }, []);

  const handleSelectPost = (post) => {
    if (post.location) {
      setPostToOpenOnMap(post);
      setCurrentView('map');
      // setSelectedPost is handled by MapView to sync with animation
    } else {
      setSelectedPost(post);
    }
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
    setPostToOpenOnMap(null);
  };
  
  const handleViewChange = (view) => {
    // Close detail view when changing main view
    handleCloseDetail();
    setIsComposerOpen(false);
    setCurrentView(view);
  }

  const handleCreatePostFromFeed = () => {
    // Default to POST type when creating from feed
    handleComposerLaunch(POST_TYPES.POST);
  };

  const handleComposerLaunch = (type) => {
    // Store current scroll position before opening composer
    const scrollElement = document.querySelector('.overflow-y-auto');
    if (scrollElement) {
      setPreviousScrollPosition(scrollElement.scrollTop);
    }
    setPreviousView(currentView);
    setComposerPostType(type);
    setIsComposerOpen(true);
  };

  const handleComposerClose = (postCreated = false, postData = null) => {
    setIsComposerOpen(false);
    
    if (postCreated && postData) {
      // Navigate based on post type
      if (postData.postType === POST_TYPES.EVENT && postData.data.location) {
        // For events with location, go to map view
        setPostToOpenOnMap(postData);
        setCurrentView('map');
      } else {
        // For all other posts, go to feed
        setCurrentView('feed');
      }
    } else {
      // On cancel, return to previous view and restore scroll
      setCurrentView(previousView);
      // Restore scroll position after view change
      setTimeout(() => {
        const scrollElement = document.querySelector('.overflow-y-auto');
        if (scrollElement) {
          scrollElement.scrollTop = previousScrollPosition;
        }
      }, 100);
    }
  };

  return (
    <>
      <Helmet>
        <title>AppShell - Modern Dashboard</title>
        <meta name="description" content="Modern responsive dashboard with navigation, sidebar and bottom menu" />
      </Helmet>
      
      <div className="min-h-screen h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden flex flex-col">
        <Navbar 
          currentView={currentView}
          setCurrentView={handleViewChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex flex-1 min-h-0 pt-16">
            <AnimatePresence>
              {sidebarOpen && (
                <Sidebar 
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
              )}
            </AnimatePresence>

            <motion.div 
              className="flex-1 flex flex-col min-h-0"
              animate={{ 
                marginLeft: sidebarOpen ? '320px' : '0px' 
              }}
              transition={{ type: "spring", damping: 30, stiffness: 250 }}
            >
              <MainContent 
                currentView={currentView} 
                onSelectPost={handleSelectPost}
                selectedPost={selectedPost}
                onCloseDetail={handleCloseDetail}
                postToOpenOnMap={postToOpenOnMap}
                setSelectedPost={setSelectedPost}
                onCreatePost={handleCreatePostFromFeed}
              />
            </motion.div>
          </div>
        </div>

        <BottomMenu 
          currentView={currentView}
          setCurrentView={handleViewChange}
        />

        <Dialog open={isComposerOpen} onOpenChange={(open) => {
          if (!open) handleComposerClose(false);
        }}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                className="fixed bottom-24 md:bottom-4 right-4 z-50 h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(79,70,229,0.45)] hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-600"
              >
                <Plus className="w-6 h-6" />
                <span className="sr-only">Eintragstyp auswählen</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="end" sideOffset={12} className="mb-3 min-w-[220px]">
              {Object.values(POST_TYPES).map((type) => (
                <DropdownMenuItem
                  key={type}
                  onSelect={() => handleComposerLaunch(type)}
                  className="cursor-pointer"
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent 
            className="max-w-full w-screen h-screen border-none bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-0 shadow-none rounded-none m-0" 
            showCloseButton={false}
          >
            <motion.div 
              className="h-full overflow-y-auto flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <DndProvider backend={HTML5Backend}>
                <SmartPostWidget
                  key={composerPostType}
                  initialPostType={composerPostType}
                  onClose={handleComposerClose}
                />
              </DndProvider>
            </motion.div>
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>
    </>
  );
}

export default App;
