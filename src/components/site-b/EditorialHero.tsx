import React from 'react';
import { useBrand } from '../../context/BrandContext';
import { ArrowDown } from 'lucide-react';

export const EditorialHero: React.FC = () => {
  const { brandName } = useBrand();

  return (
    <section
      id="editorial-hero"
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Full-bleed Editorial Image: B-hero (Section 7.3) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/b-hero.webp"
          alt={`${brandName} extreme macro diamond solitaire facet fire catching hard key`}
          className="w-full h-full object-cover scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Gradient from-black/80 via-black/40 to-black (Section 5) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/70" />
      </div>

      {/* Atmospheric Gold Light Bloom */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-metal-primary/10 blur-[140px] pointer-events-none -top-20 -right-20" />

      {/* Content Center */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Eyebrow tracking-[0.4em] */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
          <span className="text-[0.6875rem] uppercase tracking-[0.4em] text-metal-highlight font-mono font-medium drop-shadow-sm">
            HAUTE JOAILLERIE VOL. IV
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
        </div>

        {/* Display Headline: Bodoni Moda */}
        <h1 className="font-display text-hero text-white font-normal mb-8 leading-[0.95] drop-shadow-2xl">
          Forged in Silence.
          <span className="block italic text-metal-primary font-normal mt-2">
            Worn in Triumph.
          </span>
        </h1>

        {/* Lead Story */}
        <p className="max-w-xl mx-auto text-white/70 text-base md:text-lg font-body leading-relaxed mb-10 drop-shadow">
          A study of light raking across eighteen-karat antique gold. Where master stonecutters
          transform raw subterranean carbon into perpetual luminescence.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#collections-runway"
            className="px-8 py-4 rounded-full bg-metal-primary text-black hover:bg-metal-highlight transition-all duration-300 text-xs uppercase tracking-[0.22em] font-medium shadow-lg hover:shadow-metal-primary/20"
          >
            Explore Lookbook Runway
          </a>
          <a
            href="#heritage"
            className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-metal-hairline hover:text-metal-primary transition-all text-xs uppercase tracking-[0.2em] font-mono"
          >
            Maison Heritage
          </a>
        </div>
      </div>

      {/* Downward Scroll Indicator */}
      <a
        href="#collections-runway"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 hover:text-metal-primary transition-colors group cursor-pointer"
        aria-label="Scroll to collections runway"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-metal-primary" />
      </a>
    </section>
  );
};
