import React, { useState, useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Volume2, VolumeX, Menu, X, Compass } from 'lucide-react';

export const EditorialNav: React.FC = () => {
  const { brandName } = useBrand();
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // past 50px transitions to rgba(255,255,255,0.05) + backdrop-blur-md (Section 5)
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Lookbook', href: '#collections-runway' },
    { label: 'Heritage', href: '#heritage' },
    { label: 'Craftsmanship', href: '#craftsmanship' },
    { label: 'Private Salon', href: '#gallery' },
    { label: 'Concierge', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-11 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled
          ? 'bg-white/[0.05] backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
          : 'bg-transparent border-b border-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Left */}
        <div className="flex items-center gap-3">
          <a
            href="#editorial-hero"
            className="font-display text-2xl md:text-3xl tracking-[0.25em] text-white hover:text-metal-highlight transition-colors uppercase select-none"
          >
            {brandName}
          </a>
          <span className="hidden sm:inline-block text-[10px] font-mono text-metal-primary px-2 py-0.5 border border-metal-primary/30 rounded-sm">
            EDITION NO. 04
          </span>
        </div>

        {/* Links Centre (Bodoni accents) */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.24em] text-white/70 hover:text-white transition-colors relative py-1 group font-mono"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-metal-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-5 text-white/80">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:text-metal-primary transition-colors flex items-center gap-1.5 text-xs font-mono"
            title={isMuted ? 'Atmospheric Ambience Muted' : 'Ambience Playing'}
            aria-label="Toggle Sound Ambience"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-metal-primary" />}
            <span className="hidden lg:inline text-[10px] uppercase text-white/40">
              {isMuted ? 'Mute' : 'Audio On'}
            </span>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-full border border-white/20 text-white hover:border-metal-primary hover:text-metal-primary text-xs uppercase tracking-widest transition-all"
          >
            Private Appointment
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 px-6 py-8 space-y-5 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm uppercase tracking-widest text-white/90 hover:text-metal-primary font-mono"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
