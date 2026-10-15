import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronsLeftRight, ArrowRight, Sparkles } from 'lucide-react';

export const BeforeAfterComparison: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sliderPos, setSliderPos] = useState(0);
  const [isManualDrag, setIsManualDrag] = useState(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const lastScrollYRef = useRef(0);

  // Smooth Scroll Scrub Engine (inspired by scroll-world architecture)
  useEffect(() => {
    let animFrame: number;

    const onScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const rawProgress = -rect.top / maxScroll;
      const clamped = Math.max(0, Math.min(1, rawProgress));
      targetProgressRef.current = clamped;

      // If user scrolls by more than 15px, smoothly release manual drag lock
      if (Math.abs(window.scrollY - lastScrollYRef.current) > 15) {
        setIsManualDrag(false);
      }
      lastScrollYRef.current = window.scrollY;
    };

    const loop = () => {
      // Lerp for buttery smooth inertia
      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.12;

      const progress = currentProgressRef.current;
      setScrollProgress(progress);

      // Automatically map scroll progress to slider split when not manually dragged
      if (!isManualDrag) {
        if (progress < 0.12) {
          setSliderPos(0);
        } else if (progress > 0.72) {
          setSliderPos(100);
        } else {
          const wipeNorm = (progress - 0.12) / 0.60;
          setSliderPos(Math.round(wipeNorm * 100));
        }
      }

      animFrame = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    animFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [isManualDrag]);

  // Pointer drag fallback
  const handlePointerMove = (clientX: number) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const newPos = Math.round((x / rect.width) * 100);
    setSliderPos(newPos);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsManualDrag(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handlePointerMove(e.clientX);
  };

  const handlePointerDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isManualDrag) return;
    handlePointerMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // safe release
    }
  };

  // Derived animation states
  const macroZoom = scrollProgress > 0.72 ? 1 + (scrollProgress - 0.72) * 0.12 : 1;

  return (
    <section id="before-after" className="relative bg-[#020202] text-white border-b border-hairline">
      
      {/* 1. Sticky Scroll-Driven Metamorphosis Stage */}
      <div ref={trackRef} className="relative h-[180vh]">
        
        {/* Sticky Viewport Stage (Clean, spacious, uncrowded) */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-5 sm:py-7 md:py-9 px-4 sm:px-8 md:px-12 overflow-hidden select-none z-10">
          
          {/* Subtle Ambient Atmosphere Glow */}
          <div className="absolute inset-0 bg-radial-gradient from-accent/[0.035] via-transparent to-transparent pointer-events-none" />
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/[0.03] blur-[120px] rounded-full pointer-events-none transition-opacity duration-700"
            style={{ opacity: 0.3 + scrollProgress * 0.7 }}
          />

          {/* Top Bar: Minimal Header & Progress Scrubber */}
          <div className="max-w-6xl mx-auto w-full pt-2 sm:pt-4 text-center relative z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase mb-2">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>SCROLL-DRIVEN METAMORPHOSIS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight">
              From raw phone snap to <span className="italic font-light text-accent">campaign master.</span>
            </h2>

            {/* Luxury Scroll Track Indicator */}
            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                01 Raw Sensor
              </span>
              <div className="w-28 sm:w-44 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                <div
                  className="absolute top-0 bottom-0 left-0 bg-accent shadow-[0_0_8px_#FBFF8D] transition-[width] duration-75"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${scrollProgress > 0.72 ? 'text-accent font-semibold' : 'text-white/40'}`}>
                02 Atelier 4K Master
              </span>
            </div>
          </div>

          {/* Center Stage: Widescreen Cinematic Comparison Vitrine */}
          <div className="max-w-5xl mx-auto w-full my-auto relative z-20">
            <div
              ref={canvasRef}
              className="relative aspect-[4/3] sm:aspect-[16/9] w-full rounded-sm overflow-hidden select-none border border-white/15 shadow-2xl cursor-ew-resize bg-black touch-none group"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerDrag}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Corner Badge: 01 Raw Sensor (Top-Left) */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className={`text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase px-3 py-1 rounded-sm backdrop-blur-md shadow-lg transition-all duration-300 ${
                  sliderPos < 50
                    ? 'text-white bg-black/85 border border-white/20'
                    : 'text-white/40 bg-black/60 border border-white/10'
                }`}>
                  01 / RAW DESK SENSOR SNAP
                </span>
              </div>

              {/* Corner Badge: 02 4K Atelier Master (Top-Right) */}
              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <span className={`text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase px-3 py-1 rounded-sm backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-all duration-300 ${
                  sliderPos >= 50
                    ? 'text-accent bg-black/85 border border-accent/40 shadow-[0_0_12px_rgba(251,255,141,0.2)]'
                    : 'text-white/40 bg-black/60 border border-white/10'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${sliderPos >= 50 ? 'bg-accent animate-pulse' : 'bg-white/30'}`} />
                  <span>02 / 4K ATELIER MASTER STILL</span>
                </span>
              </div>

              {/* Layer 1: Raw Phone Snap (Full base background) */}
              <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
                <img
                  src="/assets/before-phone.webp"
                  alt="Before: Raw Phone Photo"
                  className="w-full h-full object-cover pointer-events-none select-none filter contrast-95"
                  draggable={false}
                />
              </div>

              {/* Layer 2: 4K Atelier Master (Clipped dynamically by scroll or drag from left to right) */}
              <div
                className="absolute inset-0 pointer-events-none select-none overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              >
                <div
                  className="w-full h-full transition-transform duration-300 ease-out origin-center"
                  style={{ transform: `scale(${macroZoom})` }}
                >
                  <img
                    src="/assets/after-silk.jpg"
                    alt="After: Atelier AI Studio Campaign Still"
                    className="w-full h-full object-cover pointer-events-none select-none filter brightness-105"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Laser Hairline & Precision Pill Handle */}
              <div
                className="absolute top-0 bottom-0 w-[1.5px] bg-accent pointer-events-none z-20 shadow-[0_0_18px_rgba(251,255,141,0.85)]"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black/90 border border-accent text-accent flex items-center justify-center shadow-2xl backdrop-blur-md group-hover:scale-105 transition-transform">
                  <ChevronsLeftRight className="w-3.5 h-3.5 text-accent" />
                </div>
              </div>

              {/* Dynamic Telemetry Pins (Light up during the scroll sweep) */}
              <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-white/50 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/10">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span>INPUT: iPhone 15 Pro · Desk Lighting</span>
                </span>
                <span className="flex items-center gap-1.5 text-accent font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>OUTPUT: 18K Yellow Gold · Pleated Silk · 4K CMYK</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono tracking-wider text-white/30 uppercase mt-3 px-1">
              <span>Scroll wheel or swipe to scrub</span>
              <span>{sliderPos}% Metamorphosis complete</span>
            </div>
          </div>

        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. UNIT ECONOMICS & CTA (Separately below the scroll stage)    */}
      {/* ============================================================== */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 pt-8 pb-16 sm:pt-10 sm:pb-20">
        
        {/* Animated Hairline Rule: draws itself across when scrolled into view */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 sm:mb-10 origin-center"
        />

        {/* 3 Metric Columns with Staggered Entrance on Scroll */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.08,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left"
        >
          {/* Metric 1 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="group"
          >
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5 overflow-hidden">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal group-hover:text-accent transition-colors duration-300">
                ₹19,500
              </span>
              <span className="text-[11px] font-mono text-white/40 uppercase">/ SKU</span>
            </div>
            <div className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>95% Capital Reduction</span>
            </div>
            <p className="text-xs text-white/50 font-sans leading-relaxed mt-2">
              vs. ₹3.5L – ₹5L studio rental, gaffer & model fees in Mumbai or Jaipur.
            </p>
          </motion.div>

          {/* Metric 2 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="group"
          >
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5 overflow-hidden">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal group-hover:text-accent transition-colors duration-300">
                48 Hours
              </span>
              <span className="text-[11px] font-mono text-white/40 uppercase">Guaranteed</span>
            </div>
            <div className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>14x Faster Deployment</span>
            </div>
            <p className="text-xs text-white/50 font-sans leading-relaxed mt-2">
              vs. 4 to 6 weeks of waiting for physical studio booking & retouching.
            </p>
          </motion.div>

          {/* Metric 3 */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 36, filter: 'blur(8px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="group"
          >
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5 overflow-hidden">
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-normal group-hover:text-accent transition-colors duration-300">
                Zero Transit
              </span>
              <span className="text-[11px] font-mono text-white/40 uppercase">Liability</span>
            </div>
            <div className="text-[11px] font-mono text-accent uppercase tracking-wider font-semibold mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>100% Risk Eliminated</span>
            </div>
            <p className="text-xs text-white/50 font-sans leading-relaxed mt-2">
              Zero armored courier fees. Upload unedited photos or 3DM CAD from workshop.
            </p>
          </motion.div>
        </motion.div>

        {/* Centered Conversion Action with Scale & Glow Reveal on Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 text-center"
        >
          <a
            href="#brief"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-300 shadow-lg hover:shadow-[0_0_32px_rgba(251,255,141,0.45)] hover:scale-105 active:scale-98"
          >
            <span>Commission Free Pilot SKU</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

    </section>
  );
};

