import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ANGLE_SERIES, AngleSpec } from '../../data/angles';
import { Maximize2 } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { RevealText } from './RevealText';

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
  const numeralRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  // Scroll engine: scale + fade + entrance drift + active-card spotlight +
  // numeral parallax + section progress rail. Measures the untransformed
  // parent wrapper (never the scaled element — see git history for the
  // rubber-band feedback bug) and writes all styles directly per frame.
  useEffect(() => {
    let animFrame: number | null = null;
    let scrollIdleTimer: number | null = null;

    const updateCards = () => {
      const vh = window.innerHeight;
      const cards = cardElementsRef.current;
      const section = containerRef.current;
      if (!section) return;
      const sectionRect = section.getBoundingClientRect();

      // Choose the spotlight card: whose center sits nearest viewport center
      let activeIdx = 0;
      let bestDist = Infinity;
      const metrics: { scale: number; opacity: number; centerDist: number; signedOffset: number }[] = [];

      for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        if (!el) { metrics.push({ scale: 1, opacity: 1, centerDist: Infinity, signedOffset: 0 }); continue; }

        const measure = el.parentElement ?? el;
        const rect = measure.getBoundingClientRect();
        const cardHeight = rect.height || 480;

        // 1. Bottom-anchored entry
        const enterProgress = (vh - rect.top) / cardHeight;
        let scale = Math.min(1, Math.max(0.4, 0.4 + 0.6 * enterProgress));
        let opacity = Math.min(1, Math.max(0.35, scale));

        // 2. Exit roll-off once the card top passes the viewport top
        if (rect.top <= 0) {
          const exitRange = cardHeight * 0.75;
          const exitProgress = Math.max(0, (exitRange + rect.top) / exitRange);
          scale = Math.min(scale, Math.pow(exitProgress, 1.2));
          opacity = Math.min(opacity, Math.pow(exitProgress, 1.4));
        }

        const signedOffset = rect.top + rect.height / 2 - vh / 2;
        const centerDist = Math.abs(signedOffset);
        if (centerDist < bestDist && scale > 0.45) {
          bestDist = centerDist;
          activeIdx = i;
        }
        metrics.push({ scale, opacity, centerDist, signedOffset });
      }

      // Second pass: write styles
      for (let i = 0; i < cards.length; i++) {
        const el = cards[i];
        if (!el) continue;
        const { scale, opacity, centerDist, signedOffset } = metrics[i];

        // Entrance drift rises with scale; exits drift back down
        const driftY = (1 - scale) * 30;
        el.style.transform = `translateY(${driftY.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        el.style.opacity = `${opacity}`;

        // Spotlight: nearest-to-center card at full brightness, others dimmed
        const spot = 1 - Math.min(1, centerDist / (vh * 0.55));
        el.style.filter = `brightness(${(0.62 + 0.38 * spot).toFixed(3)}) saturate(${(0.85 + 0.15 * spot).toFixed(3)})`;

        // Giant numeral parallax: drifts against scroll direction for depth
        const numeral = numeralRefs.current[i];
        if (numeral) {
          const parallax = Math.max(-110, Math.min(110, signedOffset * -0.12));
          numeral.style.transform = `translateY(${parallax.toFixed(1)}px)`;
        }
      }

      // Progress rail + orbit counter
      const rail = railRef.current;
      const counter = counterRef.current;
      if (rail && counter) {
        const total = sectionRect.height - vh;
        const progress = Math.min(1, Math.max(0, (vh * 0.45 - sectionRect.top) / (total || 1)));
        rail.style.height = `${(progress * 100).toFixed(1)}%`;
        counter.textContent = `${String(activeIdx + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
      }

      animFrame = null;
    };

    const requestTick = () => {
      if (animFrame === null) {
        animFrame = requestAnimationFrame(updateCards);
      }
    };

    // While smooth-scrolling, cards glide under a stationary cursor and each
    // passing card fires :hover — freezing hover-reactive visuals during
    // scroll prevents the zoom/pill/glare flicker that reads as "glitchy".
    const markScrolling = () => {
      document.body.classList.add('is-scrolling');
      if (scrollIdleTimer !== null) clearTimeout(scrollIdleTimer);
      scrollIdleTimer = window.setTimeout(() => {
        document.body.classList.remove('is-scrolling');
        scrollIdleTimer = null;
      }, 180);
    };

    const onScroll = () => {
      requestTick();
      markScrolling();
    };

    // Initial calculation on mount
    requestTick();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });

    return () => {
      if (animFrame !== null) cancelAnimationFrame(animFrame);
      if (scrollIdleTimer !== null) clearTimeout(scrollIdleTimer);
      document.body.classList.remove('is-scrolling');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', requestTick);
    };
  }, []);

  return (
    <section id="ten-angle-runway" ref={containerRef} className="py-24 md:py-36 bg-black text-white border-b border-hairline relative select-none">
      {/* Anchor alias for #runway */}
      <div id="runway" className="absolute -top-24 pointer-events-none" />

      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/[0.025] via-transparent to-transparent pointer-events-none" />

      {/* Vertical Orbit Progress Rail (desktop) */}
      <div className="pointer-events-none absolute left-8 top-0 bottom-0 hidden xl:block z-20">
        <div className="sticky top-[38vh] flex flex-col items-center gap-4">
          <span ref={counterRef} className="font-mono text-[10px] tracking-[0.25em] text-accent whitespace-nowrap">
            01 / 12
          </span>
          <div className="relative w-[2px] h-32 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={railRef}
              className="absolute top-0 left-0 right-0 bg-accent shadow-[0_0_8px_#FBFF8D] rounded-full"
              style={{ height: '0%' }}
            />
          </div>
          <span className="font-mono text-[9px] tracking-[0.3em] text-white/30 uppercase" style={{ writingMode: 'vertical-rl' }}>
            Orbital Sweep
          </span>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header with Staggered WhileInView Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>THE 12-ANGLE CONSISTENCY MATRIX</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-normal mb-4 leading-tight">
            <RevealText inView stagger={0.045}>One Jewel. Twelve Angles.</RevealText>
            <span className="block italic text-accent font-normal">
              <RevealText inView delay={0.25}>Zero Drift.</RevealText>
            </span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base font-sans max-w-lg mx-auto leading-relaxed font-light">
            Twelve optical perspectives of the 18K Yellow Gold & Imperial Emerald Ribbon Ring. Proving mathematically locked geometry across elevation, azimuth, and macro focus.
          </p>
        </motion.div>

        {/* Angle Ticker Marquee */}
        <div className="relative overflow-hidden border-y border-hairline py-3.5 mb-16 md:mb-20">
          <div className="runway-marquee flex w-max">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
                {ANGLE_SERIES.map((a) => (
                  <span key={a.id} className="mx-8 flex items-center gap-8 font-mono text-[10px] tracking-[0.3em] uppercase text-white/35">
                    <span>{a.angleTag}</span>
                    <span className="text-accent/60 text-[8px]">◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
        </div>

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
                  className="relative"
                  style={{
                    transformOrigin,
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Giant outlined ordinal numeral — parallaxed behind the card for depth */}
                  <span
                    ref={(el) => {
                      numeralRefs.current[idx] = el;
                    }}
                    aria-hidden="true"
                    className="runway-numeral pointer-events-none absolute -top-[0.35em] right-0 z-0 font-serif font-normal leading-none"
                  >
                    {String(angle.index).padStart(2, '0')}
                  </span>

                  {/* Tilt lives on an inner wrapper so the scroll-scale engine
                      keeps sole ownership of the outer card transform */}
                  <TiltCard maxTilt={4}>
                  <div
                    onClick={() => onSelectAngle(angle)}
                    className="runway-card group relative z-10 w-full aspect-[4/5] rounded-sm overflow-hidden bg-[#060606] border border-white/10 hover:border-accent/80 cursor-pointer shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-accent/5"
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
                        {String(angle.index).padStart(2, '0')}
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

                      <div className="runway-inspect opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 ml-3 group-hover:translate-x-0 translate-x-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-accent text-black font-sans text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-[0_0_16px_rgba(251,255,141,0.35)] active:scale-95 transition-all">
                          <Maximize2 className="w-3 h-3" /> Inspect
                        </span>
                      </div>
                    </div>

                  </div>
                  </TiltCard>
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
