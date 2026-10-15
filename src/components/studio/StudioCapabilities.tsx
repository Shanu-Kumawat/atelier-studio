import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const StudioCapabilities: React.FC = () => {
  const capabilities = [
    {
      number: '01',
      title: 'Commercial Catalogue Renders',
      subtitle: 'RIG-STUDIO-CG',
      desc: 'Seamless matte sweep (#0A0A0A to #1A1A1A), softbox key upper left, black flag definition, and white bounce fill at 30%.',
      tag: '100mm Macro · f/8',
    },
    {
      number: '02',
      title: 'High-Fashion Editorial',
      subtitle: 'RIG-EDITORIAL',
      desc: 'Dramatic low-key studio lighting with deep raking shadows and 3200K warm practical bokeh.',
      tag: '85mm Macro · f/2.8',
    },
    {
      number: '03',
      title: '12-Angle Consistency',
      subtitle: 'Geometry Lock',
      desc: 'Rotates camera elevation from +15° overhead to 90° zenith without prong distortion or alloy color shift.',
      tag: '0% Model Drift',
    },
    {
      number: '04',
      title: 'Omnichannel Suites',
      subtitle: 'Multi-Format Output',
      desc: 'Automatically formatted for 16:9 website banners, 4:5 social reels, and 1:1 catalog tiles.',
      tag: '16:9 · 4:5 · 1:1 Crops',
    },
    {
      number: '05',
      title: 'Alpha Cutout Isolation',
      subtitle: 'Zero Fringe',
      desc: '1:1 transparent PNG-32 cutouts with edge-aware de-matting for dark and light e-commerce storefronts.',
      tag: 'Tested on #000 & #FAF9F5',
    },
    {
      number: '06',
      title: 'Print-Ready 300 DPI',
      subtitle: 'Full Copyright Buyout',
      desc: 'Exported in 8K retina WebP and 300 DPI CMYK print TIFFs with 100% commercial ownership.',
      tag: 'Full Copyright Buyout',
    },
  ];

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-black text-white border-b border-hairline">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>STUDIO CAPABILITIES</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mb-3">
            Autonomous Luxury Art Direction
          </h2>
          <p className="text-white/60 text-sm font-sans font-light">
            Mathematically validated optical generation replacing six-week physical studio hires.
          </p>
        </div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline">
          {capabilities.map((cap) => (
            <div
              key={cap.number}
              
              className="group relative border-r border-b border-hairline p-8 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[280px] bg-black hover:bg-[#FAF9F5] hover:text-[#121212]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs text-accent group-hover:text-black tracking-widest font-bold transition-colors">
                    {cap.number}
                  </span>
                  <span className="p-1.5 rounded-full border border-white/10 group-hover:border-black/20 text-white/50 group-hover:text-black transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-white group-hover:text-black font-normal mb-1 transition-colors">
                  {cap.title}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-accent group-hover:text-[#666666] block mb-3 transition-colors">
                  {cap.subtitle}
                </span>

                <p className="text-white/70 group-hover:text-[#444444] text-xs font-sans leading-relaxed transition-colors font-light">
                  {cap.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 group-hover:border-[#E5DED5] flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-[#888888] transition-colors">
                <span>{cap.tag}</span>
                <span className="text-accent group-hover:text-black font-semibold">48H DELIVERY</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
