import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MediaGallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockImages = [
    { src: 'https://images.unsplash.com/photo-1570100105319-45d425019752', alt: 'Berglandschaft mit Nebel' },
    { src: 'https://images.unsplash.com/photo-1656006545597-4b8e5adf15de', alt: 'Waldweg mit Sonnenstrahlen' },
    { src: 'https://images.unsplash.com/photo-1618158702512-cf73d9618127', alt: 'Schwarz-Weiß Berglandschaft' },
    { src: 'https://images.unsplash.com/photo-1599646274160-c4654977a23a', alt: 'Nahaufnahme von Baumrinde' }
  ];

  const displayImages = images.length > 0 ? images.map(url => ({src: url, alt: 'Galeriebild'})) : mockImages;

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(displayImages[index].src);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % displayImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(displayImages[nextIndex].src);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(displayImages[prevIndex].src);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Media Gallery</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
          <img alt="Berglandschaft mit Nebel" className="w-full h-full object-cover transition-transform group-hover:scale-110" src="https://images.unsplash.com/photo-1570100105319-45d425019752" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
        </motion.div>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(1)}
          >
          <img alt="Waldweg mit Sonnenstrahlen" className="w-full h-full object-cover transition-transform group-hover:scale-110" src="https://images.unsplash.com/photo-1656006545597-4b8e5adf15de" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
        </motion.div>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(2)}
          >
          <img alt="Schwarz-Weiß Berglandschaft" className="w-full h-full object-cover transition-transform group-hover:scale-110" src="https://images.unsplash.com/photo-1618158702512-cf73d9618127" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
        </motion.div>
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(3)}
          >
          <img alt="Nahaufnahme von Baumrinde" className="w-full h-full object-cover transition-transform group-hover:scale-110" src="https://images.unsplash.com/photo-1599646274160-c4654977a23a" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
        </motion.div>

         {displayImages.length === 0 && (
             Array.from({ length: 4 }).map((_, index) => (
                 <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>
             ))
         )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Vergrößerte Ansicht"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                onClick={closeLightbox}
              >
                <X className="h-4 w-4" />
              </Button>

              {displayImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {displayImages.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MediaGallery;