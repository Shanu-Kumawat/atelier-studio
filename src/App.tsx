import React, { useState } from 'react';
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

export const App: React.FC = () => {
  const [selectedAngle, setSelectedAngle] = useState<AngleSpec | null>(null);

  return (
    <div className="min-h-screen bg-obsidian text-white selection:bg-accent selection:text-black">
      {/* 1. Top Global Ambient Progress Bar */}
      <TopProgressBar />

      {/* 2. Studio Minimalist Navigation */}
      <StudioNavbar />

      <main>
        {/* 3. Cinematic Hero with Video Background (soscale & luxury-focus inspired) */}
        <CinematicHero />

        {/* 4. 10-Angle Multi-Perspective Scroll Runway (prmpt_template scattered grid & scaling) */}
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
