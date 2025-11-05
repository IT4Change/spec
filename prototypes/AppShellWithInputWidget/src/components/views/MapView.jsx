import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { AnimatePresence, motion } from 'framer-motion';
import PostDetail from '@/components/shared/PostDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import L from 'leaflet';

const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapController = ({ center, detailWidth, detailHeight, isMobile }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      const zoom = Math.max(map.getZoom(), 15);
      const centerPoint = map.project(center, zoom);
      const offsetX = detailWidth ? detailWidth / 2 : 0;
      const offsetY = isMobile && detailHeight ? detailHeight / 2 : 0;
      const targetPoint = L.point(centerPoint.x + offsetX, centerPoint.y + offsetY/1.2);
      const targetLatLng = map.unproject(targetPoint, zoom);

      map.flyTo(targetLatLng, zoom, {
        animate: true,
        duration: 1.25,
      });
    }
  }, [center, detailWidth, detailHeight, isMobile, map]);
  return null;
};

const MapView = ({ posts, onSelectPost, postToOpen, setSelectedPost, selectedPost, onCloseDetail, onBackToFeed, showBackToFeed }) => {
  const [mapCenter, setMapCenter] = useState([52.52, 13.405]);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(() => (typeof window !== 'undefined' ? window.innerHeight : 800));
  const detailContainerRef = useRef(null);
  const [detailSize, setDetailSize] = useState({ width: 0, height: 0 });
  const postsWithLocation = posts.filter(post => post.location);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      setIsMobile(window.innerWidth < 768);
      setViewportHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (postToOpen) {
      setSelectedPost(postToOpen);
      setMapCenter([postToOpen.location.lat, postToOpen.location.lon]);
    }
  }, [postToOpen, setSelectedPost]);

  const handleMarkerClick = (post) => {
    setSelectedPost(post);
    setMapCenter([post.location.lat, post.location.lon]);
  };

  useEffect(() => {
    const node = detailContainerRef.current;
    if (!node) {
      setDetailSize({ width: 0, height: 0 });
      return undefined;
    }

    if (typeof ResizeObserver === 'undefined') {
      setDetailSize({ width: node.clientWidth, height: node.clientHeight });
      return undefined;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setDetailSize({ width, height });
      }
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [selectedPost]);

  const detailWidth = isMobile ? 0 : 450;
  const computeSheetHeight = (vh) => {
    const min = Math.max(220, vh * 0.32);
    const max = Math.max(min + 40, vh - 64);
    const target = vh * 0.65;
    return Math.min(Math.max(target, min), max);
  };
  const measuredHeight = detailSize.height || computeSheetHeight(viewportHeight);
  const detailHeight = isMobile ? measuredHeight : 0;
  const measuredWidth = detailSize.width || detailWidth;
  const controllerDetailWidth = isMobile ? 0 : measuredWidth;

  return (
    <div className="h-full w-full relative overflow-hidden">
      <MapContainer center={mapCenter} zoom={11} scrollWheelZoom={true} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={mapCenter} detailWidth={controllerDetailWidth} detailHeight={detailHeight} isMobile={isMobile} />
        {postsWithLocation.map(post => (
          <Marker 
            key={post.id} 
            position={[post.location.lat, post.location.lon]}
            icon={icon}
            eventHandlers={{
              click: () => handleMarkerClick(post),
            }}
          >
            <Popup>
              <div className="w-48">
                <h3 className="font-bold text-base mb-2 text-center">{post.title}</h3>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Floating back button when PostDetail is closed */}
      {showBackToFeed && !selectedPost && (
        <Button
          variant="outline"
          size="sm"
          onClick={onBackToFeed}
          className="absolute top-4 left-4 z-[1001] bg-slate-800/80 border-white/20 text-white hover:bg-slate-700/80 backdrop-blur-sm"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden md:inline">Feed</span>
        </Button>
      )}

      <AnimatePresence>
        {selectedPost && selectedPost.location && (
          <motion.div
            layoutId={`post-card-${selectedPost.id}`}
            className="absolute inset-0 z-[1002] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full w-full items-end justify-center md:items-stretch md:justify-end">
              <div
                className="pointer-events-auto w-full md:w-[450px]"
                ref={detailContainerRef}
              >
                <PostDetail post={selectedPost} onClose={onCloseDetail} isModal={false} onBackToFeed={onBackToFeed} showBackToFeed={showBackToFeed} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;
