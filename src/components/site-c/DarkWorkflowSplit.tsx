import React from 'react';
import { WORKFLOW_STEPS } from '../../data/studio';
import { ArrowRight, ChevronRight } from 'lucide-react';

export const DarkWorkflowSplit: React.FC = () => {
  return (
    <section id="workflow" className="py-24 md:py-32 bg-stage-surface text-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
            <span className="text-[0.6875rem] uppercase tracking-[0.25em] text-metal-highlight font-mono">
              END-TO-END PIPELINE · SECTION 6.6
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-4">
            The Studio Synthesis Pipeline
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-body leading-relaxed">
            From raw bench CAD files to omnichannel luxury deployment across storefronts and high-converting ad units.
          </p>
        </div>

        {/* 6 Steps, Numbered, Hairline-ruled (Section 6.6) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-hairline">
          {WORKFLOW_STEPS.map((item) => (
            <div
              key={item.step}
              className="p-8 sm:p-10 border-r border-b border-hairline bg-black/40 hover:bg-black transition-colors flex flex-col justify-between group"
            >
              <div>
                {/* Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-3xl text-metal-primary group-hover:text-metal-highlight transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-white/60">
                    STAGE 0{item.step}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl text-white font-normal mb-3">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-white/70 text-xs sm:text-sm font-body leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Subtext Hairline-ruled */}
              <div className="pt-4 border-t border-hairline flex items-center justify-between text-[10px] font-mono text-metal-hairline">
                <span>{item.subtext}</span>
                <ChevronRight className="w-3.5 h-3.5 text-metal-primary transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
