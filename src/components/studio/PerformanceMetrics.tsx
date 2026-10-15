import React from 'react';
import { motion } from 'framer-motion';

export const PerformanceMetrics: React.FC = () => {
  const stats = [
    {
      value: '4×',
      label: 'Faster Catalogue Turnaround',
      detail: 'From 6 weeks physical studio hire to 48-hour delivery',
    },
    {
      value: '120+',
      label: 'Master SKUs Per Batch',
      detail: 'Unwavering gold tone consistency across hundreds of items',
    },
    {
      value: '0%',
      label: 'Prong & Gemstone Drift',
      detail: 'Deterministic raytracing locks exact stone facet geometry',
    },
    {
      value: '84%',
      label: 'Production Cost Reduction',
      detail: 'Eliminating insured freight, set models, and studio rental',
    },
  ];

  return (
    <section id="metrics" className="py-24 sm:py-32 md:py-36 bg-[#020202] text-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 36, filter: 'blur(6px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="flex flex-col group"
            >
              {/* Animated hairline rule */}
              <div className="w-16 h-px bg-white/20 mb-6 group-hover:w-24 group-hover:bg-accent transition-all duration-500 origin-left" />

              {/* Instrument Serif italic numeral */}
              <div className="font-serif italic text-6xl sm:text-7xl lg:text-8xl text-accent font-normal mb-3 tracking-tight group-hover:translate-x-1 group-hover:drop-shadow-[0_0_28px_rgba(251,255,141,0.35)] transition-all duration-300">
                {stat.value}
              </div>

              {/* Label */}
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2 leading-tight group-hover:text-white transition-colors">
                {stat.label}
              </h3>

              {/* Detail */}
              <p className="text-xs text-white/50 font-sans leading-relaxed font-light">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
