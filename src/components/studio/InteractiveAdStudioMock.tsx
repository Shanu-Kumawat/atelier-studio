import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface CampaignFormat {
  id: string;
  index: number;
  label: string;
  shortLabel: string;
  ratio: string;
  aspectClass: string;
  channel: string;
  image: string;
}

const CAMPAIGN_FORMATS: CampaignFormat[] = [
  {
    id: 'feed-square',
    index: 0,
    label: '01 / 1:1 Square Feed',
    shortLabel: '1:1 Square Feed',
    ratio: '1080 × 1080 px',
    aspectClass: 'aspect-square',
    channel: 'E-Commerce Feed & Google Merchant Catalog',
    image: '/assets/ad-square.jpg',
  },
  {
    id: 'social-vertical',
    index: 1,
    label: '02 / 4:5 Social Campaign',
    shortLabel: '4:5 Social Drop',
    ratio: '1080 × 1350 px',
    aspectClass: 'aspect-[4/5]',
    channel: 'Dark-Mode Mobile Feed & High-Conversion Stories',
    image: '/assets/ad-social.jpg',
  },
  {
    id: 'hero-billboard',
    index: 2,
    label: '03 / 16:9 Hero Billboard',
    shortLabel: '16:9 Hero Billboard',
    ratio: '1920 × 1080 px',
    aspectClass: 'aspect-[16/9]',
    channel: 'Web Flagship Billboard & Digital Print Display',
    image: '/assets/ad-banner.jpg',
  },
];

export const InteractiveAdStudioMock: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFormatIndex, setActiveFormatIndex] = useState(0);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  // Smooth Scroll Scrub Engine (scroll-world architecture)
  useEffect(() => {
    let animFrame: number;

    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const raw = -rect.top / maxScroll;
      const clamped = Math.max(0, Math.min(1, raw));
      targetProgressRef.current = clamped;
    };

    const loop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.12;

      const progress = currentProgressRef.current;
      setScrollProgress(progress);

      // Determine active format from scroll position
      let newIndex = 0;
      if (progress < 0.33) {
        newIndex = 0;
      } else if (progress < 0.66) {
        newIndex = 1;
      } else {
        newIndex = 2;
      }

      setActiveFormatIndex(newIndex);
      animFrame = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleJumpToFormat = (index: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const maxScroll = rect.height - window.innerHeight;
    const targetOffset = (index / 2) * maxScroll;

    window.scrollTo({
      top: scrollTop + targetOffset,
      behavior: 'smooth',
    });
  };

  const current = CAMPAIGN_FORMATS[activeFormatIndex];

  return (
    <section id="interactive-mock" className="relative bg-[#020202] text-white border-b border-hairline">
      
      {/* Scroll-Driven Pinned Track */}
      <div ref={trackRef} className="relative h-[190vh]">
        
        {/* Sticky Viewport Stage — Generous spacing and negative space */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-start pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 px-4 sm:px-8 md:px-12 select-none overflow-hidden z-10">
          
          {/* Subtle Ambient Atmosphere Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-accent/[0.04] via-transparent to-transparent pointer-events-none" />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-accent/[0.03] blur-[150px] rounded-full pointer-events-none transition-transform duration-700"
            style={{
              transform: `translate(-50%, -50%) translateX(${(scrollProgress - 0.5) * 160}px)`,
              opacity: 0.35 + scrollProgress * 0.45,
            }}
          />

          {/* Top Bar: Minimal Header & Interactive Format Pills */}
          <div className="max-w-4xl mx-auto w-full text-center relative z-20 shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase mb-3.5 sm:mb-4.5">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>AUTONOMOUS MULTI-FORMAT CAMPAIGN MATRIX</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal tracking-tight leading-tight mb-6 sm:mb-7">
              One master CAD. <span className="italic font-light text-accent">Infinite campaign formats.</span>
            </h2>

            {/* Unified Interactive Format Dock with Spring Gliding Indicator */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-2xl">
              {CAMPAIGN_FORMATS.map((fmt, idx) => {
                const isActive = activeFormatIndex === idx;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => handleJumpToFormat(idx)}
                    className={`relative px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? 'text-black font-semibold'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeFormatPill"
                        className="absolute inset-0 bg-accent rounded-full shadow-[0_0_20px_rgba(251,255,141,0.35)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className={`relative z-10 w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-black' : 'bg-white/30'}`} />
                    <span className="relative z-10">{fmt.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Central Hero Stage: The Image is the Sole Centerpiece */}
          <div className="max-w-5xl mx-auto w-full my-auto relative z-20 flex flex-col items-center justify-center px-2">
            
            {/* Morphic Aspect Vitrine Container */}
            <div className="relative h-[46vh] sm:h-[50vh] md:h-[54vh] max-h-[540px] w-full flex items-center justify-center">
              
              <motion.div
                layout
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`relative ${current.aspectClass} h-full max-w-full rounded-sm overflow-hidden bg-black border border-white/20 shadow-2xl group flex items-center justify-center`}
              >
                {/* Active Campaign Image with Crossfade */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={current.label}
                    initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    draggable={false}
                  />
                </AnimatePresence>

                {/* Subtle Architectural Corner Brackets */}
                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/40 pointer-events-none" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/40 pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/40 pointer-events-none" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/40 pointer-events-none" />

                {/* The Single Overlay Element: Exact Format Dimension Badge */}
                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/90 px-3 py-1 rounded-sm bg-black/80 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{current.ratio}</span>
                  </span>
                </div>
              </motion.div>

            </div>

            {/* Clean Under-Vitrine Descriptor */}
            <div className="text-center mt-3.5">
              <p className="text-xs text-white/50 font-sans font-light tracking-wide">
                <span className="text-white font-medium">{current.shortLabel}</span> · {current.channel}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
