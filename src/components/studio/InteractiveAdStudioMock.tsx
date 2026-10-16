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
    channel: 'High-Conversion Social Stories & Luxury Mobile Ad Feed',
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

  const lockedUntilRef = useRef<number>(0);
  const activeIndexRef = useRef<number>(0);
  const snapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Preload all campaign format images for instant zero-latency switching
  useEffect(() => {
    CAMPAIGN_FORMATS.forEach((fmt) => {
      const img = new window.Image();
      img.src = fmt.image;
    });
  }, []);

  // Smooth Sticky Scroll Engine with Magnetic Snapping & Anti-Skip Latch
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

      // Soft Magnetic Settle when user finishes a scroll gesture inside the section
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      if (clamped > 0.08 && clamped < 0.92) {
        snapTimeoutRef.current = setTimeout(() => {
          if (!trackRef.current) return;
          const currentRect = trackRef.current.getBoundingClientRect();
          const currentMax = currentRect.height - window.innerHeight;
          const currentProgress = -currentRect.top / currentMax;
          const targetCenters = [0.18, 0.50, 0.82];
          const target = targetCenters[activeIndexRef.current];

          // If resting slightly off center, gently snap to the active format dwell center
          if (Math.abs(currentProgress - target) > 0.06 && Math.abs(currentProgress - target) < 0.18) {
            const top = window.scrollY + currentRect.top;
            window.scrollTo({
              top: top + target * currentMax,
              behavior: 'smooth',
            });
          }
        }, 160);
      }
    };

    let isRunning = false;

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        animFrame = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) < 0.0002) {
        currentProgressRef.current = targetProgressRef.current;
      } else {
        currentProgressRef.current += diff * 0.12;
      }

      const progress = currentProgressRef.current;
      setScrollProgress(progress);

      // Determine active format with generous dwell plateaus
      // Format 0 (1:1 Square Feed): 0.00 to 0.36
      // Format 1 (4:5 Social Drop): 0.36 to 0.70
      // Format 2 (16:9 Hero Billboard): 0.70 to 1.00
      let rawIndex = 0;
      if (progress < 0.36) {
        rawIndex = 0;
      } else if (progress < 0.70) {
        rawIndex = 1;
      } else {
        rawIndex = 2;
      }

      const now = Date.now();
      const currentIdx = activeIndexRef.current;

      // Anti-Double-Skip Lock: Prevent skipping two formats in a single fast wheel flick
      if (now < lockedUntilRef.current) {
        // Enforce max single-step change during transition cooldown
        if (Math.abs(rawIndex - currentIdx) > 1) {
          rawIndex = currentIdx + Math.sign(rawIndex - currentIdx);
        }
      } else if (rawIndex !== currentIdx) {
        // Sticky latch: give each format at least 420ms before allowing next transition
        lockedUntilRef.current = now + 420;
        activeIndexRef.current = rawIndex;
        setActiveFormatIndex(rawIndex);
      }

      if (currentProgressRef.current !== targetProgressRef.current) {
        animFrame = requestAnimationFrame(loop);
      } else {
        isRunning = false;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    startLoop();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  const handleJumpToFormat = (index: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const maxScroll = rect.height - window.innerHeight;
    const targetCenters = [0.18, 0.50, 0.82];
    const targetOffset = targetCenters[index] * maxScroll;

    // Lock index during manual jump
    lockedUntilRef.current = Date.now() + 600;
    activeIndexRef.current = index;
    setActiveFormatIndex(index);

    window.scrollTo({
      top: scrollTop + targetOffset,
      behavior: 'smooth',
    });
  };

  const current = CAMPAIGN_FORMATS[activeFormatIndex];

  return (
    <section id="interactive-mock" className="relative bg-[#020202] text-white border-b border-hairline">
      
      {/* Scroll-Driven Pinned Track (320vh ensures generous sticky dwell per format) */}
      <div ref={trackRef} className="relative h-[320vh]">
        
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
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto w-full text-center relative z-20 shrink-0"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase mb-3.5 sm:mb-4.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-accent animate-pulse" />
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
                    className={`relative px-4 sm:px-5 py-2 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95 ${
                      isActive
                        ? 'text-black font-semibold'
                        : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
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

            {/* Format Dwell & Sticky Scrub Rail */}
            <div className="flex items-center justify-center gap-2 mt-3.5">
              {CAMPAIGN_FORMATS.map((fmt, idx) => {
                const isActive = activeFormatIndex === idx;
                const zoneStart = idx === 0 ? 0 : idx === 1 ? 0.36 : 0.70;
                const zoneEnd = idx === 0 ? 0.36 : idx === 1 ? 0.70 : 1.0;
                const zoneProgress = Math.max(0, Math.min(1, (scrollProgress - zoneStart) / (zoneEnd - zoneStart)));

                return (
                  <button
                    key={`rail-${fmt.id}`}
                    onClick={() => handleJumpToFormat(idx)}
                    className="group flex flex-col items-center gap-1 cursor-pointer focus:outline-none"
                    aria-label={`Jump to ${fmt.label}`}
                  >
                    <div className="w-16 sm:w-24 h-[2px] sm:h-[3px] bg-white/10 rounded-full overflow-hidden relative transition-colors group-hover:bg-white/20">
                      <div
                        className={`absolute inset-y-0 left-0 transition-[width] duration-75 rounded-full ${
                          isActive
                            ? 'bg-accent shadow-[0_0_8px_#FBFF8D]'
                            : scrollProgress > zoneEnd
                            ? 'bg-white/35'
                            : 'bg-transparent'
                        }`}
                        style={{
                          width: isActive ? `${Math.round(zoneProgress * 100)}%` : scrollProgress > zoneEnd ? '100%' : '0%',
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Central Hero Stage: The Image is the Sole Centerpiece */}
          <div className="max-w-5xl mx-auto w-full my-auto relative z-20 flex flex-col items-center justify-center px-2">
            
            {/* Native Aspect Ratio Showcase Stage (100% distortion-free, zero rubber-banding) */}
            <div className="relative h-[46vh] sm:h-[50vh] md:h-[54vh] max-h-[540px] w-full flex items-center justify-center">
              {CAMPAIGN_FORMATS.map((fmt, idx) => {
                const isCurrent = activeFormatIndex === idx;
                return (
                  <motion.div
                    key={fmt.id}
                    initial={false}
                    animate={{
                      opacity: isCurrent ? 1 : 0,
                      scale: isCurrent ? 1 : 0.94,
                      filter: isCurrent ? 'blur(0px)' : 'blur(4px)',
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`absolute ${fmt.aspectClass} h-full max-w-full rounded-sm overflow-hidden bg-[#0d0c0a] border border-white/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(251,255,141,0.06)] group flex items-center justify-center`}
                    style={{
                      zIndex: isCurrent ? 10 : 1,
                      pointerEvents: isCurrent ? 'auto' : 'none',
                    }}
                  >
                    {/* Native Aspect Campaign Master — Zero Stretch or Shrink */}
                    <img
                      src={fmt.image}
                      alt={fmt.label}
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable={false}
                    />

                    {/* Luxury Studio Prismatic Glint Sweep on Active Format */}
                    {isCurrent && (
                      <motion.div
                        key={`glint-${fmt.id}`}
                        initial={{ x: '-130%', opacity: 0 }}
                        animate={{ x: '170%', opacity: [0, 0.6, 0.85, 0.4, 0] }}
                        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-y-0 w-3/4 pointer-events-none z-10 -skew-x-12 bg-gradient-to-r from-transparent via-accent/[0.22] via-white/[0.3] to-transparent mix-blend-overlay"
                      />
                    )}

                    {/* Subtle Architectural Corner Viewfinder Brackets */}
                    <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/50 pointer-events-none z-20" />
                    <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/50 pointer-events-none z-20" />
                    <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/50 pointer-events-none z-20" />
                    <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/50 pointer-events-none z-20" />

                    {/* Exact Format Dimension Badge */}
                    <div className="absolute top-3.5 left-3.5 pointer-events-none z-20">
                      <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white/90 px-3 py-1 rounded-sm bg-black/85 backdrop-blur-md border border-white/15 shadow-lg flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span>{fmt.ratio}</span>
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Clean Under-Vitrine Descriptor with Smooth Slide-Fade */}
            <div className="text-center mt-3.5 h-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={current.id}
                  initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                  className="text-xs text-white/50 font-sans font-light tracking-wide"
                >
                  <span className="text-white font-medium">{current.shortLabel}</span> · {current.channel}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
