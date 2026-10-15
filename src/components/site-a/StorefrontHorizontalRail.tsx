import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../../data/types';
import { useBrand } from '../../context/BrandContext';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface Props {
  products: Product[];
}

export const StorefrontHorizontalRail: React.FC<Props> = ({ products }) => {
  const { openPdp, formatPrice } = useBrand();
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const updateProgress = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(scrollLeft / maxScroll);
    }
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    // Wheel-hijack: preventDefault + scrollLeft += deltaY, {passive: false}
    const handleWheel = (e: WheelEvent) => {
      // Only hijack when cursor is over the rail and vertical scroll can be converted
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const canScrollLeft = rail.scrollLeft > 0 && e.deltaY < 0;
        const canScrollRight = rail.scrollLeft < rail.scrollWidth - rail.clientWidth && e.deltaY > 0;

        if (canScrollLeft || canScrollRight) {
          e.preventDefault();
          rail.scrollLeft += e.deltaY * 1.2;
          updateProgress();
        }
      }
    };

    rail.addEventListener('wheel', handleWheel, { passive: false });
    rail.addEventListener('scroll', updateProgress, { passive: true });

    return () => {
      rail.removeEventListener('wheel', handleWheel);
      rail.removeEventListener('scroll', updateProgress);
    };
  }, []);

  const scrollByAmount = (offset: number) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="horizontal-rail" className="py-20 md:py-28 border-b border-hairline bg-stage-surface/40 overflow-hidden">
      <div className="max-w-storefront mx-auto px-6 md:px-12">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
              <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-ink-muted font-mono font-medium">
                Wheel-Hijacked Kinetic Rail · 1:1 Transparent Cutouts
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
              Curated Masterpiece Rail
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByAmount(-350)}
              className="p-2.5 rounded-full border border-hairline hover:border-metal-primary hover:text-metal-primary transition-colors text-ink-primary"
              aria-label="Scroll rail left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByAmount(350)}
              className="p-2.5 rounded-full border border-hairline hover:border-metal-primary hover:text-metal-primary transition-colors text-ink-primary"
              aria-label="Scroll rail right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar with 30%-width thumb (Section 4) */}
        <div className="relative w-full h-1 bg-stage-sunken mb-8 rounded-full overflow-hidden border border-hairline">
          <div
            className="absolute top-0 bottom-0 bg-metal-primary rounded-full transition-all duration-150"
            style={{
              width: '30%',
              left: `${scrollProgress * 70}%`,
            }}
          />
        </div>

        {/* Rail Container: cards lg:w-[calc(25%-1px)], scrollbar-hide */}
        <div
          ref={railRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide py-2 scroll-smooth"
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => openPdp(product)}
              className="w-[280px] sm:w-[320px] lg:w-[calc(25%-1px)] shrink-0 bg-stage-surface border border-hairline p-5 rounded-sm group cursor-pointer hover:border-metal-hairline hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-ink-muted font-mono mb-4">
                <span>{product.category}</span>
                <span className="text-metal-primary font-medium">{product.specs.carat}</span>
              </div>

              {/* Centered Cutout on Sunken Stage (verifying zero fringe on #F9F4F0) */}
              <div className="relative aspect-square w-full rounded-sm bg-stage-sunken/80 p-4 mb-4 flex items-center justify-center border border-hairline/40 overflow-hidden">
                <img
                  src={product.media.cutout}
                  alt={`${product.name} isolated cutout in ${product.specs.metal}`}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-stage-surface rounded-full shadow border border-hairline text-ink-primary">
                    <Eye className="w-4 h-4 text-metal-primary" />
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-display text-base text-ink-primary group-hover:text-metal-primary transition-colors truncate">
                  {product.name}
                </h3>
                <div className="mt-1 text-sm font-body text-ink-primary">
                  {formatPrice(product.price)}
                </div>
                <div className="mt-2 text-[10px] text-ink-muted font-mono uppercase tracking-wider">
                  {product.specs.metal}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
