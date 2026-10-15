import React from 'react';
import { STUDIO_STATS } from '../../data/studio';

export const StatsRow: React.FC = () => {
  return (
    <section id="stats" className="py-20 md:py-28 bg-black text-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {STUDIO_STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              {/* Hairline w-24 rule above each (Section 6.7) */}
              <div className="w-24 h-px bg-white/20 mb-6" />

              {/* Bodoni italic numerals (Section 6.7) */}
              <div className="font-display italic text-5xl sm:text-6xl text-metal-primary font-normal mb-2 tracking-tight">
                {stat.value}
              </div>

              {/* Label */}
              <h3 className="font-display text-lg text-white font-normal mb-1">
                {stat.label}
              </h3>

              {/* Detail */}
              <p className="text-xs text-white/50 font-mono">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
