import React, { useEffect, useState } from 'react';
import { TopProgressBar } from './components/studio/TopProgressBar';
import { StudioNavbar } from './components/studio/StudioNavbar';
import { CinematicHero } from './components/studio/CinematicHero';
import { TenAngleScrollRunway } from './components/studio/TenAngleScrollRunway';
import { BeforeAfterComparison } from './components/studio/BeforeAfterComparison';
import { InteractiveAdStudioMock } from './components/studio/InteractiveAdStudioMock';
import { PerformanceMetrics } from './components/studio/PerformanceMetrics';
import { PricingTiers } from './components/studio/PricingTiers';
import { BriefIntakePortal } from './components/studio/BriefIntakePortal';
import { StudioFooter } from './components/studio/StudioFooter';
import { AngleDetailModal } from './components/studio/AngleDetailModal';
import { AngleSpec } from './data/angles';
import { initLenis, destroyLenis, scrollToId } from './lib/lenis';
import { LuxuryCursor } from './components/studio/LuxuryCursor';

export const App: React.FC = () => {
  const [selectedAngle, setSelectedAngle] = useState<AngleSpec | null>(null);

  // Buttery inertial scrolling (skipped under prefers-reduced-motion)
  useEffect(() => {
    initLenis();
    return () => destroyLenis();
  }, []);

  // Route in-page anchor links through Lenis with a fixed-header offset
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href')!.slice(1);
      if (!document.getElementById(id)) return;
      e.preventDefault();
      scrollToId(id, id === 'hero' ? 0 : -70);
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-white selection:bg-accent selection:text-black">
      {/* 1. Top Global Ambient Progress Bar */}
      <TopProgressBar />

      {/* 0. Bespoke Luxury Cursor (fine pointers only) */}
      <LuxuryCursor />

      {/* 2. Studio Minimalist Navigation */}
      <StudioNavbar />

      <main>
        {/* 3. Cinematic Hero with Video Background (soscale & luxury-focus inspired) */}
        <CinematicHero />

        {/* 4. 12-Angle Multi-Perspective Scroll Runway (Scattered Grid & Scaling) */}
        <TenAngleScrollRunway onSelectAngle={setSelectedAngle} />

        {/* 5. Draggable Before/After Transformation Slider & Economics */}
        <BeforeAfterComparison />

        {/* 6. Live Facsimile: Multi-Variant Ad Engine & Prompt Matrix */}
        <InteractiveAdStudioMock />

        {/* 8. Performance Impact & Turnaround Metrics */}
        <PerformanceMetrics />

        {/* 9. Commercial Studio Tiers & Copyright Licensing */}
        <PricingTiers />

        {/* 10. Native Accessible Commission Brief Intake Portal */}
        <BriefIntakePortal />
      </main>

      {/* 11. Luxury Mega Footer */}
      <StudioFooter />

      {/* 12. Fullscreen Angle Telemetry Modal */}
      <AngleDetailModal
        angle={selectedAngle}
        onClose={() => setSelectedAngle(null)}
        onNavigate={setSelectedAngle}
      />
    </div>
  );
};

export default App;
