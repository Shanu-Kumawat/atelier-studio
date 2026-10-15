import React, { useEffect } from 'react';
import { AngleSpec, ANGLE_SERIES } from '../../data/angles';
import { X, ChevronLeft, ChevronRight, Camera, CheckCircle2 } from 'lucide-react';

interface Props {
  angle: AngleSpec | null;
  onClose: () => void;
  onNavigate: (newAngle: AngleSpec) => void;
}

export const AngleDetailModal: React.FC<Props> = ({ angle, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!angle) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const nextIdx = (angle.index % ANGLE_SERIES.length);
        onNavigate(ANGLE_SERIES[nextIdx]);
      }
      if (e.key === 'ArrowLeft') {
        const prevIdx = angle.index - 2 < 0 ? ANGLE_SERIES.length - 1 : angle.index - 2;
        onNavigate(ANGLE_SERIES[prevIdx]);
      }
    };

    if (angle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [angle, onClose, onNavigate]);

  if (!angle) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] text-white border border-white/15 rounded-sm shadow-2xl flex flex-col lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 z-30 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close telemetry dossier"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual & Navigation */}
        <div className="w-full lg:w-3/5 p-6 sm:p-8 bg-black flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative">
          
          <div className="relative aspect-square w-full rounded-sm overflow-hidden flex items-center justify-center bg-[#050505] border border-white/5">
            <img
              src={angle.image}
              alt={angle.title}
              className="w-full h-full object-contain filter brightness-105"
            />

            <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded-sm border border-white/10 text-xs font-mono text-accent">
              0{angle.index} · {angle.angleTag}
            </div>

            <button
              onClick={() => {
                const prevIdx = angle.index - 2 < 0 ? ANGLE_SERIES.length - 1 : angle.index - 2;
                onNavigate(ANGLE_SERIES[prevIdx]);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-accent hover:text-black text-white border border-white/10 transition-colors"
              aria-label="Previous angle"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                const nextIdx = (angle.index % ANGLE_SERIES.length);
                onNavigate(ANGLE_SERIES[nextIdx]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-accent hover:text-black text-white border border-white/10 transition-colors"
              aria-label="Next angle"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick thumbnails */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
            {ANGLE_SERIES.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  onNavigate(a);
                }}
                className={`relative w-12 h-12 shrink-0 rounded-sm overflow-hidden border transition-all ${
                  a.id === angle.id
                    ? 'border-accent ring-1 ring-accent opacity-100 scale-105'
                    : 'border-white/10 opacity-40 hover:opacity-100'
                }`}
              >
                <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Telemetry Specs */}
        <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-accent text-[11px] font-mono tracking-widest uppercase mb-2">
              <Camera className="w-3.5 h-3.5" />
              <span>ORBITAL ANGLE 0{angle.index} OF 10</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-2 leading-snug">
              {angle.title}
            </h3>

            <p className="text-white/60 text-xs font-sans leading-relaxed mb-6 font-light">
              {angle.notes}
            </p>

            {/* 2x2 Specs Grid */}
            <div className="border border-white/10 bg-black/60 rounded-sm mb-6 overflow-hidden">
              <div className="grid grid-cols-2 text-xs font-mono">
                <div className="p-3 border-r border-b border-white/10">
                  <span className="block text-[9px] uppercase tracking-wider text-white/40">Elevation</span>
                  <span className="text-white mt-0.5 block">{angle.elevation}</span>
                </div>
                <div className="p-3 border-b border-white/10">
                  <span className="block text-[9px] uppercase tracking-wider text-white/40">Azimuth</span>
                  <span className="text-white mt-0.5 block">{angle.azimuth}</span>
                </div>
                <div className="p-3 border-r border-white/10">
                  <span className="block text-[9px] uppercase tracking-wider text-white/40">Lens</span>
                  <span className="text-white mt-0.5 block truncate">{angle.lens}</span>
                </div>
                <div className="p-3">
                  <span className="block text-[9px] uppercase tracking-wider text-white/40">Verification</span>
                  <span className="text-accent mt-0.5 block truncate font-semibold">{angle.verification}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-white/60 border-t border-white/10 pt-4">
              <div>
                <span className="text-[10px] uppercase text-white/40 block">Lighting Physics:</span>
                <span className="text-white/80">{angle.lighting}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-white/40 block">Critical Focal Point:</span>
                <span className="text-white/80">{angle.focusPoint}</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-mono text-accent flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Geometry Locked
            </span>
            <button
              onClick={() => {
                onClose();
              }}
              className="px-5 py-2 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
