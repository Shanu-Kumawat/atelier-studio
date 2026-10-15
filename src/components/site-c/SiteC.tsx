import React from 'react';
import { StudioNav } from './StudioNav';
import { StudioHero } from './StudioHero';
import { EmbeddedProductMock } from './EmbeddedProductMock';
import { TrustStrip } from './TrustStrip';
import { FeatureGrid } from './FeatureGrid';
import { DarkWorkflowSplit } from './DarkWorkflowSplit';
import { StatsRow } from './StatsRow';
import { StudioPricing } from './StudioPricing';
import { BriefIntakeForm } from './BriefIntakeForm';
import { StudioFooter } from './StudioFooter';

export const SiteC: React.FC = () => {
  return (
    <div className="w-full bg-black min-h-screen text-white selection:bg-metal-primary selection:text-black">
      {/* 1. Sticky Nav: Product / Work / Pricing / Brief */}
      <StudioNav />

      {/* 2. Hero with Eyebrow Pill and Dual CTA */}
      <StudioHero />

      {/* 3. Embedded Product Mock (Site A facsimile with Generating pill & Variants A/B/C switcher) */}
      <EmbeddedProductMock />

      {/* 4. Trust Strip with Client Names */}
      <TrustStrip />

      {/* 5. 6-cell Feature Grid with Hover Inversion to Cream Paper */}
      <FeatureGrid />

      {/* 6. Dark Workflow Split: 6 Numbered Pipeline Steps */}
      <DarkWorkflowSplit />

      {/* 7. Stats Row: 4x Turnaround, 120+ SKUs, 30+ Variants, 3 Channels with Bodoni Italic Numerals */}
      <StatsRow />

      {/* 8. Pricing: 3 Tiers, Centre Tier on ink.primary with Scale */}
      <StudioPricing />

      {/* 9. Native Accessible Brief Intake Form with Bodoni Moda Labels and Underline Focus */}
      <BriefIntakeForm />

      {/* 10. Mega Footer */}
      <StudioFooter />
    </div>
  );
};
