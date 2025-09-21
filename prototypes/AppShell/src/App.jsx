import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import BottomMenu from '@/components/layout/BottomMenu';
import MainContent from '@/components/layout/MainContent';
import { Toaster } from '@/components/ui/toaster';
import { initializeMockData } from '@/data/mockData';

function App() {
  const [currentView, setCurrentView] = useState('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postToOpenOnMap, setPostToOpenOnMap] = useState(null);

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
    setCurrentView(view);
  }

  return (
    <>
      <Helmet>
        <title>AppShell - Modern Dashboard</title>
        <meta name="description" content="Modern responsive dashboard with navigation, sidebar and bottom menu" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 overflow-hidden">
        <Navbar 
          currentView={currentView}
          setCurrentView={handleViewChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex pt-16">
          <AnimatePresence>
            {sidebarOpen && (
              <Sidebar 
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            )}
          </AnimatePresence>

          <motion.div 
            className="flex-1"
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
            />
          </motion.div>
        </div>

        <BottomMenu 
          currentView={currentView}
          setCurrentView={handleViewChange}
        />

        <Toaster />
      </div>
    </>
  );
}

export default App;