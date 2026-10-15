import React from 'react';
import { ChevronRight } from 'lucide-react';

export const AutonomousPipeline: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Brief & CAD Ingestion',
      desc: 'Upload phone photos or 3DM CAD files with carat weight and metal alloy specifications.',
      tag: 'Raw Asset Ingest',
    },
    {
      step: '02',
      title: 'Alloy Physics Lock',
      desc: 'Calibrate refractive index and warm +150K balance for antique yellow, rose, or white gold.',
      tag: 'True Specular Physics',
    },
    {
      step: '03',
      title: 'Prompt Rig Lockdown',
      desc: 'Lock immutable RIG-STUDIO-CG or RIG-EDITORIAL prompts with strict negative token filters.',
      tag: 'Deterministic Generation',
    },
    {
      step: '04',
      title: '12-Angle Synthesis',
      desc: 'Render the complete 12-angle multi-perspective sequence with guaranteed zero prong or stone facet drift.',
      tag: 'Multi-Perspective Verification',
    },
    {
      step: '05',
      title: 'Omnichannel Staging',
      desc: 'Automated formatting into 16:9 banners, 4:5 social campaign reels, and 1:1 catalog squares.',
      tag: 'Multi-Format Crops',
    },
    {
      step: '06',
      title: '8K Master Delivery',
      desc: 'Receive master 8K WebP files, transparent PNG cutouts, and 300 DPI CMYK print TIFFs.',
      tag: 'Full Copyright Buyout',
    },
  ];

  return (
    <section id="pipeline" className="py-24 md:py-32 bg-[#040404] text-white border-b border-hairline">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>6-STAGE AUTONOMOUS PIPELINE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mb-3">
            From Raw Phone Snap to Vogue Spread
          </h2>
          <p className="text-white/60 text-sm font-sans font-light">
            A frictionless, repeatable production protocol delivering luxury visuals in 48 hours without shipping gems.
          </p>
        </div>

        {/* 6 Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline">
          {steps.map((s) => (
            <div
              key={s.step}
              
              className="p-8 border-r border-b border-hairline bg-[#080808] hover:bg-black transition-colors flex flex-col justify-between group min-h-[240px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl text-accent font-normal group-hover:text-white transition-colors">
                    {s.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-accent">
                    PHASE {s.step}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-white font-normal mb-2">
                  {s.title}
                </h3>

                <p className="text-white/60 text-xs font-sans leading-relaxed mb-4 font-light">
                  {s.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-accent transition-colors">
                <span>{s.tag}</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
