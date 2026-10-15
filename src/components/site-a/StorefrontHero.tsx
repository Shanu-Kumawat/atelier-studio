import React, { useState, useEffect, useRef } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Play, Pause } from 'lucide-react';

interface Slide {
  src: string;
  alt: string;
  caption: string;
}

export const StorefrontHero: React.FC = () => {
  const { brandName } = useBrand();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<any>(null);

  const slides: Slide[] = [
    {
      src: '/assets/a-slide-01.webp',
      alt: `${brandName} 18K Yellow Gold solitaire diamond ring macro detail`,
      caption: 'Solitaire Architecture · 18K Antique Gold & VS1 Diamond',
    },
    {
      src: '/assets/a-slide-02.webp',
      alt: `${brandName} High Jewelry collar necklace with pavé milgrain edge`,
      caption: 'High Jewelry Collar · Graduated Brilliant Cut Cluster',
    },
    {
      src: '/assets/a-slide-03.webp',
      alt: `${brandName} Commercial catalog display still in raking key light`,
      caption: 'Haute Joaillerie · Hand-Engineered Invisible Clasp',
    },
  ];

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, slides.length]);

  return (
    <section id="hero" className="relative py-12 md:py-20 border-b border-hairline overflow-hidden">
      <div className="max-w-storefront mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Asymmetric Split Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-metal-primary" />
            <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-ink-muted font-mono font-medium">
              Permanent Collection · Maison Edition
            </span>
          </div>

          {/* Display Headline */}
          <h1 className="font-display text-hero text-ink-primary mb-8 font-normal">
            Reflecting
            <span className="italic block font-normal text-metal-primary">Pure Fire.</span>
          </h1>

          {/* Gold Hairline SVG Rule */}
          <div className="w-full max-w-md my-4">
            <svg
              className="w-full h-3 text-metal-hairline"
              viewBox="0 0 320 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="6" x2="320" y2="6" stroke="currentColor" strokeWidth="1" />
              <polygon points="160,2 164,6 160,10 156,6" fill="currentColor" />
            </svg>
          </div>

          {/* Editorial Paragraph */}
          <p className="text-body-custom text-text-secondary max-w-lg mb-8 leading-[1.68]">
            Crafted under strict optical raytracing constraints, every piece balances antique
            gold response against matte sweep backdrops. Uncompromising geometry, museum-grade
            metal purity, and GIA-certified precision.
          </p>

          {/* Primary Pill Button */}
          <div className="flex items-center gap-4">
            <a
              href="#catalog-grid"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-ink-primary text-stage-surface hover:bg-metal-primary hover:text-black transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium shadow-sm hover:shadow-md"
            >
              Explore Catalogue
            </a>
            <a
              href="#horizontal-rail"
              className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-hairline text-ink-primary hover:border-metal-hairline transition-colors text-xs uppercase tracking-[0.18em]"
            >
              Browse Rail
            </a>
          </div>
        </div>

        {/* Right Column: Crossfading Slideshow */}
        <div className="lg:col-span-7 relative">
          <div className="relative aspect-[16/10] md:aspect-[16/9] w-full rounded-sm overflow-hidden bg-stage-sunken border border-hairline shadow-lg">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  currentSlide === idx ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 text-white text-xs font-mono tracking-wider drop-shadow-md">
                  {slide.caption}
                </div>
              </div>
            ))}

            {/* Slideshow Controls (Dots + Play/Pause) */}
            <div className="absolute bottom-4 right-6 flex items-center gap-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 z-10">
              {slides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentSlide === dotIdx ? 'w-6 bg-metal-primary' : 'w-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white/80 hover:text-metal-primary transition-colors pl-1"
                aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
