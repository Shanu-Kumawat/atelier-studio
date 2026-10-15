import React from 'react';
import { useBrand } from '../../context/BrandContext';
import { ShieldCheck, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export const StudioFooter: React.FC = () => {
  const { brandName } = useBrand();

  return (
    <footer className="bg-black text-white border-t border-hairline py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-hairline">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <span className="font-display text-2xl tracking-[0.2em] text-white uppercase block mb-4">
              ATELIER AI STUDIO
            </span>
            <p className="text-body-custom text-white/70 max-w-sm mb-6 leading-relaxed font-body">
              White-label AI jewelry catalog and marketing-ads studio. Delivering mathematically
              locked optical renders for luxury Maisons, eliminating multi-week physical photo shoots.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-metal-primary">
              <Cpu className="w-4 h-4" />
              <span>RIG-STUDIO-CG & RIG-EDITORIAL Precision Enforced</span>
            </div>
          </div>

          {/* Links Column 1: Studio Services */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 block mb-4">
              Services
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-white/70 font-mono">
              <li>
                <a href="#demo-mock" className="hover:text-metal-primary transition-colors">
                  Variant Engine
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-metal-primary transition-colors">
                  Catalogue Renders
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-metal-primary transition-colors">
                  Production Pipeline
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-metal-primary transition-colors">
                  Commercial Tiers
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Legal & Buyout */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 block mb-4">
              Copyright
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-white/70 font-mono">
              <li>
                <a href="#brief" className="hover:text-metal-primary transition-colors">
                  Full Buyout Terms
                </a>
              </li>
              <li>
                <a href="#brief" className="hover:text-metal-primary transition-colors">
                  NDA Agreements
                </a>
              </li>
              <li>
                <a href="#demo-mock" className="hover:text-metal-primary transition-colors">
                  GIA Verification
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-metal-primary transition-colors">
                  Retainer Access
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Studio Inquiry */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-white/40 block mb-4">
              Direct Contact
            </span>
            <p className="text-xs text-white/60 mb-4 font-mono leading-relaxed">
              Place Vendôme, Paris · Rue du Rhône, Geneva · 5th Avenue, New York
            </p>
            <a
              href="#brief"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-metal-primary hover:text-metal-highlight transition-colors"
            >
              <span>Submit Production Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Mega Footer Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} ATELIER AI STUDIO ENGINE. ALL ASSET LICENSES IRREVOCABLY ASSIGNED.
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <span className="text-metal-primary">ACCENT: #D4A017 GOLD</span>
            <span>COLOR SCIENCE: NEUTRAL +150K</span>
            <span>NO UNCANNY ARTIFACTS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
