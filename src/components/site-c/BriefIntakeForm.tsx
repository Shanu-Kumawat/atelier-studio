import React, { useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { Lock, Check, Send, ShieldCheck, Sparkles } from 'lucide-react';

export const BriefIntakeForm: React.FC = () => {
  const { brandName } = useBrand();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="brief" className="py-24 md:py-32 bg-black text-white border-b border-hairline overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
            <span className="text-[0.6875rem] uppercase tracking-[0.25em] text-metal-highlight font-mono">
              COMMISSION INTAKE PORTAL · SECTION 6.9
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-white font-normal mb-4">
            Commission a Studio Drop
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-body leading-relaxed max-w-xl mx-auto">
            Submit your pieces, CAD files, or reference photography. Our art director responds with a
            calibrated sample render within 24 hours.
          </p>
        </div>

        {/* The Native Accessible Form */}
        {submitted ? (
          <div className="p-12 border border-metal-primary/50 bg-white/[0.02] rounded-sm text-center animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-metal-primary/10 border border-metal-primary/30 flex items-center justify-center mx-auto mb-6">
              <Check className="w-7 h-7 text-metal-primary" />
            </div>
            <h3 className="font-display text-3xl text-white mb-3">
              Production Brief Registered
            </h3>
            <p className="text-sm text-white/70 max-w-lg mx-auto font-body leading-relaxed mb-6">
              Our lead photo-realism supervisor and color science director have received your brief. A confidential intake dossier and initial prompt matrix will be delivered to your inbox shortly.
            </p>
            <span className="inline-block text-xs font-mono text-metal-highlight uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
              Docket ID: #{Math.floor(100000 + Math.random() * 900000)}
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10" noValidate={false}>
            {/* Row 1: Name & Email (Two-column rows on sm+) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
              <div className="relative">
                {/* Labels in Bodoni Moda, not Inter — 19px, tracking 0.01em (Section 6.9) */}
                <label
                  htmlFor="brief-name"
                  className="block font-display text-[19px] tracking-[0.01em] text-white mb-2"
                >
                  Client Name
                </label>
                {/* Underline inputs: transparent, border-bottom 1px solid rgba(255,255,255,0.20), no radius; on focus border shifts to metal.hairline with soft second line */}
                <input
                  id="brief-name"
                  type="text"
                  required
                  placeholder="e.g. Laurent de Vendôme"
                  className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:shadow-[0_1px_0_0_#C8A45C] focus:outline-none text-sm text-white py-2.5 transition-all placeholder:text-white/20 rounded-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="brief-email"
                  className="block font-display text-[19px] tracking-[0.01em] text-white mb-2"
                >
                  Direct Email
                </label>
                <input
                  id="brief-email"
                  type="email"
                  required
                  placeholder="laurent@maison.com"
                  className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:shadow-[0_1px_0_0_#C8A45C] focus:outline-none text-sm text-white py-2.5 transition-all placeholder:text-white/20 rounded-none"
                />
              </div>
            </div>

            {/* Row 2: Brand / Project Type & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
              <div className="relative">
                <label
                  htmlFor="brief-brand-type"
                  className="block font-display text-[19px] tracking-[0.01em] text-white mb-2"
                >
                  Brand / Project Type
                </label>
                <input
                  id="brief-brand-type"
                  type="text"
                  required
                  placeholder="e.g. High Jewelry Seasonal Drop / Omnichannel Ads"
                  className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:shadow-[0_1px_0_0_#C8A45C] focus:outline-none text-sm text-white py-2.5 transition-all placeholder:text-white/20 rounded-none"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="brief-budget"
                  className="block font-display text-[19px] tracking-[0.01em] text-white mb-2"
                >
                  Estimated Project Budget
                </label>
                <select
                  id="brief-budget"
                  required
                  className="w-full bg-black border-b border-white/20 focus:border-metal-hairline focus:shadow-[0_1px_0_0_#C8A45C] focus:outline-none text-sm text-white py-2.5 transition-all rounded-none cursor-pointer"
                >
                  <option value="$2,400 - $5,000">$2,400 – $5,000 (Pilot 5 SKUs)</option>
                  <option value="$5,000 - $10,000">$5,000 – $10,000 (Seasonal 20 SKUs)</option>
                  <option value="$10,000 - $25,000">$10,000 – $25,000 (Full Lookbook & Ads)</option>
                  <option value="$25,000+">$25,000+ (Maison Retainer)</option>
                </select>
              </div>
            </div>

            {/* Row 3: Asset Deadline */}
            <div className="relative">
              <label
                htmlFor="brief-deadline"
                className="block font-display text-[19px] tracking-[0.01em] text-white mb-2"
              >
                Target Asset Deadline
              </label>
              <input
                id="brief-deadline"
                type="text"
                required
                placeholder="e.g. Within 48 hours / Launch Date: November 15"
                className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:shadow-[0_1px_0_0_#C8A45C] focus:outline-none text-sm text-white py-2.5 transition-all placeholder:text-white/20 rounded-none"
              />
            </div>

            {/* Row 4: Full-width Textarea */}
            <div className="relative">
              <label
                htmlFor="brief-message"
                className="block font-display text-[19px] tracking-[0.01em] text-white mb-2"
              >
                Creative Brief & Gemstone Specifications
              </label>
              <textarea
                id="brief-message"
                rows={4}
                required
                placeholder="Describe your hero pieces, target metals (18K yellow, rose, champagne), desired backdrops (black silk, charcoal slate), and distribution channels..."
                className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:shadow-[0_1px_0_0_#C8A45C] focus:outline-none text-sm text-white py-2.5 transition-all placeholder:text-white/20 rounded-none resize-none"
              />
            </div>

            {/* Submit & Lock Note */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Submit: bg-ink cream text, hover -> gold, letter-spacing widens (Section 6.9) */}
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-body text-xs uppercase tracking-[0.2em] font-medium hover:bg-metal-primary hover:tracking-[0.28em] transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                <span>Transmit Commission Brief</span>
              </button>

              {/* Lock note with icon (Section 6.9) */}
              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <Lock className="w-4 h-4 text-metal-primary shrink-0" />
                <span>NDA & Commercial Confidentiality Guaranteed</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
