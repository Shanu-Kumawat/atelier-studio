import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Cpu, ShieldCheck } from 'lucide-react';

export const StudioFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020202] text-white border-t border-hairline pt-20 sm:pt-28 pb-12 sm:pb-16 overflow-hidden">
      
      {/* Subtle Ambient Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-accent/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main 4-Column Grid with WhileInView Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 sm:pb-20 border-b border-white/10"
        >
          
          {/* Column 1: Brand Info & Architectural Monogram (4 cols) */}
          <div className="lg:col-span-4">
            <a href="#hero" className="inline-flex items-center gap-3 mb-5 group cursor-pointer">
              {/* Architectural Step-Cut Diamond Monogram */}
              <div className="relative flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-accent transition-transform duration-700 ease-out group-hover:rotate-90 shrink-0"
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                >
                  <polygon points="12,4 28,4 36,12 36,28 28,36 12,36 4,28 4,12" strokeWidth="1.2" strokeLinejoin="round" />
                  <polygon points="20,10 30,20 20,30 10,20" strokeWidth="1" strokeDasharray="1.5 2" />
                  <line x1="12" y1="4" x2="20" y2="10" strokeWidth="0.8" opacity="0.6" />
                  <line x1="28" y1="4" x2="20" y2="10" strokeWidth="0.8" opacity="0.6" />
                  <line x1="36" y1="12" x2="30" y2="20" strokeWidth="0.8" opacity="0.6" />
                  <line x1="36" y1="28" x2="30" y2="20" strokeWidth="0.8" opacity="0.6" />
                  <line x1="28" y1="36" x2="20" y2="30" strokeWidth="0.8" opacity="0.6" />
                  <line x1="12" y1="36" x2="20" y2="30" strokeWidth="0.8" opacity="0.6" />
                  <line x1="4" y1="28" x2="10" y2="20" strokeWidth="0.8" opacity="0.6" />
                  <line x1="4" y1="12" x2="10" y2="20" strokeWidth="0.8" opacity="0.6" />
                  <circle cx="20" cy="20" r="1.5" fill="currentColor" />
                </svg>
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              <span className="font-serif text-2xl tracking-[0.24em] text-white uppercase font-normal group-hover:text-accent transition-colors">
                ATELIER AI STUDIO
              </span>
            </a>

            <p className="text-white/60 text-xs sm:text-sm font-sans max-w-sm mb-6 leading-relaxed font-light">
              Autonomous AI jewelry catalog and marketing ad studio. Delivering mathematically locked optical renders for luxury Maisons and diamond manufacturers, replacing multi-week physical photo shoots.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span>RIG-STUDIO-CG · 12-ANGLE INVARIANCE ACTIVE</span>
            </div>
          </div>

          {/* Column 2: Bourses & Representation (3 cols) */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 block mb-5">
              Bourses & Representation
            </span>
            <ul className="space-y-4 text-xs text-white/70 font-sans leading-relaxed">
              <li>
                <strong className="text-white block font-medium tracking-wide">Mumbai Bourse Hub</strong>
                Bharat Diamond Bourse, Bandra Kurla Complex, 400051
              </li>
              <li>
                <strong className="text-white block font-medium tracking-wide">Surat Manufacturing</strong>
                Surat Diamond Bourse, DREAM City, Khajod, 395007
              </li>
              <li>
                <strong className="text-white block font-medium tracking-wide">European Atelier</strong>
                28 Place Vendôme, 75001 Paris, France
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation Links (2 cols) */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 block mb-5">
              Architecture
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-white/60 font-mono">
              <li>
                <a href="#ten-angle-runway" className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                  12-Angle Runway
                </a>
              </li>
              <li>
                <a href="#before-after" className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                  Before / After
                </a>
              </li>
              <li>
                <a href="#interactive-mock" className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                  Campaign Matrix
                </a>
              </li>
              <li>
                <a href="#metrics" className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                  Performance
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                  Commercial Tiers
                </a>
              </li>
              <li>
                <a href="#brief" className="hover:text-accent hover:translate-x-1 inline-block transition-all duration-200">
                  Commission Brief
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: System Telemetry & Back to Top (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between items-start lg:items-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-white/70 hover:text-black hover:bg-accent border border-white/15 hover:border-accent hover:shadow-[0_0_20px_rgba(251,255,141,0.25)] active:scale-95 transition-all shadow-sm cursor-pointer group"
              aria-label="Scroll back to top"
            >
              <span>Return to Summit</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-1" />
            </button>

            <div className="text-left lg:text-right mt-8 lg:mt-0">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                SYSTEM TELEMETRY
              </span>
              <span className="text-xs font-mono text-accent flex items-center lg:justify-end gap-1.5 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>NODES OPERATIONAL · &lt;24MS</span>
              </span>
            </div>
          </div>

        </motion.div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} ATELIER AI STUDIO. ALL COMMERCIAL ASSET LICENSES ASSIGNED.
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px] sm:text-xs">
            <span className="text-accent">SIGNATURE ACCENT: #FBFF8D</span>
            <span>COLOR SCIENCE: NEUTRAL +150K</span>
            <span className="flex items-center gap-1.5 text-white/60">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>100% CAD INVARIANCE</span>
            </span>
          </div>
        </div>

      </div>

      {/* Monumental Architectural Watermark Across Lower Canvas */}
      <div className="w-full text-center mt-12 sm:mt-16 select-none pointer-events-none overflow-hidden leading-none">
        <span className="font-serif text-[15vw] tracking-[0.18em] text-white/[0.025] uppercase block whitespace-nowrap">
          ATELIER
        </span>
      </div>

    </footer>
  );
};
