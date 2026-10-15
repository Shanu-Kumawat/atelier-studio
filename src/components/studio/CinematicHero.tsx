import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowRight, Play, Pause } from 'lucide-react';

export const CinematicHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020202]">
      
      {/* Background Ambient Cinema */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/assets/hero.mp4"
          poster="/assets/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-50 filter contrast-115 brightness-90"
        />

        {/* Warm screen-blend lift layer */}
        <div className="absolute inset-0 bg-[#967668]/15 mix-blend-screen pointer-events-none" />

        {/* Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#020202]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black/90" />
      </div>

      {/* Floating Video Control (Bottom Left) */}
      <div className="absolute bottom-8 left-6 md:left-12 z-20">
        <button
          onClick={toggleVideo}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/60 hover:text-accent hover:border-accent/40 text-[10px] font-mono transition-colors"
          aria-label={isPlaying ? 'Pause ambient video' : 'Play ambient video'}
        >
          {isPlaying ? <Pause className="w-3 h-3 text-accent" /> : <Play className="w-3 h-3 text-accent" />}
          <span>{isPlaying ? 'PAUSE AMBIENCE' : 'PLAY AMBIENCE'}</span>
        </button>
      </div>

      {/* Clean, Striking Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center pt-24 pb-16">
        
        {/* Subtle Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-accent text-[11px] font-mono tracking-[0.28em] uppercase mb-8 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>AUTONOMOUS JEWELRY AD STUDIO</span>
        </div>

        {/* Monumental Display Headline */}
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white font-normal leading-[0.92] mb-8 tracking-tight">
          Your jewelry deserves better ads.
          <span className="block italic text-accent font-normal mt-2">
            Stop shooting. Start generating.
          </span>
        </h1>

        {/* Clean, Concise Single-Paragraph Subtitle */}
        <p className="text-white/70 text-base sm:text-lg font-sans max-w-2xl mx-auto leading-relaxed mb-10 font-light">
          Turn one raw CAD file or phone photo into a mathematically locked 10-angle catalogue and 100+ high-converting campaign stills in 48 hours.
        </p>

        {/* Clean CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#ten-angle-runway"
            className="px-8 py-4 rounded-full bg-accent text-black font-sans text-xs uppercase tracking-[0.22em] font-semibold hover:bg-white hover:tracking-[0.26em] transition-all duration-300 shadow-xl flex items-center gap-2"
          >
            <span>Explore 12-Angle Runway</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href="#brief"
            className="px-8 py-4 rounded-full border border-white/20 text-white hover:border-accent hover:text-accent font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-sm flex items-center gap-2"
          >
            <span>Book 15-Min Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Minimalist Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-mono text-white/50 border-t border-white/10 pt-6">
          <span className="text-white/80">48-HOUR TURNAROUND</span>
          <span className="text-white/20">•</span>
          <span className="text-accent font-semibold">0% FACET DRIFT</span>
          <span className="text-white/20">•</span>
          <span className="text-white/80">84% PRODUCTION SAVINGS</span>
          <span className="text-white/20">•</span>
          <span className="text-white/80">100% COMMERCIAL BUYOUT</span>
        </div>

      </div>

      {/* Subtle Scroll Down Indicator */}
      <a
        href="#ten-angle-runway"
        className="absolute bottom-8 right-6 md:right-12 z-20 hidden sm:flex items-center gap-2 text-white/40 hover:text-accent text-[11px] font-mono tracking-widest uppercase transition-colors"
      >
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-3 h-3 text-accent animate-bounce" />
      </a>

    </section>
  );
};
