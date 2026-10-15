import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'ten-angle-runway', label: '12-Angle Runway', href: '#ten-angle-runway' },
  { id: 'before-after', label: 'Before / After', href: '#before-after' },
  { id: 'interactive-mock', label: 'Campaign Matrix', href: '#interactive-mock' },
  { id: 'metrics', label: 'Metrics', href: '#metrics' },
  { id: 'pricing', label: 'Pricing', href: '#pricing' },
];

export const StudioNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll listener for sticky backdrop transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((item) => item.id), 'brief'];

    const handleSpy = () => {
      const scrollPosition = window.scrollY + 200; // Offset for header detection

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('');
    };

    handleSpy();
    window.addEventListener('scroll', handleSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleSpy);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const scrollToElement = useCallback((targetId: string) => {
    setMobileOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        scrolled
          ? 'bg-[#020202]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.85)]'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Brand Crest & Logo Left */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement('hero');
            }}
            className="flex items-center gap-3.5 group cursor-pointer"
            aria-label="ATELIER AI Studio - Return to top"
          >
            {/* Architectural Step-Cut Diamond Monogram */}
            <div className="relative flex items-center justify-center">
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
              <div className="absolute inset-0 bg-accent/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            <div className="flex items-baseline">
              <span className="font-serif text-2xl tracking-[0.24em] uppercase text-white group-hover:text-accent transition-colors font-normal">
                ATELIER
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] text-accent font-semibold ml-2.5 uppercase border border-accent/25 px-1.5 py-0.5 rounded bg-accent/5">
                AI STUDIO
              </span>
            </div>
          </a>
        </div>

        {/* Links Centre (Desktop) */}
        <nav
          aria-label="Studio Showcase Navigation"
          className="hidden lg:flex items-center space-x-9 text-[11px] font-sans tracking-[0.22em] uppercase"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement(item.id);
                }}
                className={`relative py-1.5 transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-accent font-medium' : 'text-white/60 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavPip"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_#FBFF8D]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="flex items-center space-x-4">
          <a
            href="#brief"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement('brief');
            }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white hover:shadow-[0_0_25px_rgba(251,255,141,0.35)] active:scale-95 transition-all duration-300 group cursor-pointer"
          >
            <span>Commission</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-1 focus:ring-accent"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="lg:hidden absolute top-full left-0 right-0 h-[calc(100dvh-100%)] bg-[#020202]/98 backdrop-blur-3xl border-t border-white/[0.08] shadow-2xl flex flex-col justify-between px-8 py-8 overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-white/40 pb-2 border-b border-hairline">
                Studio Index
              </div>

              <div className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToElement(item.id);
                      }}
                      className={`flex items-center justify-between py-2 text-base font-sans tracking-[0.16em] uppercase transition-colors ${
                        isActive ? 'text-accent font-medium' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-white/40">0{idx + 1}</span>
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#FBFF8D]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-8 border-t border-hairline space-y-5">
              <a
                href="#brief"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToElement('brief');
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white transition-all shadow-lg"
              >
                <span>Commission Brief Drop</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 pt-2">
                <span>Mumbai BKC</span>
                <span>•</span>
                <span>Surat Bourse</span>
                <span>•</span>
                <span>Paris Vendôme</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
