import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { EditorialNav } from './EditorialNav';
import { EditorialHero } from './EditorialHero';
import { CollectionsShowcase } from './CollectionsShowcase';
import { EditorialHeritage } from './EditorialHeritage';
import { EditorialCraftsmanship } from './EditorialCraftsmanship';
import { EditorialGallery } from './EditorialGallery';
import { EditorialContactFooter } from './EditorialContactFooter';

export const SiteB: React.FC = () => {
  // Initialize Lenis smooth scroll for Site B (Section 5 requirement)
  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full bg-black min-h-screen text-white selection:bg-metal-primary selection:text-black">
      {/* 1. Transparent Nav with 50px Blur Transition */}
      <EditorialNav />

      {/* 2. 100vh Full-Bleed Editorial Hero */}
      <EditorialHero />

      {/* 3. Pinned 400vh Runway Centrepiece */}
      <CollectionsShowcase />

      {/* 4. Asymmetric Heritage with clip-path: inset() Mask Reveal */}
      <EditorialHeritage />

      {/* 5. 150vh Craftsmanship with Rotating Dashed Precision Motif */}
      <EditorialCraftsmanship />

      {/* 6. Pinned Horizontal Gallery with Velocity Skew & Lightbox */}
      <EditorialGallery />

      {/* 7. Concierge Salon Contact & Mega Footer */}
      <EditorialContactFooter />
    </div>
  );
};
