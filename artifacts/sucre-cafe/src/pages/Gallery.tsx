import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageLayout } from '@/components/layout/PageLayout';
import { SEO } from '@/components/SEO';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialGallery } from '@/data/initialData';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gallery1 from '@assets/gallery_1.jpg';
import gallery2 from '@assets/gallery_2.jpg';

export default function Gallery() {
  // Merge user provided images with initial API data for richness
  const allInitialImages = [gallery1, gallery2, ...initialGallery];
  const [images] = useLocalStorage<string[]>('sucre_gallery', allInitialImages);
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simple pseudo-masonry setup
  const columns = [[], [], []] as string[][];
  images.forEach((img, i) => columns[i % 3].push(img));

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <PageLayout>
      <SEO title="Gallery" description="Explore the elegant atmosphere and culinary masterpieces at SUCRÉ." />
      
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-card border-b border-primary/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-40" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-wide text-gradient-amber-rose drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]">
              Gallery
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-medium">
              A visual journey through our creations and sanctuary.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-col gap-6">
                {col.map((img, idx) => {
                  const actualIndex = images.indexOf(img);
                  return (
                    <motion.div
                      key={actualIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (colIndex * 0.1) + (idx * 0.1) }}
                      className="relative group cursor-pointer overflow-hidden rounded-sm border border-primary/10 hover:border-gradient-amber-rose transition-colors duration-500 shadow-sm hover:shadow-[0_0_20px_rgba(245,166,35,0.4)]"
                      onClick={() => openLightbox(actualIndex)}
                    >
                      <div className="absolute inset-0 bg-[#1A0F2E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="text-primary font-serif font-bold uppercase tracking-[0.2em] text-sm border-2 border-primary px-6 py-3 transform scale-90 group-hover:scale-100 transition-transform shadow-[0_0_15px_rgba(245,166,35,0.4)] bg-[#0D0A1A]/80">
                          View
                        </span>
                      </div>
                      <img 
                        src={img} 
                        alt={`Gallery ${actualIndex}`} 
                        className="w-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity opacity-90 group-hover:mix-blend-normal group-hover:opacity-100"
                        loading="lazy"
                        onLoad={() => setIsLoading(false)}
                      />
                      {isLoading && (
                        <div className="absolute inset-0 bg-muted animate-pulse" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>
            
            <button 
              className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors p-4"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex}`}
              className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            
            <button 
              className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors p-4"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-serif tracking-widest text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </PageLayout>
  );
}
