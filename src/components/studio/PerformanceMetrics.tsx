import React from 'react';

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
    <section className="py-24 md:py-32 bg-black text-white border-b border-hairline">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Hairline w-24 rule above each */}
              <div className="w-24 h-px bg-white/20 mb-6" />

              {/* Instrument Serif italic numerals */}
              <div className="font-serif italic text-6xl sm:text-7xl lg:text-8xl text-accent font-normal mb-3 tracking-tight">
                {stat.value}
              </div>

              {/* Label */}
              <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2 leading-tight">
                {stat.label}
              </h3>

              {/* Detail */}
              <p className="text-xs text-white/50 font-sans leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
