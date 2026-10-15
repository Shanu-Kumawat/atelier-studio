import React from 'react';
import { useBrand } from '../../context/BrandContext';
import { ShieldCheck, Mail, ArrowRight } from 'lucide-react';

export const StorefrontFooter: React.FC = () => {
  const { brandName } = useBrand();

  return (
    <footer className="bg-stage-base border-t border-hairline py-20 transition-colors">
      <div className="max-w-storefront mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-hairline">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <span className="font-display text-2xl tracking-[0.22em] text-ink-primary uppercase block mb-4">
              {brandName}
            </span>
            <p className="text-body-custom text-text-secondary max-w-sm mb-6 leading-relaxed">
              White-label high jewelry catalog and editorial studio. Every silhouette rendered under
              locked optical rigs with physically calibrated antique gold response.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-metal-primary">
              <ShieldCheck className="w-4 h-4" />
              <span>GIA & HRD Registered Diamonds</span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-ink-muted block mb-4">
              Catalogue
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-text-secondary">
              <li>
                <a href="#catalog-grid" className="hover:text-metal-primary transition-colors">
                  Solitaire Rings
                </a>
              </li>
              <li>
                <a href="#catalog-grid" className="hover:text-metal-primary transition-colors">
                  Curb Link Collars
                </a>
              </li>
              <li>
                <a href="#catalog-grid" className="hover:text-metal-primary transition-colors">
                  Sculptural Hoops
                </a>
              </li>
              <li>
                <a href="#catalog-grid" className="hover:text-metal-primary transition-colors">
                  Haute Suites
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="lg:col-span-2">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-ink-muted block mb-4">
              Maison
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-wider text-text-secondary">
              <li>
                <a href="#hero" className="hover:text-metal-primary transition-colors">
                  Heritage & Atelier
                </a>
              </li>
              <li>
                <a href="#horizontal-rail" className="hover:text-metal-primary transition-colors">
                  Kinetic Showcase
                </a>
              </li>
              <li>
                <a href="#category-tiles" className="hover:text-metal-primary transition-colors">
                  Taxonomy Curations
                </a>
              </li>
              <li>
                <a href="#brief" className="hover:text-metal-primary transition-colors">
                  Private Commissions
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Bespoke Client Intake */}
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-ink-muted block mb-4">
              Private Salon Inquiries
            </span>
            <p className="text-xs text-text-secondary mb-4 leading-relaxed">
              Receive private preview notices prior to global seasonal catalog releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-hairline focus-within:border-metal-primary pb-2 transition-colors">
              <Mail className="w-4 h-4 text-ink-muted mr-2 shrink-0" />
              <input
                type="email"
                placeholder="Enter client email..."
                required
                className="bg-transparent text-xs text-ink-primary focus:outline-none w-full placeholder:text-ink-muted"
              />
              <button
                type="submit"
                className="p-1 text-ink-primary hover:text-metal-primary transition-colors"
                aria-label="Subscribe to private salon"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-ink-muted gap-4">
          <div>
            © {new Date().getFullYear()} {brandName} HAUTE JOAILLERIE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-metal-primary">OPTICAL SPECULAR: 18K GOLD</span>
            <span>PROMPT RIG: RIG-STUDIO-CG</span>
            <span>SECURITY: AES-256 GIA ENCRYPTED</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
