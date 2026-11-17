import React, { useEffect, useRef, useState } from 'react';

// Bespoke luxury cursor: accent dot pinned to the pointer + trailing ring that
// lerps behind it and swells over interactive elements. Desktop fine pointers
// only, never rendered under prefers-reduced-motion.
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"], label';

export const LuxuryCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);
    document.body.classList.add('cursor-none');

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      ringX: window.innerWidth / 2,
      ringY: window.innerHeight / 2,
      hovering: false,
      pressed: false,
    };

    const onMove = (e: MouseEvent) => {
      state.x = e.clientX;
      state.y = e.clientY;
      state.hovering = !!(e.target as HTMLElement).closest(INTERACTIVE_SELECTOR);
    };
    const onPress = () => { state.pressed = true; };
    const onPressRelease = () => { state.pressed = false; };

    let animFrame: number | null = null;
    const loop = () => {
      state.ringX += (state.x - state.ringX) * 0.16;
      state.ringY += (state.y - state.ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        const scale = state.pressed ? 0.75 : state.hovering ? 1.9 : 1;
        ringRef.current.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.borderColor = state.hovering ? 'rgba(251, 255, 141, 0.7)' : 'rgba(255, 255, 255, 0.3)';
        ringRef.current.style.opacity = state.hovering ? '0.9' : '0.45';
      }
      animFrame = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onPress);
    window.addEventListener('mouseup', onPressRelease);
    animFrame = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onPress);
      window.removeEventListener('mouseup', onPressRelease);
      if (animFrame !== null) cancelAnimationFrame(animFrame);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(251,255,141,0.8)]"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[100] pointer-events-none w-8 h-8 rounded-full border border-white/30"
        aria-hidden="true"
      />
    </>
  );
};
