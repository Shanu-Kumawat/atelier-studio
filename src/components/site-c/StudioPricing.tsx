import React from 'react';
import { STUDIO_PRICING } from '../../data/studio';
import { Check, Sparkles } from 'lucide-react';

export const StudioPricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-stage-surface text-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
            <span className="text-[0.6875rem] uppercase tracking-[0.25em] text-metal-highlight font-mono">
              TRANSPARENT COMMERCIAL LICENSING · SECTION 6.8
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-4">
            Studio Retainers & Commission Tiers
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-body leading-relaxed max-w-xl mx-auto">
            All tiers include 100% irrevocable commercial copyright transfer, 2× retina WebP archives,
            and print-ready 300 DPI CMYK master files.
          </p>
        </div>

        {/* 3 tiers, centre tier on ink.primary bg, cream text, slight scale (Section 6.8) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {STUDIO_PRICING.map((tier) => {
            const isCentre = !!tier.featured;
            return (
              <div
                key={tier.id}
                className={`relative rounded-sm border p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                  isCentre
                    ? 'bg-[#141414] text-[#F9F4F0] border-metal-primary shadow-2xl lg:scale-105 z-10 ring-1 ring-metal-primary/40'
                    : 'bg-black text-white border-hairline hover:border-white/30'
                }`}
              >
                {/* Featured Badge */}
                {isCentre && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-metal-primary text-black px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> MOST REQUESTED TIER
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="font-display text-2xl text-white mb-2 font-normal">
                      {tier.name}
                    </h3>
                    <p className={`text-xs ${isCentre ? 'text-[#D5CFC9]' : 'text-white/60'} font-body leading-relaxed`}>
                      {tier.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-8 pb-6 border-b border-hairline">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl sm:text-5xl text-metal-highlight font-normal">
                        {tier.price}
                      </span>
                      <span className={`text-xs font-mono uppercase tracking-wider ${isCentre ? 'text-[#A09A94]' : 'text-white/40'}`}>
                        / {tier.period.split(' ')[0]}
                      </span>
                    </div>
                    <span className={`text-[11px] block mt-1 ${isCentre ? 'text-[#C8A45C]' : 'text-white/40'} font-mono`}>
                      {tier.period}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3.5 mb-10 text-xs font-body">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-metal-primary shrink-0 mt-0.5" />
                        <span className={isCentre ? 'text-[#EFEAE4]' : 'text-white/80'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <a
                  href="#brief"
                  className={`w-full py-4 rounded-full font-body text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 text-center block ${
                    isCentre
                      ? 'bg-metal-primary text-black hover:bg-metal-highlight shadow-lg hover:shadow-metal-primary/20'
                      : 'border border-hairline text-white hover:border-metal-primary hover:text-metal-primary'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
