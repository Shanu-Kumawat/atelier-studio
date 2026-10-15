import React, { useState } from 'react';
import { useBrand } from '../../context/BrandContext';
import { MapPin, Calendar, Check, Send, Shield } from 'lucide-react';

export const EditorialContactFooter: React.FC = () => {
  const { brandName } = useBrand();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <footer id="contact" className="bg-black text-white border-t border-hairline pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Salon Appointment Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-20 border-b border-white/10">
          
          {/* Left Narrative */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
              <span className="text-[0.6875rem] uppercase tracking-[0.3em] text-metal-highlight font-mono">
                CONCIERGE & PRIVATE SALON
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl text-white font-normal mb-6 leading-tight">
              Arrange a Private
              <span className="italic block text-metal-primary">Viewing in Paris.</span>
            </h2>

            <p className="text-white/70 text-body-custom leading-relaxed font-body mb-8">
              Experience the permanent high jewelry collections in person. Private viewing salons
              are reserved exclusively for bespoke commissions and heirloom acquisitions.
            </p>

            <div className="space-y-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-metal-primary" />
                <span>28 Place Vendôme, 75001 Paris, France</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-metal-primary" />
                <span>Tuesday – Saturday, By Confirmed Appointment Only</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-metal-primary" />
                <span>Private Security Protocol & Insured Vault Access</span>
              </div>
            </div>
          </div>

          {/* Right Form: dark form with border-b border-white/20 transparent inputs, boutique location select */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-10 border border-metal-primary/40 bg-white/[0.02] rounded-sm text-center">
                <Check className="w-10 h-10 text-metal-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl text-white mb-2">Salon Inquiry Received</h3>
                <p className="text-sm text-white/70 max-w-md mx-auto">
                  Our private concierge will contact you within four business hours to confirm salon access and vault viewings.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative">
                    <label htmlFor="salon-name" className="block font-display text-lg text-white mb-2 tracking-wide">
                      Client Full Name
                    </label>
                    <input
                      id="salon-name"
                      type="text"
                      required
                      placeholder="e.g. Hélène de Roche"
                      className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label htmlFor="salon-email" className="block font-display text-lg text-white mb-2 tracking-wide">
                      Confidential Email
                    </label>
                    <input
                      id="salon-email"
                      type="email"
                      required
                      placeholder="client@vendome.com"
                      className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Boutique Location Select */}
                  <div className="relative">
                    <label htmlFor="salon-location" className="block font-display text-lg text-white mb-2 tracking-wide">
                      Boutique Location
                    </label>
                    <select
                      id="salon-location"
                      required
                      className="w-full bg-black border-b border-white/20 focus:border-metal-hairline focus:outline-none text-sm text-white py-2 transition-all rounded-none cursor-pointer"
                    >
                      <option value="paris">Paris — 28 Place Vendôme</option>
                      <option value="geneva">Geneva — Rue du Rhône</option>
                      <option value="newyork">New York — 740 Fifth Avenue</option>
                      <option value="london">London — New Bond Street</option>
                    </select>
                  </div>

                  {/* Preferred Timeline */}
                  <div className="relative">
                    <label htmlFor="salon-date" className="block font-display text-lg text-white mb-2 tracking-wide">
                      Requested Date Window
                    </label>
                    <input
                      id="salon-date"
                      type="text"
                      placeholder="e.g. Next week / Autumn Season"
                      className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <label htmlFor="salon-message" className="block font-display text-lg text-white mb-2 tracking-wide">
                    Acquisition Interest / Bespoke Inquiries
                  </label>
                  <textarea
                    id="salon-message"
                    rows={3}
                    placeholder="Describe specific diamond weights, collection editions, or custom setting requirements..."
                    className="w-full bg-transparent border-b border-white/20 focus:border-metal-hairline focus:outline-none text-sm text-white py-2 transition-all placeholder:text-white/20 rounded-none resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-metal-primary text-black font-body text-xs uppercase tracking-[0.25em] font-medium hover:bg-metal-highlight transition-all duration-300 shadow-lg hover:shadow-metal-primary/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Private Appointment</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Hairline Footer */}
        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/40 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm tracking-[0.2em] text-white uppercase">
              {brandName}
            </span>
            <span>· EDITORIAL LOOKBOOK STAGE</span>
          </div>

          <div className="flex items-center space-x-6">
            <a href="#editorial-hero" className="hover:text-metal-primary transition-colors">
              Return to Top
            </a>
            <span>STRICT ACCENT: ANTIQUE GOLD #D4A017 ONLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
