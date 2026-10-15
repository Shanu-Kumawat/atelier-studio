import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { AnnouncementBar } from './AnnouncementBar';
import { StorefrontNav } from './StorefrontNav';
import { StorefrontHero } from './StorefrontHero';
import { StorefrontCategoryTabs } from './StorefrontCategoryTabs';
import { StorefrontGrid } from './StorefrontGrid';
import { StorefrontHorizontalRail } from './StorefrontHorizontalRail';
import { StorefrontCategoryTiles } from './StorefrontCategoryTiles';
import { StorefrontFooter } from './StorefrontFooter';

export const SiteA: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on selected category tab
  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="w-full bg-stage-base min-h-screen text-text-primary selection:bg-metal-primary selection:text-black">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Storefront Nav */}
      <StorefrontNav />

      {/* 3. Asymmetric Split Hero & Crossfading Slideshow */}
      <StorefrontHero />

      {/* 4. Category Tabs with Active 6px Dot */}
      <StorefrontCategoryTabs
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 5. Product Grid with Collapsed Shared Hairlines */}
      <StorefrontGrid products={filteredProducts} />

      {/* 6. Wheel-Hijacked Kinetic Horizontal Rail */}
      <StorefrontHorizontalRail products={PRODUCTS} />

      {/* 7. Category Tiles with 180° Rotated Vertical Typography */}
      <StorefrontCategoryTiles />

      {/* 8. Mega Footer */}
      <StorefrontFooter />
    </div>
  );
};
