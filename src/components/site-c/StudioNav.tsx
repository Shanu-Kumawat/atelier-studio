import React, { useState, useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Sparkles, Terminal, ArrowRight, Menu, X } from 'lucide-react';

export const StudioNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Product Mock', href: '#demo-mock' },
    { label: 'Features', href: '#features' },
    { label: 'Pipeline', href: '#workflow' },
    { label: 'Metrics', href: '#stats' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Submit Brief', href: '#brief' },
  ];

  return (
    <nav
      className={`sticky top-11 z-40 w-full transition-all duration-500 border-b ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-white/10 py-3 shadow-xl'
          : 'bg-black/40 backdrop-blur-sm border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            className="font-display text-xl sm:text-2xl tracking-[0.2em] text-white hover:text-metal-highlight transition-colors uppercase"
          >
            ATELIER AI
          </a>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-wider text-metal-primary px-2 py-0.5 bg-metal-primary/10 border border-metal-primary/20 rounded-sm">
            AD STUDIO ENGINE
          </span>
        </div>

        {/* Links Centre (Sticky nav: Product / Work / Pricing / Brief) */}
        <div className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-widest uppercase text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-metal-primary transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-metal-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA Right */}
        <div className="flex items-center gap-4">
          <a
            href="#brief"
            className="hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-metal-primary text-black font-body text-xs uppercase tracking-[0.2em] font-medium hover:bg-metal-highlight transition-all shadow-md hover:shadow-metal-primary/20"
          >
            <span>Commission Drop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in duration-200 font-mono text-xs uppercase tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-white/80 hover:text-metal-primary py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
