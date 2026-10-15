import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export const PricingTiers: React.FC = () => {
  const tiers = [
    {
      id: 'pilot',
      name: 'Flagship Pilot',
      subtitle: 'Calibrate the AI studio on your hero piece',
      price: '$2,400',
      period: 'per collection drop',
      features: [
        '5 Master SKUs rendered under RIG-STUDIO-CG',
        'Complete 10-Angle Consistency Matrix for hero SKU',
        '15 Editorial ad stills (16:9, 4:5, 1:1)',
        '1:1 Transparent PNG cutouts (zero fringe)',
        '48-hour delivery & full commercial buyout',
      ],
      cta: 'Commission Pilot',
    },
    {
      id: 'seasonal',
      name: 'Atelier Seasonal',
      subtitle: 'Complete seasonal collection launch',
      price: '$6,800',
      period: 'per seasonal drop',
      featured: true,
      features: [
        '20 Master SKUs with complete multi-angle consistency',
        '60 Omnichannel ad variants with copy testing',
        'Interactive digital lookbook & line-sheet',
        'Custom gold alloy lock (Yellow, Rose, Champagne)',
        'Dedicated art director & 2 revision cycles',
        'Priority 48-hour delivery timeline',
      ],
      cta: 'Initiate Seasonal Drop',
    },
    {
      id: 'enterprise',
      name: 'Maison Enterprise',
      subtitle: 'Continuous luxury drops and omnichannel ad pipelines',
      price: '$14,500',
      period: 'monthly retainer',
      features: [
        'Unlimited SKU throughput across drops',
        'Instant vertical swap (Jewelry to Couture)',
        'Custom lighting presets matching brand heritage',
        'Private Slack pipeline with direct prompt engineer access',
        'Raw layered PSDs + 300 DPI CMYK print certification',
      ],
      cta: 'Engage Enterprise',
    },
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#040404] text-white border-b border-hairline">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>TRANSPARENT LICENSING</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mb-3">
            Commercial Studio Tiers
          </h2>
          <p className="text-white/60 text-sm font-sans max-w-lg mx-auto font-light">
            Every commission includes 100% irrevocable commercial copyright transfer, 8K WebP files, and zero recurring royalties.
          </p>
        </div>

        {/* 3 Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-7xl mx-auto">
          {tiers.map((tier) => {
            const isFeatured = !!tier.featured;
            return (
              <div
                key={tier.id}
                
                className={`relative rounded-sm border p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#0D0D0D] text-white border-accent shadow-2xl lg:scale-105 z-10 ring-1 ring-accent/30'
                    : 'bg-black text-white border-white/10 hover:border-white/30'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-bold flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="font-serif text-3xl text-white mb-1.5 font-normal">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-white/50 font-sans font-light">
                      {tier.subtitle}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-5xl text-accent font-normal">
                        {tier.price}
                      </span>
                      <span className="text-xs font-mono uppercase text-white/40">
                        / {tier.period.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 text-xs font-sans">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="text-white/80 font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <a
                  href="#brief"
                  
                  className={`w-full py-3.5 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 text-center block ${
                    isFeatured
                      ? 'bg-accent text-black hover:bg-white shadow-lg'
                      : 'border border-white/20 text-white hover:border-accent hover:text-accent'
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
