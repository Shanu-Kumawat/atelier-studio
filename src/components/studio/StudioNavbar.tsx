import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export const StudioNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '12-Angle Runway', href: '#ten-angle-runway' },
    { label: 'Before / After', href: '#before-after' },
    { label: 'Live Engine', href: '#interactive-mock' },
    { label: 'Metrics', href: '#metrics' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-hairline py-3.5 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Crest & Logo Left */}
        <div className="flex items-center">
          <a href="#hero" className="flex items-center gap-3 group">
            {/* Architectural Step-Cut Diamond Monogram */}
            <svg
              className="w-6 h-6 text-accent transition-transform duration-700 ease-out group-hover:rotate-90 shrink-0"
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

            <div className="flex items-baseline">
              <span className="font-serif text-2xl tracking-[0.24em] uppercase text-white group-hover:text-accent transition-colors font-normal">
                ATELIER
              </span>
              <span className="font-mono text-[10px] tracking-[0.32em] text-accent font-bold ml-2.5 uppercase">
                AI
              </span>
            </div>
          </a>
        </div>

        {/* Links Centre */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-sans tracking-[0.18em] uppercase text-white/70">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-accent transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="flex items-center space-x-4">
          <a
            href="#brief"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all duration-300 shadow-md"
          >
            <span>Commission</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1 text-white"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-b border-hairline px-6 py-8 space-y-4 font-sans text-xs uppercase tracking-widest">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-white/80 hover:text-accent py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#brief"
            onClick={() => setMobileOpen(false)}
            className="block text-accent py-2 font-bold"
          >
            Commission Drop →
          </a>
        </div>
      )}
    </nav>
  );
};
