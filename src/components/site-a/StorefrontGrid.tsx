import React, { useEffect, useRef } from 'react';
import { Product } from '../../data/types';
import { useBrand } from '../../context/BrandContext';
import { Eye, Sparkles } from 'lucide-react';

interface Props {
  products: Product[];
}

export const StorefrontGrid: React.FC<Props> = ({ products }) => {
  const { openPdp, formatPrice } = useBrand();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // IntersectionObserver reveals: threshold 0.15, one-shot unobserve (Section 4)
    const elements = gridRef.current?.querySelectorAll<HTMLElement>('.catalog-reveal-card');
    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.getAttribute('data-delay') || '0';
            setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0px)';
            }, parseInt(delay, 10));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el, index) => {
      // card stagger 200ms + index * 80ms, translateY(8px) -> 0 over 500ms
      const staggerDelay = 200 + (index % 4) * 80;
      el.setAttribute('data-delay', staggerDelay.toString());
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px)';
      el.style.transition = 'opacity 500ms cubic-bezier(0.22, 1, 0.36, 1), transform 500ms cubic-bezier(0.22, 1, 0.36, 1)';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [products]);

  return (
    <section id="catalog-grid" className="py-16 md:py-24 border-b border-hairline">
      <div className="max-w-storefront mx-auto px-6 md:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-ink-muted font-mono block mb-2">
              RIG-STUDIO-CG Renders · True Metal Specular
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
              Haute Joaillerie Catalogue
            </h2>
          </div>
          <span className="text-xs text-ink-muted font-mono tracking-wider">
            Displaying {products.length} Curated Editions
          </span>
        </div>

        {/* Product Grid: md:grid-cols-2 lg:grid-cols-4, cards border all sides + -ml-px first:ml-0 to collapse shared borders */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline"
        >
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => openPdp(product)}
              className="catalog-reveal-card group cursor-pointer border-r border-b border-hairline bg-stage-surface p-6 sm:p-7 flex flex-col justify-between transition-colors hover:bg-stage-surface-2"
            >
              {/* Label row: category + optional subcategory, 10px uppercase tracking-wider */}
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-ink-muted mb-4 font-mono">
                <span>{product.category}</span>
                {product.subcategory && (
                  <span className="text-metal-primary">{product.subcategory}</span>
                )}
              </div>

              {/* Image well: aspect-[3/4], object-cover, bg-stage.sunken, hover:scale-105 duration-500 */}
              <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-stage-sunken mb-6 border border-hairline/60">
                <img
                  src={product.media.hero}
                  alt={`${product.name} crafted in ${product.specs.metal} with ${product.specs.carat} diamond setting`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-standard group-hover:scale-105"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 bg-stage-surface/95 text-ink-primary text-[11px] uppercase tracking-widest font-mono rounded-full border border-hairline flex items-center gap-1.5 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-metal-primary" /> View Specs
                  </span>
                </div>
              </div>

              {/* Footer: name centred; price row with optional struck compareAt in ink.muted */}
              <div className="text-center pt-2">
                <h3 className="font-display text-product-name text-ink-primary group-hover:text-metal-primary transition-colors mb-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-center gap-2.5">
                  <span className="text-sm font-medium text-ink-primary font-body">
                    {formatPrice(product.price)}
                  </span>
                  {product.compareAt && (
                    <span className="text-xs text-ink-muted line-through font-body">
                      {formatPrice(product.compareAt)}
                    </span>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-hairline/50 text-[10px] text-ink-muted font-mono tracking-wider flex justify-between">
                  <span>{product.specs.metal.split(' ')[0]}</span>
                  <span>{product.specs.carat}</span>
                  <span className="text-metal-primary">{product.specs.certificate.split(' ')[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
