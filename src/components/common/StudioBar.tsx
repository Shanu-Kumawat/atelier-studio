import React, { useState } from 'react';
import { useBrand, SiteView } from '../../context/BrandContext';
import { Sliders, CheckCircle2, RefreshCw, Layers, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';

export const StudioBar: React.FC = () => {
  const {
    brandName,
    setBrandName,
    vertical,
    setVertical,
    currentSite,
    setCurrentSite,
  } = useBrand();

  const [isOpen, setIsOpen] = useState(false);
  const [showRigs, setShowRigs] = useState(false);

  const siteOptions: { id: SiteView; label: string; stage: string; sub: string }[] = [
    { id: 'site-a', label: 'Site A: Storefront', stage: 'LIGHT STAGE', sub: 'Commercial Catalog & Browse Rail' },
    { id: 'site-b', label: 'Site B: Editorial', stage: 'DARK STAGE', sub: 'Lookbook & Pinned Runway' },
    { id: 'site-c', label: 'Site C: Ad Studio', stage: 'DARK STAGE', sub: 'Interactive Variant Mock & Pipeline' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A]/95 text-white backdrop-blur-md border-b border-white/10 text-xs transition-colors" role="region" aria-label="Studio Control Bar">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 h-11 flex items-center justify-between gap-4">
        {/* Brand Token & Studio Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-metal-primary animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">STUDIO RIG V2.4</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 pl-3 border-l border-white/10">
            <span className="text-white/40 text-[10px] tracking-wider uppercase font-mono">TOKEN:</span>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              title="Edit white-label {{BRAND}} token"
              className="bg-white/5 border border-white/10 text-metal-highlight text-[11px] px-2 py-0.5 rounded-sm font-display tracking-widest focus:outline-none focus:border-metal-primary transition-colors max-w-[140px] text-center"
            />
          </div>
        </div>

        {/* 3 Sites Navigation Switcher */}
        <nav aria-label="Studio Sites Switcher" className="flex items-center bg-white/5 p-0.5 rounded-sm border border-white/10 overflow-x-auto scrollbar-hide">
          {siteOptions.map((opt) => {
            const isActive = currentSite === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setCurrentSite(opt.id)}
                className={`px-3 py-1 rounded-sm text-[11px] transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-metal-primary text-black font-semibold shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{opt.label}</span>
                <span className={`text-[9px] uppercase px-1 rounded-sm ${isActive ? 'bg-black/20 text-black' : 'text-white/40'}`}>
                  {opt.stage.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Phase 2 Vertical & Art Direction Inspect */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setVertical(vertical === 'jewelry' ? 'couture' : 'jewelry')}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-metal-hairline transition-all text-[11px]"
            title="Toggle Phase 2 Vertical Taxonomy"
          >
            <RefreshCw className="w-3 h-3 text-metal-primary" />
            <span className="font-mono text-[10px] uppercase text-white/50">Vertical:</span>
            <span className="text-metal-highlight capitalize font-medium">{vertical === 'jewelry' ? 'Jewelry (Ph 1)' : 'Couture (Ph 2)'}</span>
          </button>

          <button
            onClick={() => setShowRigs(!showRigs)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-white/70 hover:text-metal-highlight transition-all"
            title="View Locked Art Direction Rigs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-metal-primary" />
            <span className="hidden lg:inline text-[10px] font-mono tracking-wider">RIGS</span>
          </button>
        </div>
      </div>

      {/* Slide-down Art Direction & Rigs Drawer */}
      {showRigs && (
        <div className="bg-[#050505] border-t border-white/10 px-6 py-4 animate-in fade-in duration-300">
          <div className="max-w-[1480px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-metal-primary font-bold">RIG-STUDIO-CG (Catalog & PDP)</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-metal-primary/10 text-metal-highlight rounded-sm">LOCKED</span>
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Seamless matte sweep background (#0A0A0A to #1A1A1A), softbox upper-left, black flag camera-right, white bounce fill 30%, 100mm macro f/8, physically accurate metal response.
              </p>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-metal-primary font-bold">RIG-EDITORIAL (Campaign & Ads)</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-metal-primary/10 text-metal-highlight rounded-sm">LOCKED</span>
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                Dramatic low-key studio lighting, raking hard key upper right, deep shadow falloff, 3200K warm practical bokeh, 85mm macro f/2.8 shallow depth of field.
              </p>
            </div>

            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-metal-primary font-bold">GRADE & DRIFT RULES</span>
                <span className="text-[10px] px-1.5 py-0.5 bg-metal-primary/10 text-metal-highlight rounded-sm">ACTIVE</span>
              </div>
              <p className="text-white/60 text-[11px] leading-relaxed">
                +150K warm bias, true blacks without teal crush, highlights rolled off. Alpha cutouts verified on both #000 and #F9F4F0. No blue, no purple, no gradient mesh.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
