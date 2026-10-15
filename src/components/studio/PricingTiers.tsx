import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck, FileCheck, Receipt } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  period: string;
  featured?: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

export const PricingTiers: React.FC = () => {
  const tiers: PricingTier[] = [
    {
      id: 'pilot',
      name: 'Flagship Pilot',
      subtitle: 'Calibrate the AI studio on your hero pieces',
      price: '₹1,25,000',
      period: 'per collection drop',
      features: [
        '5 Master SKUs rendered under RIG-STUDIO-CG',
        'Complete 12-Angle Consistency Runway for hero SKU',
        '15 Omnichannel ad variants (1:1, 4:5, 16:9)',
        '1:1 Transparent PNG-32 cutouts (zero fringe)',
        '48-Hour delivery & 100% commercial buyout',
      ],
      cta: 'Commission Pilot SKU',
    },
    {
      id: 'seasonal',
      name: 'Atelier Seasonal',
      subtitle: 'Complete seasonal catalog & digital campaign drop',
      price: '₹3,85,000',
      period: 'per seasonal drop',
      featured: true,
      badge: 'MOST COMMISSIONED',
      features: [
        '20 Master SKUs with complete multi-angle consistency',
        '60 Omnichannel ad variants across silk & slate',
        '3DM CAD & unedited phone photo ingestion',
        'Custom alloy lock (Yellow, Rose, Polki Champagne)',
        'Raw layered PSDs + 300 DPI CMYK print TIFFs',
        'Dedicated Art Director & 48-hour priority SLA',
      ],
      cta: 'Initiate Seasonal Drop',
    },
    {
      id: 'enterprise',
      name: 'Maison Enterprise',
      subtitle: 'Continuous volume throughput for luxury export houses',
      price: '₹8,50,000',
      period: 'monthly retainer',
      features: [
        'Continuous SKU throughput across brand collections',
        'Multi-category support (High Jewelry, Polki, Watches)',
        'Private dedicated pipeline with Lead Prompt Engineer',
        'Custom lighting & heritage showroom replica presets',
        'Dedicated secure encrypted cloud asset vault',
        'Direct GST invoicing & Surat/Mumbai bourse workflow',
      ],
      cta: 'Engage Enterprise Pipeline',
    },
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 md:py-36 bg-[#020202] text-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header with WhileInView Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Sparkles className="w-3 h-3 text-accent animate-pulse" />
            <span>TRANSPARENT COMMERCIAL LICENSING</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight mb-4">
            Predictable unit economics. <span className="italic font-light text-accent">Zero studio overhead.</span>
          </h2>

          <p className="text-white/50 text-xs sm:text-sm font-sans max-w-xl mx-auto font-light leading-relaxed">
            Every tier includes 100% irrevocable commercial copyright buyout, 8K WebP master assets, and zero recurring royalties on global ad spend.
          </p>
        </motion.div>

        {/* 3 Tiers Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          {tiers.map((tier) => {
            const isFeatured = !!tier.featured;
            return (
              <motion.div
                key={tier.id}
                variants={{
                  hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className={`relative rounded-sm p-8 sm:p-9 flex flex-col justify-between transition-all duration-500 group ${
                  isFeatured
                    ? 'bg-[#0B0B0B] text-white border border-accent shadow-[0_0_40px_rgba(251,255,141,0.12)] hover:shadow-[0_0_55px_rgba(251,255,141,0.22)] lg:-translate-y-2 z-10'
                    : 'bg-[#060606] text-white border border-white/10 hover:border-white/30 hover:shadow-[0_12px_36px_rgba(0,0,0,0.8)]'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-black px-4 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span>{tier.badge}</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 font-normal">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-white/50 font-sans font-light leading-relaxed">
                      {tier.subtitle}
                    </p>
                  </div>

                  {/* Price in INR */}
                  <div className="mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl sm:text-5xl text-accent font-normal tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-[11px] font-mono uppercase text-white/40 tracking-wider">
                        / {tier.period}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-10 text-xs font-sans">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                        <span className="text-white/80 font-light leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action Button */}
                <a
                  href="#brief"
                  className={`w-full py-4 rounded-full font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 text-center flex items-center justify-center gap-2 group active:scale-95 cursor-pointer ${
                    isFeatured
                      ? 'bg-accent text-black hover:bg-white shadow-lg hover:shadow-[0_0_28px_rgba(251,255,141,0.4)]'
                      : 'border border-white/20 text-white hover:border-accent hover:text-accent hover:bg-white/5 hover:shadow-[0_0_20px_rgba(251,255,141,0.15)]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Commercial Trust & Procurement Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-18 p-6 rounded-sm bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs font-mono text-white/50"
        >
          <div className="flex items-center gap-2.5 hover:text-white/80 transition-colors cursor-default group">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
            <span>100% Irrevocable Commercial Copyright Buyout Included</span>
          </div>

          <div className="flex items-center gap-2.5 hover:text-white/80 transition-colors cursor-default group">
            <FileCheck className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
            <span>Zero Recurring Royalties on Meta & Google Ad Spend</span>
          </div>

          <div className="flex items-center gap-2.5 hover:text-white/80 transition-colors cursor-default group">
            <Receipt className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
            <span>GST-Compliant B2B Invoicing · Surat & Mumbai SLA</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
