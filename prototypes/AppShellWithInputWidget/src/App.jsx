import React, { useState, useEffect, useRef } from 'react';
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
import { useNotifications } from '@/hooks/useNotifications';
import NotificationPanel from '@/components/notifications/NotificationPanel';

function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToOpenOnMap, setPostToOpenOnMap] = useState(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerPostType, setComposerPostType] = useState(POST_TYPES.POST);
  const [previousView, setPreviousView] = useState('feed');
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [navigationSource, setNavigationSource] = useState(null);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const hideTimeoutRef = useRef(null);
  const showTimeoutRef = useRef(null);

  // Notification system
  const {
    notifications,
    unreadCount,
    markAllAsRead,
    toggleNotificationRead,
    markAsRead,
  } = useNotifications();

  useEffect(() => {
    initializeMockData();
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Clear show timeout when scrolling starts
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
        showTimeoutRef.current = null;
      }

      // Start hide timeout if not already running
      if (!hideTimeoutRef.current) {
        // Only trigger fade-out if user scrolls for more than 2000ms continuously
        hideTimeoutRef.current = setTimeout(() => {
          setIsButtonVisible(false);
        }, 500);
      }

      // Set timeout to show button after scrolling stops
      showTimeoutRef.current = setTimeout(() => {
        // Clear hide timeout since scrolling stopped
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
          hideTimeoutRef.current = null;
        }
        setIsButtonVisible(true);
      }, 800); // 800ms delay after scrolling stops
    };

    // Find the scrollable element in MainContent
    const scrollElement = document.querySelector('main.overflow-y-auto');

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    // Cleanup
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, [currentView]);

  const handleSelectPost = (post) => {
    // Always open posts in overlay mode, regardless of location
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
    setPostToOpenOnMap(null);

    // Restore scroll position if we came from feed and are now back in feed
    if (navigationSource === 'feed' && currentView === 'feed') {
      setTimeout(() => {
        const scrollElement = document.querySelector('.overflow-y-auto');
        if (scrollElement) {
          scrollElement.scrollTop = previousScrollPosition;
        }
        // Clear navigation source after restoring scroll
        setNavigationSource(null);
      }, 100);
    }
  };

  const handleSwitchToMapView = (post) => {
    // Switch from overlay to full map view for a post with location
    // Save current scroll position before switching
    const scrollElement = document.querySelector('.overflow-y-auto');
    if (scrollElement) {
      setPreviousScrollPosition(scrollElement.scrollTop);
    }

    // Set postToOpenOnMap and switch view immediately
    // MapView's useEffect will handle setting selectedPost
    setNavigationSource('feed'); // Track that we came from feed
    setPostToOpenOnMap(post);
    setCurrentView('map');
  };

  const handleBackToFeed = () => {
    // Return to feed from map view
    setCurrentView('feed');
    // Keep navigationSource so scroll can be restored when closing detail
    setPostToOpenOnMap(null);
    // Keep selectedPost to show the modal in feed view
  };

  const handleNotificationClick = (notification) => {
    // Mark as read when clicked
    markAsRead(notification.id);

    // Close notification panel
    setNotificationPanelOpen(false);

    // Navigate based on notification
    if (notification.postId) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      const post = posts.find(p => p.id === notification.postId);

      if (post) {
        // Open post in appropriate view
        if (post.location && post.type === 'event') {
          // Events with location open in map
          setCurrentView('map');
          setPostToOpenOnMap(post);
        } else {
          // Other posts open in feed modal
          if (currentView !== 'feed') {
            setCurrentView('feed');
          }
          setSelectedPost(post);
        }
      }
    }
  };
  
  const handleViewChange = (view) => {
    // Close detail view when changing main view
    handleCloseDetail();
    setIsComposerOpen(false);
    setNavigationSource(null); // Clear navigation source on manual view change
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
      
      <div className="h-dvh bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden flex flex-col">
        <Navbar
          currentView={currentView}
          setCurrentView={handleViewChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          notifications={notifications}
          unreadCount={unreadCount}
          notificationPanelOpen={notificationPanelOpen}
          setNotificationPanelOpen={setNotificationPanelOpen}
          onNotificationClick={handleNotificationClick}
          markAllAsRead={markAllAsRead}
          toggleNotificationRead={toggleNotificationRead}
          isMobile={isMobile}
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
                onSwitchToMapView={handleSwitchToMapView}
                onBackToFeed={handleBackToFeed}
                showBackToFeed={navigationSource === 'feed'}
              />
            </motion.div>
          </div>
        </div>

        <BottomMenu
          currentView={currentView}
          setCurrentView={handleViewChange}
        />

        {/* Mobile notification panel */}
        {isMobile && (
          <NotificationPanel
            notifications={notifications}
            isOpen={notificationPanelOpen}
            onClose={() => setNotificationPanelOpen(false)}
            onMarkAllRead={markAllAsRead}
            onToggleRead={toggleNotificationRead}
            onNotificationClick={handleNotificationClick}
            isMobile={true}
          />
        )}

        <Dialog open={isComposerOpen} onOpenChange={(open) => {
          if (!open) handleComposerClose(false);
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isButtonVisible ? 1 : 0.3 }}
            transition={{ duration: 1 }}
            className="fixed bottom-24 md:bottom-4 right-4 z-50"
          >
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(79,70,229,0.45)] hover:from-purple-500 hover:via-fuchsia-500 hover:to-indigo-600"
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
          </motion.div>
          <DialogContent 
            className="max-w-full w-screen h-dvh border-none bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 p-0 shadow-none rounded-none m-0" 
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
