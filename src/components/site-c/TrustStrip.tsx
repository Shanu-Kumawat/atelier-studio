import React from 'react';
import { TRUST_CLIENTS } from '../../data/studio';

export const TrustStrip: React.FC = () => {
  return (
    <section className="py-12 bg-black border-b border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-white/40 block mb-6">
          Calibrated for Prestigious Jewelry Maisons Worldwide
        </span>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20">
          {TRUST_CLIENTS.map((client) => (
            <div key={client.name} className="flex flex-col items-center group">
              <span className="font-display text-lg sm:text-xl tracking-[0.22em] text-white/60 group-hover:text-metal-primary transition-colors select-none">
                {client.name}
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 group-hover:text-metal-highlight transition-colors mt-0.5">
                {client.city}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
