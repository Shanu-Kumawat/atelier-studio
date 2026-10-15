import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBrand } from '../../context/BrandContext';
import { Award, Compass, Shield } from 'lucide-react';

export const EditorialHeritage: React.FC = () => {
  const { brandName } = useBrand();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax y: 20%
  const yParallax = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  
  // clip-path: inset() mask reveal
  const clipInset = useTransform(
    scrollYProgress,
    [0.1, 0.45],
    ['inset(18% 18% 18% 18%)', 'inset(0% 0% 0% 0%)']
  );

  return (
    <section
      id="heritage"
      ref={sectionRef}
      className="relative py-28 md:py-36 bg-stage-surface text-white border-t border-hairline overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image Container 50-80vh with clip-path: inset() mask reveal, grayscale + mix-blend-luminosity */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={{ clipPath: clipInset }}
              className="relative w-full h-[55vh] md:h-[70vh] rounded-sm overflow-hidden border border-white/14 shadow-2xl bg-black"
            >
              <motion.img
                src="/assets/b-heritage.webp"
                alt={`${brandName} master artisan workbench detail with loupe and half-finished setting`}
                style={{ y: yParallax }}
                className="w-full h-[120%] object-cover grayscale mix-blend-luminosity filter contrast-125 hover:grayscale-0 hover:mix-blend-normal transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white/60">
                <span>PLACE VENDÔME ATELIER</span>
                <span className="text-metal-primary">RIG-EDITORIAL</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Eyebrow "Since [year]", Bodoni heading, body */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-metal-primary" />
              <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-metal-highlight font-mono font-medium">
                Since 1924 · A Century of French Refinement
              </span>
            </div>

            {/* Bodoni Heading */}
            <h2 className="font-display text-section-head text-white font-normal mb-8 leading-[1.02]">
              The Secret of
              <span className="block italic text-metal-primary font-normal mt-1">
                L’Art du Trait.
              </span>
            </h2>

            {/* Body copy */}
            <div className="space-y-6 text-white/70 text-body-custom leading-relaxed font-body">
              <p>
                Founded on the premise that fine jewelry should behave as an extension of light,
                our atelier preserves century-old Parisian lapidary techniques alongside modern
                algorithmic optical calibration.
              </p>
              <p>
                Every prong is filed by hand under a 40× stereoscopic loupe to guarantee zero
                specular glare obstruction. Our proprietary antique gold alloy eliminates the
                unwanted harsh green and orange overtones typical of mass-manufactured casting,
                yielding a velvet champagne glow calibrated exclusively for evening wear.
              </p>
            </div>

            {/* Spec / Provenance Badges */}
            <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-hairline">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-metal-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider font-mono text-white">Master Lapidaries</span>
                  <span className="text-xs text-white/50">Hand-set under 40× magnification</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-metal-primary shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider font-mono text-white">GIA Certified</span>
                  <span className="text-xs text-white/50">Ethically sourced conflict-free gems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
