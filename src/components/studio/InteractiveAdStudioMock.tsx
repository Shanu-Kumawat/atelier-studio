import React, { useState } from 'react';
import { Terminal, Check, Layers, Sliders, RefreshCw, Sparkles, Copy, Eye } from 'lucide-react';

type VariantKey = 'A' | 'B' | 'C';
type FormatKey = 'feed' | 'social' | 'banner';

interface VariantInfo {
  key: VariantKey;
  label: string;
  backdrop: string;
  lighting: string;
  image: string;
  shutter: string;
}

export const InteractiveAdStudioMock: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<VariantKey>('A');
  const [selectedFormat, setSelectedFormat] = useState<FormatKey>('feed');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('STUDIO SYNTHESIS READY');
  const [showPromptInspection, setShowPromptInspection] = useState(false);
  const [copied, setCopied] = useState(false);

  const variants: Record<VariantKey, VariantInfo> = {
    A: {
      key: 'A',
      label: 'Variant A: Black Silk',
      backdrop: 'Pleated Japanese raw silk with deep shadow falloff',
      lighting: 'Large softbox upper-left raking at 45°, black flag edge',
      image: '/assets/after-silk.jpg',
      shutter: '100mm Macro · f/8 · 1/160s',
    },
    B: {
      key: 'B',
      label: 'Variant B: Volcanic Slate',
      backdrop: 'Honed volcanic slate pedestal with micro-beveled rim',
      lighting: 'Dual directional rim key, controlled specular highlight',
      image: '/assets/after-slate.jpg',
      shutter: '85mm Macro · f/5.6 · 1/200s',
    },
    C: {
      key: 'C',
      label: 'Variant C: Ambient Hand',
      backdrop: 'Contextual low-key ambient evening light with warm bokeh',
      lighting: '3200K practical point source in out-of-focus background',
      image: '/assets/after-hand.jpg',
      shutter: '85mm Prime · f/2.8 · 1/125s',
    },
  };

  const formats: Record<FormatKey, { label: string; aspectClass: string; ratio: string; desc: string }> = {
    feed: {
      label: '1:1 Square Feed',
      aspectClass: 'aspect-square',
      ratio: '1080 × 1080 px',
      desc: 'Optimized for Instagram feed carousels and Google Shopping.',
    },
    social: {
      label: '4:5 Social Campaign',
      aspectClass: 'aspect-[4/5]',
      ratio: '1080 × 1350 px',
      desc: 'Thumb-stopping vertical crop designed for dark-mode feeds.',
    },
    banner: {
      label: '16:9 Hero Billboard',
      aspectClass: 'aspect-[16/9]',
      ratio: '1920 × 1080 px',
      desc: 'Calibrated negative space for website hero banners.',
    },
  };

  const handleSelectVariant = (key: VariantKey) => {
    if (key === selectedVariant) return;
    setIsGenerating(true);
    setGenerationStep('LOCKING 18K GOLD REFRACTION...');

    setTimeout(() => {
      setSelectedVariant(key);
    }, 250);

    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStep('STUDIO SYNTHESIS READY');
    }, 550);
  };

  const handleSelectFormat = (f: FormatKey) => {
    setSelectedFormat(f);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(
      `commercial jewellery catalogue product render, seamless matte sweep background, single large softbox key light from upper left, black flag camera-right for edge definition, white bounce fill at 30 percent, physically accurate metal response, controlled specular highlight along the band, no coloured gels, 100mm macro lens, f/8, tack sharp, neutral colour science.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = variants[selectedVariant];
  const activeFormat = formats[selectedFormat];

  return (
    <section id="interactive-mock" className="py-24 md:py-32 bg-[#040404] text-white border-b border-hairline overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>INTERACTIVE MULTI-VARIANT AD ENGINE</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mb-3">
            Live Facsimile: Test the Ad Engine
          </h2>
          <p className="text-white/60 text-sm font-sans font-light">
            Switch pedestals (Silk, Slate, Hand) and aspect ratios. The stone facets, prongs, and 18K gold alloy remain identical across every variant.
          </p>
        </div>

        {/* Facsimile Window */}
        <div className="rounded-sm border border-white/15 bg-[#0A0A0A] shadow-2xl overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="bg-[#111111] border-b border-white/10 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            {/* Simulated Domain */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <span className="hidden sm:inline px-3 py-1 rounded bg-black/60 border border-white/10 text-[11px] font-mono text-white/50">
                https://studio.atelier.ai/engine/live-preview
              </span>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-2 text-xs font-mono text-accent">
              <span className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-accent animate-ping' : 'bg-accent'}`} />
              <span>{isGenerating ? 'Synthesizing...' : 'Engine Active'}</span>
            </div>

            {/* Variant Switcher Pills */}
            <div className="flex items-center bg-black/40 p-1 rounded-sm border border-white/10">
              {(['A', 'B', 'C'] as VariantKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => handleSelectVariant(key)}
                  className={`px-3 py-1 rounded-sm text-xs font-mono tracking-wider uppercase transition-all ${
                    selectedVariant === key
                      ? 'bg-accent text-black font-semibold shadow-sm'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {variants[key].label.split(':')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Facsimile Body */}
          <div className="p-6 sm:p-10 bg-[#FAF9F5] text-[#121212]">
            
            {/* Format Bar */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-[#E5DED5] gap-4">
              <div>
                <span className="font-serif text-xl tracking-wider uppercase text-[#121212] block">
                  ATELIER VENDÔME · AD MATRIX
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#888888]">
                  Automated Multi-Format Rendering
                </span>
              </div>

              {/* Format Switcher */}
              <div className="flex items-center gap-1.5 bg-[#EFEAE4] p-1 rounded-full border border-[#E5DED5]">
                {(['feed', 'social', 'banner'] as FormatKey[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => handleSelectFormat(f)}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono uppercase transition-all ${
                      selectedFormat === f
                        ? 'bg-[#121212] text-white font-medium shadow-sm'
                        : 'text-[#666666] hover:text-[#121212]'
                    }`}
                  >
                    {formats[f].label.split(' ')[0]} ({formats[f].ratio.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>

            {/* Split Render View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Main Render Display */}
              <div className="lg:col-span-7 bg-white p-6 rounded-sm border border-[#E5DED5] shadow-md flex flex-col justify-between">
                <div className={`relative ${activeFormat.aspectClass} w-full rounded-sm overflow-hidden bg-[#EFEAE4] border border-[#E5DED5] mb-4 flex items-center justify-center transition-all duration-300`}>
                  <img
                    src={current.image}
                    alt={current.label}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      isGenerating ? 'opacity-30 filter blur-sm' : 'opacity-100 filter blur-0'
                    }`}
                  />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-sm text-[10px] font-mono uppercase">
                    {activeFormat.ratio}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#121212] px-2.5 py-0.5 rounded-sm text-[10px] font-mono border border-[#E5DED5]">
                    {current.shutter}
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <div>
                    <h3 className="font-serif text-2xl text-[#121212] font-normal">
                      Coco Ribbon Wave Suite · {current.label.split(':')[1]}
                    </h3>
                    <p className="text-xs text-[#666666] font-sans mt-0.5 font-light">
                      {activeFormat.desc}
                    </p>
                  </div>
                  <span className="font-serif text-2xl text-[#121212] font-normal">$2,550</span>
                </div>
              </div>

              {/* Right Column: Prompt Block */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* 3 Thumbnails */}
                <div className="space-y-2">
                  {(['A', 'B', 'C'] as VariantKey[]).map((k) => {
                    const v = variants[k];
                    const isSelected = selectedVariant === k;
                    return (
                      <div
                        key={k}
                        onClick={() => handleSelectVariant(k)}
                        className={`p-3 rounded-sm border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-white border-[#121212] shadow-sm ring-1 ring-[#121212]'
                            : 'bg-white/60 border-[#E5DED5] hover:bg-white'
                        }`}
                      >
                        <div className="w-14 h-14 bg-[#EFEAE4] rounded-sm overflow-hidden shrink-0 border border-[#E5DED5]">
                          <img src={v.image} alt={v.label} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#121212] font-sans">{v.label}</span>
                            {isSelected && <span className="text-[10px] font-mono text-[#121212] font-bold">✓ ACTIVE</span>}
                          </div>
                          <p className="text-[11px] text-[#777777] font-sans truncate">{v.backdrop}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Prompt Card */}
                <div className="p-4 bg-white border border-[#E5DED5] rounded-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#121212] font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#C8A45C]" /> Locked RIG-STUDIO-CG
                    </span>
                    <button
                      onClick={handleCopyPrompt}
                      className="text-[11px] font-mono text-[#C8A45C] hover:underline flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-[#666666] font-mono leading-relaxed">
                    commercial jewellery catalogue render, matte sweep, softbox key upper-left, black flag edge, 30% white bounce, 100mm macro f/8, neutral warm balance +150K.
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
