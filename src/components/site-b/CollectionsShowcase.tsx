import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { COLLECTIONS } from '../../data/collections';
import { useBrand } from '../../context/BrandContext';
import { ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

export const CollectionsShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { openPdp, formatPrice } = useBrand();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Map 0 to 1 across 400vh into index 0..3
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const idx = Math.min(Math.floor(v * COLLECTIONS.length), COLLECTIONS.length - 1);
      setCurrentIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeCollection = COLLECTIONS[currentIndex];
  const heroProduct = activeCollection.heroProduct;

  return (
    <section
      id="collections-runway"
      ref={containerRef}
      className="relative w-full h-[400vh] bg-black text-white"
    >
      {/* Sticky top-0 h-screen Centrepiece Stage */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-1000"
        style={{ backgroundColor: activeCollection.bgColor }}
      >
        {/* Floating Dust-mote SVG Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="dust-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D4A017" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="15%" cy="25%" r="1.5" fill="url(#dust-glow)" className="animate-pulse" />
            <circle cx="28%" cy="75%" r="1" fill="#FDE68A" className="animate-pulse" style={{ animationDelay: '1.2s' }} />
            <circle cx="75%" cy="30%" r="2" fill="url(#dust-glow)" className="animate-pulse" style={{ animationDelay: '2.4s' }} />
            <circle cx="85%" cy="80%" r="1.5" fill="#D4A017" className="animate-pulse" style={{ animationDelay: '3.6s' }} />
            <circle cx="50%" cy="15%" r="1" fill="#FFFFFF" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
            <circle cx="62%" cy="65%" r="1.5" fill="url(#dust-glow)" className="animate-pulse" style={{ animationDelay: '2.1s' }} />
          </svg>
        </div>

        {/* Ambient Radial Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black pointer-events-none" />

        {/* 3-Column Stage Grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col lg:flex-row items-center justify-between py-12 gap-8">
          
          {/* Left Column: Number, Name, Headline, Button */}
          <div className="w-full lg:w-[28%] flex flex-col justify-center order-2 lg:order-1 text-left z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCollection.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Collection Number */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-metal-primary">
                    COLLECTION NO.
                  </span>
                  <span className="font-display text-2xl text-metal-highlight">
                    {activeCollection.number}
                  </span>
                  <span className="text-white/20">/ 04</span>
                </div>

                {/* Name */}
                <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.02] mb-4">
                  {activeCollection.name}
                </h2>

                {/* Headline */}
                <p className="text-sm font-body text-white/80 leading-relaxed mb-8 max-w-sm">
                  {activeCollection.headline}
                </p>

                {/* Button */}
                <button
                  onClick={() => openPdp(heroProduct)}
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-metal-primary text-black font-body text-xs uppercase tracking-[0.2em] font-medium hover:bg-metal-highlight transition-all shadow-lg hover:shadow-metal-primary/20 group"
                >
                  <span>Acquire Edition</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Centre Column: One Enormous Cutout, Height 90%, dropping in from y: 100% */}
          <div className="w-full lg:w-[44%] h-[45vh] sm:h-[55vh] lg:h-[90%] flex items-center justify-center order-1 lg:order-2 relative z-10 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCollection.id}
                initial={{ opacity: 0, y: '100%', scale: 0.9 }}
                animate={{ opacity: 1, y: '0%', scale: 1 }}
                exit={{ opacity: 0, y: '-40%', scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center p-2"
              >
                <img
                  src={`/assets/b-cutout-0${currentIndex + 1}.png`}
                  alt={`${activeCollection.name} isolated 1:1 master cutout in ${heroProduct.specs.metal}`}
                  className="max-h-[85vh] max-w-full object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] filter brightness-105"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Description + 2x2 Spec Grid */}
          <div className="w-full lg:w-[28%] flex flex-col justify-center order-3 text-left z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCollection.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Description */}
                <h3 className="text-xs uppercase tracking-[0.25em] text-metal-primary font-mono mb-3">
                  Provenance & Craft
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-body mb-8">
                  {activeCollection.description}
                </p>

                {/* 2x2 Spec Grid — the four Specs fields, each a hairline-bordered cell (Section 5) */}
                <div className="border border-white/14 rounded-sm bg-black/40 backdrop-blur-sm overflow-hidden mb-6">
                  <div className="grid grid-cols-2">
                    <div className="p-3.5 border-r border-b border-white/14">
                      <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">
                        Carat
                      </span>
                      <span className="text-sm font-display text-white mt-0.5 block">
                        {heroProduct.specs.carat}
                      </span>
                    </div>
                    <div className="p-3.5 border-b border-white/14">
                      <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">
                        Metal Alloy
                      </span>
                      <span className="text-sm font-display text-white mt-0.5 block">
                        {heroProduct.specs.metal}
                      </span>
                    </div>
                    <div className="p-3.5 border-r border-white/14">
                      <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">
                        Setting
                      </span>
                      <span className="text-sm font-display text-white mt-0.5 block truncate">
                        {heroProduct.specs.setting}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <span className="block text-[9px] uppercase tracking-wider text-white/40 font-mono">
                        Certificate
                      </span>
                      <span className="text-sm font-display text-metal-highlight mt-0.5 block">
                        {heroProduct.specs.certificate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-white/50">
                  <span>Price: {formatPrice(heroProduct.price)}</span>
                  <span className="text-metal-primary">RIG-STUDIO-CG</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll Runway Progress Bar at Bottom of Sticky Stage */}
        <div className="absolute bottom-6 left-12 right-12 flex items-center justify-between text-[10px] font-mono text-white/40 z-20">
          <div className="flex items-center gap-3">
            {COLLECTIONS.map((c, i) => (
              <span
                key={c.id}
                className={`transition-colors duration-300 ${
                  currentIndex === i ? 'text-metal-primary font-bold' : 'text-white/30'
                }`}
              >
                0{i + 1}
              </span>
            ))}
          </div>

          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-metal-primary transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / COLLECTIONS.length) * 100}%` }}
            />
          </div>

          <span>400VH RUNWAY PINNED</span>
        </div>
      </div>
    </section>
  );
};
