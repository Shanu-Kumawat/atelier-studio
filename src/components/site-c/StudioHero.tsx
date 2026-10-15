import React from 'react';
import { Sparkles, ArrowRight, Layers, ShieldCheck } from 'lucide-react';

export const StudioHero: React.FC = () => {
  return (
    <section className="relative py-24 md:py-32 bg-black text-white overflow-hidden border-b border-hairline">
      {/* Background Subtle Antique Gold Ambient Radial */}
      <div className="absolute w-[800px] h-[800px] rounded-full bg-metal-primary/[0.04] blur-[160px] pointer-events-none top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        {/* Eyebrow Pill "AI catalogue + ad studio" */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-metal-primary/30 text-metal-highlight text-xs font-mono tracking-[0.25em] uppercase mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-metal-primary animate-pulse" />
          <span>AI Catalogue + Ad Studio</span>
          <span className="w-1.5 h-1.5 rounded-full bg-metal-primary animate-pulse" />
        </div>

        {/* Display Headline */}
        <h1 className="font-display text-hero text-white font-normal max-w-5xl leading-[0.95] mb-8">
          The Photographic Rig
          <span className="italic block text-metal-primary font-normal mt-2">
            Replaced by Physics.
          </span>
        </h1>

        {/* Narrative */}
        <p className="max-w-2xl mx-auto text-white/70 text-base md:text-lg font-body leading-relaxed mb-10">
          We generate production-grade e-commerce catalogues and editorial advertising for the world’s
          most exacting luxury jewelry houses. Locked metal science, zero hallucination, and 48-hour delivery.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <a
            href="#demo-mock"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-metal-primary text-black font-body text-xs uppercase tracking-[0.22em] font-medium hover:bg-metal-highlight transition-all duration-300 shadow-lg hover:shadow-metal-primary/20 flex items-center justify-center gap-2"
          >
            <span>Inspect Live Variant Mock</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#brief"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white hover:border-metal-primary hover:text-metal-primary transition-all text-xs uppercase tracking-[0.2em] font-mono flex items-center justify-center gap-2"
          >
            <span>Commission Studio Drop</span>
          </a>
        </div>

        {/* Micro Guarantee Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-hairline w-full max-w-4xl text-left">
          <div>
            <span className="block text-xs uppercase font-mono text-metal-primary mb-1">Color Calibration</span>
            <span className="text-xs text-white/50">18K Antique Gold ±150K locked</span>
          </div>
          <div>
            <span className="block text-xs uppercase font-mono text-metal-primary mb-1">Optical Engine</span>
            <span className="text-xs text-white/50">100mm Macro f/8 & 85mm f/2.8</span>
          </div>
          <div>
            <span className="block text-xs uppercase font-mono text-metal-primary mb-1">Cutout Fidelity</span>
            <span className="text-xs text-white/50">Alpha clean on #000 & #F9F4F0</span>
          </div>
          <div>
            <span className="block text-xs uppercase font-mono text-metal-primary mb-1">Commercial Buyout</span>
            <span className="text-xs text-white/50">100% Royalty-free copyright transfer</span>
          </div>
        </div>
      </div>
    </section>
  );
};
