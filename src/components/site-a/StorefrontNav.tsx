import React, { useState, useEffect } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';

export const StorefrontNav: React.FC = () => {
  const { brandName, cartCount } = useBrand();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collections', href: '#collections' },
    { label: 'Haute Joaillerie', href: '#catalog-grid' },
    { label: 'Horizontal Rail', href: '#horizontal-rail' },
    { label: 'Curated Sets', href: '#category-tiles' },
  ];

  return (
    <nav
      className={`sticky top-11 z-40 w-full transition-all duration-500 border-b ${
        scrolled
          ? 'bg-stage-base/95 backdrop-blur-md border-hairline shadow-sm py-4'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="max-w-storefront mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo Left */}
        <div className="flex items-center">
          <a
            href="#hero"
            className="font-display text-2xl md:text-3xl tracking-[0.22em] text-ink-primary hover:text-metal-primary transition-colors uppercase select-none"
          >
            {brandName}
          </a>
        </div>

        {/* Links Centre (Desktop) */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-[0.18em] text-ink-primary/80 hover:text-ink-primary transition-colors relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-metal-primary group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Actions Right */}
        <div className="flex items-center space-x-6 text-ink-primary">
          <a
            href="#catalog-grid"
            className="p-1 hover:text-metal-primary transition-colors"
            title="Search Catalog"
            aria-label="Search Catalog"
          >
            <Search className="w-5 h-5 stroke-[1.25]" />
          </a>

          <a
            href="#brief"
            className="hidden sm:block p-1 hover:text-metal-primary transition-colors"
            title="Client Portal"
            aria-label="Client Portal"
          >
            <User className="w-5 h-5 stroke-[1.25]" />
          </a>

          {/* Cart with count badge */}
          <a
            href="#cart"
            className="relative p-1 hover:text-metal-primary transition-colors flex items-center"
            title="View Portfolio Cart"
            aria-label={`View Portfolio Cart (${cartCount} items)`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.25]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-metal-primary text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-ink-primary"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stage-base border-b border-hairline px-6 py-6 space-y-4 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm uppercase tracking-widest text-ink-primary hover:text-metal-primary"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
