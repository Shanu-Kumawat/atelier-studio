import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Check, Send, UploadCloud, File, X, Sparkles, ShieldCheck, Phone } from 'lucide-react';

interface AttachedFile {
  name: string;
  size: string;
}

export const BriefIntakePortal: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [docketId, setDocketId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    brand: '',
    city: 'Mumbai (BKC / Zaveri Bazar)',
    scope: '₹1,25,000 (Flagship Pilot · 5 Master SKUs)',
    notes: '',
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    const newFiles: AttachedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const sizeMb = (f.size / (1024 * 1024)).toFixed(1);
      newFiles.push({
        name: f.name,
        size: `${sizeMb} MB`,
      });
    }
    setAttachedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `ATELIER-IND-${Math.floor(100000 + Math.random() * 900000)}`;
    setDocketId(id);
    setSubmitted(true);
  };

  return (
    <section id="brief" className="py-24 sm:py-32 md:py-36 bg-[#020202] text-white border-b border-hairline overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase mb-4">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>CONFIDENTIAL COMMISSION BRIEF</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-tight mb-4">
            Commission a Studio Drop
          </h2>

          <p className="text-white/50 text-xs sm:text-sm font-sans max-w-lg mx-auto font-light leading-relaxed">
            Upload workshop photos, 3DM CAD files, or gemstone specifications. Our raytracing supervisors deliver an initial calibrated test render in 24 hours.
          </p>
        </div>

        {/* Portal Body */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-10 sm:p-14 border border-accent/40 bg-[#060606] rounded-sm text-center shadow-[0_0_48px_rgba(251,255,141,0.08)]"
          >
            <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-5">
              <Check className="w-7 h-7 text-accent" />
            </div>

            <h3 className="font-serif text-3xl text-white mb-2 font-normal">
              Commission Brief Registered
            </h3>

            <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto font-sans leading-relaxed mb-6 font-light">
              Your asset brief has been received by our lead optical supervisor and diamond facet raytracing engineer. A confidential intake dossier will arrive shortly.
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider px-4 py-2 bg-white/5 border border-white/10 rounded-sm mb-6">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>DOCKET ID: {docketId} · CONFIRMED</span>
            </div>

            <div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setAttachedFiles([]);
                }}
                className="text-xs font-mono text-white/50 hover:text-white uppercase tracking-wider underline transition-colors"
              >
                Submit another commission brief
              </button>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-sm bg-[#060606] border border-white/10 shadow-2xl space-y-8">
            
            {/* Row 1: Name & Confidential Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="brief-name" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                  Principal Full Name *
                </label>
                <input
                  id="brief-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Vikramaditya Singhania"
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2.5 transition-colors placeholder:text-white/20 font-sans"
                />
              </div>

              <div>
                <label htmlFor="brief-email" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                  Confidential Corporate Email *
                </label>
                <input
                  id="brief-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="v.singhania@maison-heritage.com"
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2.5 transition-colors placeholder:text-white/20 font-sans"
                />
              </div>
            </div>

            {/* Row 2: Maison / Brand & WhatsApp / Direct Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="brief-brand" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                  Maison / Brand Name *
                </label>
                <input
                  id="brief-brand"
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="Singhania & Co. Fine Jewels"
                  className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2.5 transition-colors placeholder:text-white/20 font-sans"
                />
              </div>

              <div>
                <label htmlFor="brief-phone" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center justify-between">
                  <span>Direct WhatsApp / Phone *</span>
                  <span className="text-[10px] text-accent lowercase">priority dispatch</span>
                </label>
                <div className="relative">
                  <input
                    id="brief-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2.5 transition-colors placeholder:text-white/20 font-sans"
                  />
                  <Phone className="w-4 h-4 text-white/30 absolute right-2 top-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Row 3: Manufacturing Bourse City & Scope Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label htmlFor="brief-city" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                  Jewelry Center / Bourse Hub
                </label>
                <select
                  id="brief-city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-black border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2.5 transition-colors rounded-none cursor-pointer font-sans"
                >
                  <option value="Mumbai (BKC / Zaveri Bazar)">Mumbai (BKC / Zaveri Bazar)</option>
                  <option value="Surat (Diamond Bourse)">Surat (Diamond Bourse)</option>
                  <option value="Jaipur (Gemstone Capital)">Jaipur (Gemstone Capital)</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Bangalore / Hyderabad / Chennai">Bangalore / Hyderabad / Chennai</option>
                  <option value="International Maison (Dubai, London, Paris, NYC)">International Maison (Dubai, London, Paris, NYC)</option>
                </select>
              </div>

              <div>
                <label htmlFor="brief-scope" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                  Estimated Drop Scope (INR) *
                </label>
                <select
                  id="brief-scope"
                  required
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-black border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2.5 transition-colors rounded-none cursor-pointer font-sans"
                >
                  <option value="₹1,25,000 (Flagship Pilot · 5 Master SKUs)">₹1,25,000 (Flagship Pilot · 5 Master SKUs)</option>
                  <option value="₹3,85,000 (Atelier Seasonal · 20 Master SKUs)">₹3,85,000 (Atelier Seasonal · 20 Master SKUs)</option>
                  <option value="₹8,50,000+ (Maison Retainer · Continuous Drops)">₹8,50,000+ (Maison Retainer · Continuous Drops)</option>
                  <option value="Custom Calibration Drop">Custom Calibration Drop</option>
                </select>
              </div>
            </div>

            {/* Row 4: Drag & Drop Asset Upload Area */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2 flex items-center justify-between">
                <span>Ingestion Assets (CAD, Desk Snaps, or Specs)</span>
                <span className="text-[10px] text-white/30 lowercase">optional for initial quote</span>
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 sm:p-8 rounded-sm border-2 border-dashed transition-all duration-300 text-center cursor-pointer ${
                  isDragging
                    ? 'border-accent bg-accent/[0.06] shadow-[0_0_24px_rgba(251,255,141,0.15)]'
                    : 'border-white/15 bg-white/[0.015] hover:border-white/30 hover:bg-white/[0.03]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.webp,.3dm,.stl,.step,.obj,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <UploadCloud className={`w-8 h-8 mx-auto mb-3 transition-colors ${isDragging ? 'text-accent' : 'text-white/40'}`} />
                
                <p className="text-xs sm:text-sm text-white font-sans font-normal mb-1">
                  Drag and drop raw bench photos or 3DM CAD files here
                </p>
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  Supports .3DM · .STL · .PNG · .JPG · .WEBP · .PDF (Up to 150MB)
                </p>
              </div>

              {/* Uploaded File Pills Preview */}
              <AnimatePresence>
                {attachedFiles.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-wrap gap-2 mt-3"
                  >
                    {attachedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                      >
                        <File className="w-3.5 h-3.5 text-accent" />
                        <span className="max-w-[180px] truncate">{file.name}</span>
                        <span className="text-[10px] text-white/40">({file.size})</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(idx);
                          }}
                          className="text-white/40 hover:text-white p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Row 5: Notes & Timeline Requirements */}
            <div>
              <label htmlFor="brief-message" className="block text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                Collection Specifications & Timeline Requirements *
              </label>
              <textarea
                id="brief-message"
                rows={3}
                required
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Mention metal alloys (18K Yellow, Rose, Polki Champagne), gemstone cut (Emerald, Brilliant), target ad aspect ratios, and deadline requirements..."
                className="w-full bg-transparent border-b border-white/20 focus:border-accent focus:outline-none text-sm text-white py-2.5 transition-colors placeholder:text-white/20 resize-none font-sans"
              />
            </div>

            {/* Submit Bar & Security Badges */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
              <button
                type="submit"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-all shadow-lg hover:shadow-[0_0_24px_rgba(251,255,141,0.35)] flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Transmit Commission Brief</span>
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center gap-2 text-[11px] font-mono text-white/40">
                <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
                <span>Mutual Non-Disclosure Agreement (NDA) Guaranteed</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
