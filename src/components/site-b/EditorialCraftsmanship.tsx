import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBrand } from '../../context/BrandContext';
import { Sparkles, Eye } from 'lucide-react';

export const EditorialCraftsmanship: React.FC = () => {
  const { brandName } = useBrand();
  const runwayRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  // Macro image scaling + y: 20% scrub (Section 5)
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);

  // Foreground copy scrubbed in at top 60% (progress ~0.2-0.5), out at bottom 80% (progress ~0.7-0.9)
  const copyOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.7, 0.9], [0, 1, 1, 0]);
  const copyY = useTransform(scrollYProgress, [0.15, 0.45, 0.7, 0.9], [40, 0, 0, -40]);

  return (
    <section
      id="craftsmanship"
      ref={runwayRef}
      className="relative h-[150vh] bg-black text-white border-t border-hairline"
    >
      {/* Sticky top-0 h-screen (Section 5) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Macro Image Scaling + y: 20% scrub */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="/assets/b-craft.webp"
            alt={`${brandName} extreme macro pavé and milgrain edge catching raking light`}
            style={{ scale: imageScale, y: imageY }}
            className="w-full h-full object-cover filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>

        {/* Rotating dashed border animate-[spin_120s_linear_infinite] as a precision motif (Section 5) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] md:w-[680px] md:h-[680px] rounded-full border border-dashed border-metal-primary/30 animate-spin-slow">
            {/* Concentric subtle alignment marks */}
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-12 rounded-full border border-dashed border-metal-hairline/20" />
            
            {/* Cardinal ticks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-metal-primary" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-metal-primary" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-metal-primary" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-3 bg-metal-primary" />
          </div>
        </div>

        {/* Foreground Copy Scrubbed In/Out */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="relative z-20 max-w-2xl mx-auto px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-metal-primary/30">
            <Sparkles className="w-3.5 h-3.5 text-metal-primary" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-metal-highlight">
              Micro-Engineering Tolerance · ±0.01mm
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-normal mb-6 leading-tight">
            Pavé Beads Cast
            <span className="italic block text-metal-primary">To Defy Friction.</span>
          </h2>

          <p className="text-white/80 text-sm sm:text-base leading-relaxed font-body max-w-xl mx-auto mb-8">
            Each individual gem mount is sculpted under computer-assisted micro-lasers before receiving
            final hand-burnishing. The result: flawless light passthrough with zero risk of snagging silk or velvet.
          </p>

          <div className="flex items-center justify-center gap-8 text-xs font-mono text-white/50">
            <span>OPTICAL PHYSICS: 85MM MACRO</span>
            <span>SHALLOW DOF: F/2.8</span>
            <span>GRADE: +150K WARM BIAS</span>
          </div>
        </motion.div>

        {/* Bottom Status bar */}
        <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center text-[10px] font-mono text-white/40 z-20">
          <span>PRECISION MOTIF ENGINE</span>
          <span>150VH SCRUB RUNWAY</span>
        </div>
      </div>
    </section>
  );
};
