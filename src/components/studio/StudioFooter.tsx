import React from 'react';
import { ArrowUp, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

export const StudioFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020202] text-white border-t border-hairline py-20">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-hairline">
          
          {/* Brand Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 text-accent"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="3" strokeDasharray="4 4" />
                <polygon points="50,22 62,45 86,45 65,59 72,81 50,66 28,81 35,59 16,45 39,45" fill="currentColor" fillOpacity="0.8" />
              </svg>
              <span className="font-serif text-2xl tracking-[0.2em] text-white uppercase">
                ATELIER AI STUDIO
              </span>
            </div>

            <p className="text-white/70 text-xs sm:text-sm font-sans max-w-sm mb-6 leading-relaxed">
              Autonomous AI jewelry catalog and marketing-ads studio. Delivering mathematically locked optical renders for luxury Maisons, eliminating multi-week physical photo shoots.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <Cpu className="w-4 h-4" />
              <span>RIG-STUDIO-CG & 10-ANGLE CONSISTENCY MATRIX ACTIVE</span>
            </div>
          </div>

          {/* Studio Locations */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 block mb-4">
              Salons & Representation
            </span>
            <ul className="space-y-3 text-xs text-white/70 font-sans leading-relaxed">
              <li>
                <strong className="text-white block font-medium">Paris</strong>
                28 Place Vendôme, 75001 Paris, France
              </li>
              <li>
                <strong className="text-white block font-medium">Geneva</strong>
                14 Rue du Rhône, 1204 Genève, Switzerland
              </li>
              <li>
                <strong className="text-white block font-medium">New York</strong>
                740 Fifth Avenue, New York, NY 10019
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 block mb-4">
              Architecture
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-white/70 font-mono">
              <li>
                <a href="#ten-angle-runway" className="hover:text-accent transition-colors">
                  12-Angle Runway
                </a>
              </li>
              <li>
                <a href="#interactive-mock" className="hover:text-accent transition-colors">
                  Live Engine Mock
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-accent transition-colors">
                  Capabilities
                </a>
              </li>
              <li>
                <a href="#pipeline" className="hover:text-accent transition-colors">
                  6-Stage Pipeline
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-accent transition-colors">
                  Commercial Tiers
                </a>
              </li>
            </ul>
          </div>

          {/* Action / Back to Top */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-accent transition-colors p-2 rounded-sm border border-hairline hover:border-accent/40"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-accent" />
            </button>

            <div className="text-left lg:text-right mt-6">
              <span className="text-[10px] font-mono text-white/40 uppercase block mb-1">
                SYSTEM TELEMETRY
              </span>
              <span className="text-xs font-mono text-accent">
                DETERMINISTIC RAYTRACING: OK
              </span>
            </div>
          </div>

        </div>

        {/* Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} ATELIER AI AD & CATALOG STUDIO ENGINE. ALL ASSET LICENSES ASSIGNED.
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <span className="text-accent">SIGNATURE ACCENT: #FBFF8D</span>
            <span>COLOR SCIENCE: NEUTRAL +150K</span>
            <span>ZERO GEOMETRY DRIFT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
