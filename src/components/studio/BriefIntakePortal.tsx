import React, { useState } from 'react';
import { Lock, Check, Send } from 'lucide-react';

export const BriefIntakePortal: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  return (
    <section id="brief" className="py-24 md:py-32 bg-obsidian text-white border-b border-hairline overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>COMMISSION BRIEF</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mb-3">
            Commission a Studio Drop
          </h2>
          <p className="text-white/60 text-sm font-sans max-w-lg mx-auto font-light">
            Upload CAD files, phone snaps, or gemstone specifications. We deliver an initial prompt matrix and calibrated test render in 24 hours.
          </p>
        </div>

        {/* Native Form */}
        {submitted ? (
          <div className="p-10 border border-accent/40 bg-white/[0.02] rounded-sm text-center animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">
              Brief Registered
            </h3>
            <p className="text-xs text-white/70 max-w-md mx-auto font-sans leading-relaxed mb-4 font-light">
              Our lead photo-realism supervisor and raytracing engineer have received your brief. A confidential intake dossier will arrive shortly.
            </p>
            <span className="inline-block text-[10px] font-mono text-accent uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
              Docket ID: #{Math.floor(100000 + Math.random() * 900000)} · Confirmed
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8" noValidate={false}>
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="brief-name"
                  className="block font-serif text-xl text-white mb-1.5 font-normal"
                >
                  Full Name
                </label>
                <input
                  id="brief-name"
                  type="text"
                  required
                  placeholder="Hélène de Roche"
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="brief-email"
                  className="block font-serif text-xl text-white mb-1.5 font-normal"
                >
                  Confidential Email
                </label>
                <input
                  id="brief-email"
                  type="email"
                  required
                  placeholder="helene@maison-roche.com"
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none font-sans"
                />
              </div>
            </div>

            {/* Row 2: Brand & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label
                  htmlFor="brief-brand-type"
                  className="block font-serif text-xl text-white mb-1.5 font-normal"
                >
                  Maison / Brand Name
                </label>
                <input
                  id="brief-brand-type"
                  type="text"
                  required
                  placeholder="Maison Vendôme"
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="brief-budget"
                  className="block font-serif text-xl text-white mb-1.5 font-normal"
                >
                  Estimated Drop Scope
                </label>
                <select
                  id="brief-budget"
                  required
                  className="w-full bg-black border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2 transition-all rounded-none cursor-pointer font-sans"
                >
                  <option value="$2,400 - $5,000">$2,400 – $5,000 (Pilot 5 SKUs)</option>
                  <option value="$5,000 - $10,000">$5,000 – $10,000 (Seasonal 20 SKUs)</option>
                  <option value="$10,000+">$10,000+ (Maison Retainer)</option>
                </select>
              </div>
            </div>

            {/* Row 3: Notes */}
            <div>
              <label
                htmlFor="brief-message"
                className="block font-serif text-xl text-white mb-1.5 font-normal"
              >
                Collection Details & Target Timeline
              </label>
              <textarea
                id="brief-message"
                rows={3}
                required
                placeholder="Mention metal alloys (18K Yellow, Rose, Champagne), stone cut, required pedestals (Silk, Slate), and deadline..."
                className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none resize-none font-sans"
              />
            </div>

            {/* Submit & NDA Note */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                <span>Transmit Brief</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-white/40">
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span>Confidential NDA Guaranteed</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
