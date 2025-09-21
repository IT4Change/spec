import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { AnimatePresence, motion } from 'framer-motion';
import PostDetail from '@/components/shared/PostDetail';
import { Button } from '@/components/ui/button';
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
      const xOffset = isMobile ? 0 : -detailWidth / 2;
      const yOffset = isMobile ? -detailHeight / 2 : 0;
      
      map.flyTo(center, 15, {
        animate: true,
        duration: 1.5
      });
      
      map.panBy([xOffset, yOffset], { animate: true, duration: 1.5 });
    }
  }, [center, detailWidth, detailHeight, isMobile, map]);
  return null;
};

const MapView = ({ posts, onSelectPost, postToOpen, setSelectedPost, selectedPost, onCloseDetail }) => {
  const [mapCenter, setMapCenter] = useState([52.52, 13.405]);
  const [isMobile, setIsMobile] = useState(false);
  const postsWithLocation = posts.filter(post => post.location);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  const detailWidth = isMobile ? 0 : 450;
  const detailHeight = isMobile ? window.innerHeight * 0.3 : 0; // 70vh panel, so center in top 30%

  return (
    <div className="h-full w-full relative overflow-hidden">
      <MapContainer center={mapCenter} zoom={11} scrollWheelZoom={true} className="h-full w-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController center={mapCenter} detailWidth={detailWidth} detailHeight={detailHeight} isMobile={isMobile} />
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
                <h3 className="font-bold text-base mb-2">{post.title}</h3>
                {post.media && post.media[0]?.type === 'image' && (
                  <img src={post.media[0].url} alt={post.title} className="h-24 w-full object-cover rounded-md mb-2" />
                )}
                <p className="text-xs line-clamp-2 mb-2">{post.content}</p>
                <Button size="sm" className="w-full" onClick={() => onSelectPost(post)}>
                  Details anzeigen
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      <AnimatePresence>
        {selectedPost && selectedPost.location && (
          <motion.div
            layoutId={`post-card-${selectedPost.id}`}
            className="absolute z-[1002] bottom-0 right-0 md:top-0 w-full md:w-[450px] h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full pointer-events-auto">
              <PostDetail post={selectedPost} onClose={onCloseDetail} isModal={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView;