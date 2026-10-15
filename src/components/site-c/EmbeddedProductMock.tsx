import React, { useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Sparkles, Terminal, Check, Layers, Sliders, RefreshCw, Download, ExternalLink } from 'lucide-react';

type VariantKey = 'A' | 'B' | 'C';

interface VariantInfo {
  key: VariantKey;
  label: string;
  backdrop: string;
  lighting: string;
  image: string;
  shutter: string;
}

export const EmbeddedProductMock: React.FC = () => {
  const { brandName, formatPrice } = useBrand();
  const [selectedVariant, setSelectedVariant] = useState<VariantKey>('A');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('RENDER READY');
  const [showPromptInspection, setShowPromptInspection] = useState(false);

  const variants: Record<VariantKey, VariantInfo> = {
    A: {
      key: 'A',
      label: 'Variant A: Raw Black Silk',
      backdrop: 'Pleated Japanese raw silk, matte deep shadow sweep',
      lighting: 'Large softbox upper-left raking at 45°, black flag edge',
      image: '/assets/c-demo-01.webp',
      shutter: '100mm Macro · f/8 · 1/160s · ISO 100',
    },
    B: {
      key: 'B',
      label: 'Variant B: Charcoal Slate',
      backdrop: 'Honed volcanic slate pedestal with micro-beveled rim',
      lighting: 'Dual directional rim key, controlled highlight specular',
      image: '/assets/c-demo-02.webp',
      shutter: '85mm Macro · f/5.6 · 1/200s · ISO 64',
    },
    C: {
      key: 'C',
      label: 'Variant C: Ambient Hand',
      backdrop: 'Contextual low-key ambient evening light, warm bokeh',
      lighting: '3200K practical point source in out-of-focus background',
      image: '/assets/c-demo-03.webp',
      shutter: '85mm Prime · f/2.8 · 1/125s · ISO 200',
    },
  };

  const handleSelectVariant = (key: VariantKey) => {
    if (key === selectedVariant) return;
    setIsGenerating(true);
    setGenerationStep('INJECTING RIG-STUDIO-CG...');

    setTimeout(() => {
      setGenerationStep('SYNTHESIZING RAYTRACED ALLOY...');
    }, 250);

    setTimeout(() => {
      setSelectedVariant(key);
      setGenerationStep('VERIFYING ALPHA CUTOUT...');
    }, 500);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStep('RENDER READY');
    }, 750);
  };

  const current = variants[selectedVariant];

  return (
    <section id="demo-mock" className="py-24 md:py-32 bg-stage-surface text-white border-b border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Head */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
            <span className="text-[0.6875rem] uppercase tracking-[0.25em] text-metal-highlight font-mono">
              THE PROOF OF CONSISTENCY · SECTION 6.3
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white font-normal mb-4">
            Embedded Facsimile: The Real-Time Studio Mock
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-body leading-relaxed">
            The same physical master piece photographed three distinct ways. Toggle below to witness
            how the studio rig swaps pedestals and lighting physics without altering the jewel’s geometry or gold alloy.
          </p>
        </div>

        {/* Facsimile Frame (Browser Shell representing Site A in Light Stage) */}
        <div className="relative rounded-sm border border-hairline bg-black shadow-2xl overflow-hidden">
          
          {/* Studio Facsimile Toolbar */}
          <div className="bg-[#121212] border-b border-white/10 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            {/* Left Browser Dots & URL */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <div className="hidden sm:flex items-center px-3 py-1 rounded bg-black/60 border border-white/10 text-[11px] font-mono text-white/50 tracking-wider">
                https://{brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.catalog/storefront
              </div>
            </div>

            {/* Centre: The Generating Pill (Section 6.3) */}
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                  isGenerating
                    ? 'bg-metal-primary text-black font-semibold shadow-md animate-pulse'
                    : 'bg-white/5 text-metal-highlight border border-metal-primary/30'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-black animate-ping' : 'bg-metal-primary'}`} />
                <span>{isGenerating ? 'Generating...' : 'Generating Pill: Active'}</span>
                <span className="text-[10px] text-white/40 hidden md:inline">({generationStep})</span>
              </div>
            </div>

            {/* Right: Variants A / B / C Switcher (Section 6.3) */}
            <div className="flex items-center bg-white/5 p-1 rounded-sm border border-white/10">
              <span className="text-[10px] font-mono text-white/40 uppercase px-2 hidden lg:inline">
                Variant Rig:
              </span>
              {(['A', 'B', 'C'] as VariantKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSelectVariant(key)}
                  className={`px-3 py-1 rounded-sm text-xs font-mono tracking-wider uppercase transition-all ${
                    selectedVariant === key
                      ? 'bg-metal-primary text-black font-bold shadow'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Variant {key}
                </button>
              ))}
            </div>
          </div>

          {/* In-Page Facsimile of Site A (Light Stage Storefront Facsimile) */}
          <div className="p-6 sm:p-10 lg:p-14 bg-[#F9F4F0] text-[#1A1A1A] transition-colors relative">
            
            {/* Mock Header Inside Facsimile */}
            <div className="flex justify-between items-center pb-6 mb-8 border-b border-[#E5DED5]">
              <div>
                <span className="font-display text-xl tracking-[0.22em] uppercase text-[#1A1A1A] block">
                  {brandName}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
                  Commercial Storefront · Facsimile Viewport
                </span>
              </div>
              <div className="text-right text-xs font-mono text-[#888888]">
                <span className="text-[#C8A45C] font-semibold">{current.label}</span>
              </div>
            </div>

            {/* Split: Left Featured Variant Display / Right Live Multi-Crop Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Primary Active Variant Card */}
              <div className="lg:col-span-7 bg-white p-6 rounded-sm border border-[#E5DED5] shadow-md flex flex-col justify-between">
                <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-[#EFEAE4] border border-[#E5DED5] mb-6">
                  
                  {/* Image with Generating Crossfade */}
                  <img
                    src={current.image}
                    alt={`${brandName} Variant ${current.key} fine jewelry render`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isGenerating ? 'opacity-40 filter blur-sm' : 'opacity-100 filter blur-0'
                    }`}
                  />

                  {/* Shimmer animation while generating */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  )}

                  {/* Variant Badge Overlay */}
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase border border-white/10">
                    {current.key} · RIG-STUDIO-CG
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[#1A1A1A] px-3 py-1 rounded-sm text-[10px] font-mono tracking-wider border border-[#E5DED5]">
                    {current.shutter}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-display text-2xl text-[#1A1A1A]">
                      Coco Solitaire Ribbon · {current.label.split(':')[1]}
                    </h3>
                    <span className="font-display text-xl text-[#1A1A1A]">$2,550</span>
                  </div>
                  <p className="text-xs text-[#888888] font-body leading-relaxed mb-4">
                    Backdrop specification: {current.backdrop}. Raytraced under physically accurate
                    refraction indices with antique gold response.
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#888888] pt-3 border-t border-[#E5DED5]">
                    <span>SETTING: SIX-PRONG SOLITAIRE</span>
                    <span className="text-[#C8A45C] font-semibold">GIA CERTIFIED · 1.20CT</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Comparative Variant Thumbnails & Live Prompt Matrix */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-mono text-[#888888] mb-3">
                    Multi-Format Ad Variants Matrix
                  </h4>
                  
                  <div className="space-y-3">
                    {(['A', 'B', 'C'] as VariantKey[]).map((k) => {
                      const v = variants[k];
                      const isSelected = selectedVariant === k;
                      return (
                        <div
                          key={k}
                          onClick={() => handleSelectVariant(k)}
                          className={`p-3 rounded-sm border cursor-pointer transition-all flex items-center gap-4 ${
                            isSelected
                              ? 'bg-white border-[#C8A45C] shadow-sm'
                              : 'bg-white/50 border-[#E5DED5] hover:bg-white'
                          }`}
                        >
                          <div className="w-16 h-20 bg-[#EFEAE4] rounded-sm overflow-hidden shrink-0 border border-[#E5DED5]">
                            <img src={v.image} alt={v.label} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-[#1A1A1A] font-body truncate">
                                {v.label}
                              </span>
                              {isSelected && (
                                <span className="text-[10px] font-mono text-[#C8A45C] flex items-center gap-1">
                                  <Check className="w-3 h-3" /> ACTIVE
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#888888] font-body line-clamp-1">
                              {v.backdrop}
                            </p>
                            <span className="text-[10px] font-mono text-[#888888] block mt-1">
                              {v.shutter}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Prompt Physics Inspector Accordion */}
                <div className="p-4 bg-white border border-[#E5DED5] rounded-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#1A1A1A] font-semibold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#C8A45C]" /> Locked Style Block
                    </span>
                    <button
                      onClick={() => setShowPromptInspection(!showPromptInspection)}
                      className="text-[10px] font-mono uppercase text-[#C8A45C] hover:underline"
                    >
                      {showPromptInspection ? 'Collapse Rig' : 'Expand Prompt'}
                    </button>
                  </div>
                  <p className="text-[11px] text-[#888888] font-mono leading-relaxed">
                    RIG-STUDIO-CG: single large softbox key light from upper left, black flag camera-right, white bounce fill at 30%, 100mm macro f/8.
                  </p>

                  {showPromptInspection && (
                    <div className="mt-3 pt-3 border-t border-[#E5DED5] text-[10px] font-mono text-[#666666] space-y-2 bg-[#EFEAE4] p-3 rounded-sm">
                      <p>
                        <strong className="text-[#1A1A1A]">GRADE:</strong> neutral white balance with +150K warm bias, true blacks without teal crush, highlights rolled off before clipping.
                      </p>
                      <p>
                        <strong className="text-[#1A1A1A]">NEGATIVE CONTROL:</strong> text, watermark, hands, plastic sheen, chrome look, deformed gemstones, generic 3D render.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
