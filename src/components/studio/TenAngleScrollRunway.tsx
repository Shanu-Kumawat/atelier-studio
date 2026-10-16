import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANGLE_SERIES, AngleSpec } from '../../data/angles';
import { Maximize2 } from 'lucide-react';

interface Props {
  onSelectAngle: (angle: AngleSpec) => void;
}

// Sophisticated organic offsets for 3-column / 2-column editorial flow
const STAGGER_OFFSETS = [
  'lg:translate-y-0',
  'lg:translate-y-24',
  'lg:translate-y-12',
  'lg:translate-y-28',
  'lg:translate-y-8',
  'lg:translate-y-20',
  'lg:translate-y-4',
  'lg:translate-y-32',
  'lg:translate-y-16',
  'lg:translate-y-24',
  'lg:translate-y-10',
  'lg:translate-y-28',
];

export const TenAngleScrollRunway: React.FC<Props> = ({ onSelectAngle }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Linear Scroll-Driven Scale with Bottom Anchoring & Top-Hit Disappearance
  useEffect(() => {
    let animFrame: number;

    const onScrollTick = () => {
      const vh = window.innerHeight;
      const cards = cardElementsRef.current;

      for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const cardHeight = rect.height || 480;

        // 1. Bottom-Anchored Entry (scales linearly up to 1.0 as bottom touches screen end)
        const enterProgress = (vh - rect.top) / cardHeight;
        let scale = Math.min(1, Math.max(0.4, 0.4 + 0.6 * enterProgress));
        let opacity = Math.min(1, Math.max(0.35, scale));

        // 2. Disappearing when image top hits the top of the screen (rect.top <= 0)
        if (rect.top <= 0) {
          const exitRange = cardHeight * 0.75;
          const exitProgress = Math.max(0, (exitRange + rect.top) / exitRange);
          // Premium curved roll-off
          const exitScale = Math.pow(exitProgress, 1.2);
          const exitOpacity = Math.pow(exitProgress, 1.4);

          scale = Math.min(scale, exitScale);
          opacity = Math.min(opacity, exitOpacity);
        }

        el.style.transform = `scale(${scale})`;
        el.style.opacity = `${opacity}`;
      }

      animFrame = requestAnimationFrame(onScrollTick);
    };

    animFrame = requestAnimationFrame(onScrollTick);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  return (
    <section id="ten-angle-runway" ref={containerRef} className="py-24 md:py-36 bg-black text-white border-b border-hairline relative select-none">
      
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/[0.025] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header with Staggered WhileInView Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-20 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>THE 12-ANGLE CONSISTENCY MATRIX</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4 leading-tight">
            One Jewel. Twelve Angles.
            <span className="block italic text-accent font-normal">Zero Drift.</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-sans max-w-lg mx-auto leading-relaxed font-light">
            Twelve optical perspectives of the 18K Yellow Gold & Imperial Emerald Ribbon Ring. Proving mathematically locked geometry across elevation, azimuth, and macro focus.
          </p>
        </motion.div>

        {/* Scattered Runway Grid (Large, Minimal, Image-First, Bottom-Anchored with Increased Vertical Spacing) */}
        <div className="w-full relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 sm:gap-x-12 lg:gap-x-14 gap-y-20 sm:gap-y-28 lg:gap-y-40 items-start pb-32">
            {ANGLE_SERIES.map((angle, idx) => {
              const staggerClass = STAGGER_OFFSETS[idx % STAGGER_OFFSETS.length];
              const isLeft = idx % 3 === 0;
              const isRight = idx % 3 === 2;
              const transformOrigin = isLeft ? 'bottom left' : isRight ? 'bottom right' : 'bottom center';

              return (
                <div
                  key={angle.id}
                  id={`angle-card-${angle.id}`}
                  className={`w-full transition-transform duration-300 ${staggerClass}`}
                >
                  <div
                    ref={(el) => {
                      cardElementsRef.current[idx] = el;
                    }}
                    onClick={() => onSelectAngle(angle)}
                    style={{
                      transformOrigin,
                      willChange: 'transform, opacity',
                    }}
                    className="group relative w-full aspect-[4/5] rounded-sm overflow-hidden bg-[#060606] border border-white/10 hover:border-accent/80 cursor-pointer shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-accent/5"
                  >
                    {/* Full-Bleed Master Visual with Smooth Premium Zoom on Hover */}
                    <img
                      src={angle.image}
                      alt={angle.title}
                      loading="lazy"
                      className="w-full h-full object-cover filter brightness-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 pointer-events-none"
                    />

                    {/* Subtle Vignette Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Minimalist Top Tag: Clean Numeral & Angle Name */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                      <span className="font-serif text-2xl text-accent font-normal drop-shadow">
                        0{angle.index}
                      </span>
                      <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/80 px-2 py-0.5 rounded-sm bg-black/60 backdrop-blur-md border border-white/10">
                        {angle.angleTag}
                      </span>
                    </div>

                    {/* Minimalist Bottom Info: Pure Title & Lens Readout */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl text-white font-normal drop-shadow leading-snug">
                          {angle.title}
                        </h3>
                        <span className="text-[10px] font-mono text-white/50 block mt-0.5 uppercase tracking-wider">
                          {angle.lens.split('·')[0]} · {angle.elevation}
                        </span>
                      </div>

                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 ml-3 group-hover:translate-x-0 translate-x-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-accent text-black font-sans text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-[0_0_16px_rgba(251,255,141,0.35)] active:scale-95 transition-all">
                          <Maximize2 className="w-3 h-3" /> Inspect
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

