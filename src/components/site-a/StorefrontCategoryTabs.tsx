import React from 'react';
import { useBrand } from '../../context/BrandContext';
import { VERTICAL_TAXONOMIES } from '../../data/products';

interface Props {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const StorefrontCategoryTabs: React.FC<Props> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const { vertical } = useBrand();
  const currentTaxonomy = VERTICAL_TAXONOMIES[vertical];
  const categories = ['All', ...currentTaxonomy.categories.map((c) => c.l1)];

  return (
    <div className="w-full border-b border-hairline py-6 bg-stage-base sticky top-[73px] z-30 backdrop-blur-md">
      <div className="max-w-storefront mx-auto px-6 md:px-12 flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center space-x-6 sm:space-x-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`relative py-2 flex items-center gap-2 group transition-colors text-xs uppercase tracking-[0.2em] font-medium ${
                  isActive ? 'text-ink-primary' : 'text-ink-muted hover:text-ink-primary'
                }`}
              >
                {/* Active filled 6px dot in ink.primary */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-primary shrink-0 transition-transform duration-300 scale-100" />
                )}
                <span>{cat}</span>

                {/* Underline grows w-0 -> w-full on hover */}
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] bg-metal-primary transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 text-ink-muted text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-metal-hairline" />
          <span>8 Active Editions · GIA Inspected</span>
        </div>
      </div>
    </div>
  );
};
