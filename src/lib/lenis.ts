import Lenis from 'lenis';

// Shared Lenis singleton. Initialized once from App; falls back to native
// scrolling when the user prefers reduced motion.
let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return null;

  lenisInstance = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

export function destroyLenis() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  lenisInstance?.destroy();
  lenisInstance = null;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

// Smooth-scroll to an element id through Lenis when available, with a header
// offset; falls back to native scrollIntoView otherwise.
export function scrollToId(targetId: string, offset = -70) {
  const el = document.getElementById(targetId);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { offset });
  } else {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToTop() {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { duration: 1.2 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
