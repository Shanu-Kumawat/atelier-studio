import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring, AnimatePresence } from 'framer-motion';
import { GALLERY_ITEMS } from '../../data/collections';
import { useBrand } from '../../context/BrandContext';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const EditorialGallery: React.FC = () => {
  const { brandName } = useBrand();
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Calculate horizontal translation: x from 0% to -70%
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);

  // Calculate velocity and map to skew clamped between -15° and +15° (Section 5)
  const scrollVelocity = useVelocity(scrollYProgress);
  const rawSkew = useTransform(scrollVelocity, [-2, 2], [-15, 15]);
  const smoothSkew = useSpring(rawSkew, { damping: 20, stiffness: 200 });

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null
            ? prev === 0
              ? GALLERY_ITEMS.length - 1
              : prev - 1
            : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  return (
    <section
      id="gallery"
      ref={targetRef}
      className="relative h-[300vh] bg-stage-surface text-white border-t border-hairline"
    >
      {/* Sticky Container for Horizontal Scrub */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
              <span className="text-[0.6875rem] uppercase tracking-[0.25em] text-metal-highlight font-mono">
                Velocity-Skewed Gallery · Lightbox Enabled
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-white font-normal">
              Private Salon Lightbox
            </h2>
          </div>
          <span className="text-xs font-mono text-white/40 tracking-wider">
            Drag / Scrub to View Alternating 3:4 & 4:5 Stills
          </span>
        </div>

        {/* Horizontal Track with Velocity Skew */}
        <motion.div
          style={{ x, skewX: smoothSkew }}
          className="flex gap-8 px-6 md:px-12 items-center cursor-grab active:cursor-grabbing will-change-transform"
        >
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative shrink-0 w-[300px] sm:w-[380px] md:w-[440px] aspect-[3/4] rounded-sm overflow-hidden border border-white/14 bg-black/60 shadow-2xl cursor-pointer"
            >
              <img
                src={item.img}
                alt={`${item.title} — ${item.caption}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-metal-primary block mb-1">
                    EXHIBIT 0{idx + 1}
                  </span>
                  <h3 className="font-display text-lg text-white font-normal mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/60 font-body line-clamp-1">
                    {item.caption}
                  </p>
                </div>
                <span className="p-2 bg-white/10 rounded-full group-hover:bg-metal-primary group-hover:text-black transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gallery Progress Footer */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-8 flex justify-between items-center text-[10px] font-mono text-white/40">
          <span>VELOCITY SKEW: ±15° MAX</span>
          <span>CLICK ANY ITEM FOR FULLSCREEN LIGHTBOX</span>
        </div>
      </div>

      {/* AnimatePresence Fullscreen Lightbox (Section 5) */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 z-50 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left / Right Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev !== null
                    ? prev === 0
                      ? GALLERY_ITEMS.length - 1
                      : prev - 1
                    : 0
                );
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-40"
              aria-label="Previous exhibit"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % GALLERY_ITEMS.length : 0
                );
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors z-40"
              aria-label="Next exhibit"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Borderless Image and Caption */}
            <div
              className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={activeLightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_ITEMS[activeLightboxIndex].img}
                alt={GALLERY_ITEMS[activeLightboxIndex].title}
                className="max-h-[75vh] w-auto object-contain rounded-sm shadow-2xl"
              />

              <div className="mt-6 text-center">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-metal-primary block mb-1">
                  EXHIBIT 0{activeLightboxIndex + 1} OF 0{GALLERY_ITEMS.length}
                </span>
                <h4 className="font-display text-2xl text-white font-normal mb-1">
                  {GALLERY_ITEMS[activeLightboxIndex].title}
                </h4>
                <p className="text-sm text-white/60 font-body max-w-lg mx-auto">
                  {GALLERY_ITEMS[activeLightboxIndex].caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
