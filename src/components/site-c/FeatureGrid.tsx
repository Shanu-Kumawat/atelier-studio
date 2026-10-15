import React from 'react';
import { FEATURES } from '../../data/studio';
import { ArrowUpRight } from 'lucide-react';

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-32 bg-black text-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
            <span className="text-[0.6875rem] uppercase tracking-[0.25em] text-metal-highlight font-mono">
              STUDIO CAPABILITIES MATRIX · SECTION 6.5
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-4">
            Autonomous Commercial Art Direction
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-body leading-relaxed">
            Every feature is engineered to replace expensive physical photography crews without
            sacrificing the haptic, light-refracting nuances of high jewelry.
          </p>
        </div>

        {/* 6 cells feature grid. Hover inverts (bg-ink -> text-paper) (Section 6.5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-hairline">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="group relative border-r border-b border-hairline p-8 sm:p-10 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[300px] bg-black hover:bg-[#F9F4F0] hover:text-[#1A1A1A]"
            >
              <div>
                {/* Number & Arrow */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs text-metal-primary group-hover:text-[#C8A45C] tracking-widest font-semibold transition-colors">
                    {feat.number}
                  </span>
                  <span className="p-2 rounded-full border border-white/10 group-hover:border-[#1A1A1A]/20 text-white/50 group-hover:text-[#1A1A1A] transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-white group-hover:text-[#1A1A1A] font-normal mb-4 transition-colors">
                  {feat.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 group-hover:text-[#555555] text-xs sm:text-sm font-body leading-relaxed transition-colors">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 group-hover:border-[#E5DED5] flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-[#888888] transition-colors">
                <span>LOCK MATRIX COMPLIANT</span>
                <span className="text-metal-primary group-hover:text-[#C8A45C]">24H TURNAROUND</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
