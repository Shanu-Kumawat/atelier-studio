import React, { useEffect, useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { X, ShieldCheck, Gem, Compass, Sparkles, Check, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { activePdpProduct, closePdp, addToCart, formatPrice, brandName } = useBrand();
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    setActiveGalleryIndex(0);
    setAddedAnimation(false);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePdp();
    };

    if (activePdpProduct) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePdpProduct]);

  if (!activePdpProduct) return null;

  const product = activePdpProduct;

  // JSON-LD Product & Offer Schema (Section 8 Step 7)
  const jsonLdData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: [product.media.hero, ...product.media.gallery],
    description: product.story,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    offers: {
      '@type': 'Offer',
      url: `https://atelier-studio.design/product/${product.id}`,
      priceCurrency: product.price.currency,
      price: product.price.amount,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Carat Weight', value: product.specs.carat },
      { '@type': 'PropertyValue', name: 'Metal Alloy', value: product.specs.metal },
      { '@type': 'PropertyValue', name: 'Setting Architecture', value: product.specs.setting },
      { '@type': 'PropertyValue', name: 'Gemological Certificate', value: product.specs.certificate },
    ],
  };

  const handleAddToCart = () => {
    addToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={closePdp}
    >
      {/* Inject Dynamic JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-stage-surface text-ink-primary border border-hairline rounded-sm shadow-2xl flex flex-col lg:flex-row transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closePdp}
          className="absolute top-4 right-4 z-20 p-2 text-ink-muted hover:text-ink-primary hover:bg-stage-sunken rounded-full transition-colors"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery & High-Res View */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 bg-stage-sunken flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-hairline">
          {/* Main Visual Well */}
          <div className="relative aspect-[3/4] w-full bg-stage-base/30 rounded-sm overflow-hidden flex items-center justify-center border border-hairline">
            <img
              src={product.media.gallery[activeGalleryIndex] || product.media.hero}
              alt={`${product.name} in ${product.specs.metal}`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-stage-base/80 backdrop-blur-sm px-2.5 py-1 text-[10px] tracking-widest uppercase font-mono text-metal-primary border border-hairline">
              RIG-STUDIO-CG
            </div>

            {/* Gallery Arrows if multiple */}
            {product.media.gallery.length > 1 && (
              <div className="absolute bottom-3 right-3 flex gap-1">
                <button
                  onClick={() =>
                    setActiveGalleryIndex((prev) =>
                      prev === 0 ? product.media.gallery.length - 1 : prev - 1
                    )
                  }
                  className="p-1.5 bg-stage-surface/90 text-ink-primary hover:bg-stage-surface rounded-sm border border-hairline transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setActiveGalleryIndex((prev) =>
                      (prev + 1) % product.media.gallery.length
                    )
                  }
                  className="p-1.5 bg-stage-surface/90 text-ink-primary hover:bg-stage-surface rounded-sm border border-hairline transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.media.gallery.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
              {product.media.gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`relative w-16 h-20 shrink-0 border rounded-sm overflow-hidden transition-all ${
                    activeGalleryIndex === idx
                      ? 'border-metal-primary ring-1 ring-metal-primary'
                      : 'border-hairline opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={thumb} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Narrative, 2x2 Specs Grid & Purchase */}
        <div className="w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Category Breadcrumb */}
            <div className="flex items-center gap-2 text-ink-muted text-[11px] tracking-widest uppercase mb-3">
              <span>{product.category}</span>
              <span>/</span>
              <span className="text-metal-primary font-medium">{product.subcategory}</span>
            </div>

            {/* Product Title */}
            <h2 className="text-3xl sm:text-4xl font-display text-ink-primary leading-tight mb-3">
              {product.name}
            </h2>

            {/* Price Line */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-display text-ink-primary">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-base text-ink-muted line-through font-body">
                  {formatPrice(product.compareAt)}
                </span>
              )}
              <span className="text-[10px] tracking-wider uppercase font-mono px-2 py-0.5 bg-stage-sunken border border-hairline text-ink-muted">
                Insured FedEx Priority
              </span>
            </div>

            {/* Editorial Story */}
            <div className="border-t border-hairline pt-5 mb-8">
              <h3 className="text-xs uppercase tracking-widest text-ink-muted mb-2 font-mono">
                Editorial Provenance
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed font-body">
                {product.story}
              </p>
            </div>

            {/* The 2x2 Detail Spec Grid (Section 3) */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-ink-muted font-mono">
                  Master Specifications
                </span>
                <span className="text-[10px] text-metal-primary uppercase font-mono tracking-wider flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> GIA Registered
                </span>
              </div>
              <div className="grid grid-cols-2 border border-hairline bg-stage-sunken/40">
                <div className="p-3.5 border-r border-b border-hairline">
                  <span className="block text-[10px] uppercase tracking-wider text-ink-muted font-mono">Carat Weight</span>
                  <span className="text-sm font-display text-ink-primary mt-0.5 block">{product.specs.carat}</span>
                </div>
                <div className="p-3.5 border-b border-hairline">
                  <span className="block text-[10px] uppercase tracking-wider text-ink-muted font-mono">Metal Alloy</span>
                  <span className="text-sm font-display text-ink-primary mt-0.5 block">{product.specs.metal}</span>
                </div>
                <div className="p-3.5 border-r border-hairline">
                  <span className="block text-[10px] uppercase tracking-wider text-ink-muted font-mono">Setting Architecture</span>
                  <span className="text-sm font-display text-ink-primary mt-0.5 block">{product.specs.setting}</span>
                </div>
                <div className="p-3.5">
                  <span className="block text-[10px] uppercase tracking-wider text-ink-muted font-mono">Certificate</span>
                  <span className="text-sm font-display text-ink-primary mt-0.5 block">{product.specs.certificate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-hairline flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3.5 px-6 rounded-full font-body text-xs uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                addedAnimation
                  ? 'bg-metal-primary text-black'
                  : 'bg-ink-primary text-stage-surface hover:bg-metal-primary hover:text-black'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" /> Added to Portfolio
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-metal-highlight" /> Acquire Piece — {formatPrice(product.price)}
                </>
              )}
            </button>
            <button
              onClick={closePdp}
              className="py-3.5 px-6 rounded-full border border-hairline text-ink-primary hover:bg-stage-sunken text-xs uppercase tracking-widest font-body transition-colors"
            >
              Return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
