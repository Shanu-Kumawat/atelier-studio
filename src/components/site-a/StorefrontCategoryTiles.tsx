import React from 'react';
import { useBrand } from '../../context/BrandContext';
import { VERTICAL_TAXONOMIES } from '../../data/products';
import { ArrowUpRight } from 'lucide-react';

export const StorefrontCategoryTiles: React.FC = () => {
  const { vertical } = useBrand();
  const currentTaxonomy = VERTICAL_TAXONOMIES[vertical];

  const tiles = [
    {
      id: 'tile-01',
      label: currentTaxonomy.categories[0]?.l1 || 'Rings',
      count: '14 Masterpieces',
      img: '/assets/a-cat-01.webp',
      alt: `Haute Joaillerie ${currentTaxonomy.categories[0]?.l1 || 'Rings'} campaign editorial in low-key lighting`,
    },
    {
      id: 'tile-02',
      label: currentTaxonomy.categories[1]?.l1 || 'Necklaces',
      count: '18 Compositions',
      img: '/assets/a-cat-02.webp',
      alt: `Haute Joaillerie ${currentTaxonomy.categories[1]?.l1 || 'Necklaces'} editorial raking key light`,
    },
    {
      id: 'tile-03',
      label: currentTaxonomy.categories[3]?.l1 || 'High Jewelry',
      count: '9 Curations',
      img: '/assets/a-cat-03.webp',
      alt: `Haute Joaillerie statement suites editorial macro`,
    },
  ];

  return (
    <section id="category-tiles" className="py-20 md:py-28 border-b border-hairline overflow-hidden">
      <div className="max-w-storefront mx-auto px-6 md:px-12">
        <div className="mb-12">
          <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-ink-muted font-mono block mb-2">
            RIG-EDITORIAL Vision · Environmental Atmosphere
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-ink-primary font-normal">
            Taxonomy Curations
          </h2>
        </div>

        {/* 3-up tiles: min-h-[500px] md:min-h-[720px], full-bleed image hover:scale-105, overlay rgba(0,0,0,0.10) -> 0.20 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {tiles.map((tile) => (
            <div
              key={tile.id}
              className="group relative min-h-[500px] md:min-h-[720px] rounded-sm overflow-hidden border border-hairline bg-stage-sunken flex flex-col justify-between p-8 sm:p-10 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-700"
            >
              {/* Full-bleed Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={tile.img}
                  alt={tile.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-complex group-hover:scale-105"
                />
                {/* Overlay rgba(0,0,0,0.10) -> 0.20 */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Top metadata */}
              <div className="relative z-10 flex items-center justify-between text-white/80">
                <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-sm">
                  {tile.count}
                </span>
                <span className="p-2 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-metal-primary group-hover:text-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Vertical Rotated Label: writingMode: 'vertical-lr' + rotate(180deg) at text-5xl -> lg:text-8xl */}
              <div className="relative z-10 flex items-end justify-between mt-auto">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-metal-highlight font-mono block mb-2">
                    Collection Series
                  </span>
                  <div
                    style={{
                      writingMode: 'vertical-lr',
                      transform: 'rotate(180deg)',
                    }}
                    className="font-display text-5xl sm:text-6xl lg:text-8xl text-white font-normal tracking-tight select-none drop-shadow-lg"
                  >
                    {tile.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
