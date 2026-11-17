import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountUpResult<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T>;
  /** Fully formatted display string; counts the leading numeric portion */
  display: string;
}

// Animates the leading numeric portion of a display string (e.g. "4×",
// "120+", "84%", "₹19,500", "48 Hours") from 0 to the target when the
// element scrolls into view. Renders the final value immediately under
// prefers-reduced-motion.
export function useCountUp<T extends HTMLElement = HTMLDivElement>(value: string, duration = 1.4): CountUpResult<T> {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  // Stable identity across renders — putting a fresh match array in the
  // effect deps would restart the animation on every frame (flicker bug).
  const match = useMemo(() => value.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/), [value]);

  const [display, setDisplay] = useState(() => {
    // Start collapsed at zero when the value will animate, so the final
    // number never flashes before the count begins.
    if (!match) return value;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return value;
    const target = parseFloat(match[2].replace(/,/g, ''));
    if (!isFinite(target)) return value;
    const zeroed = Math.round(target) === target ? '0' : '0.0';
    return `${match[1]}${zeroed}${match[3]}`;
  });

  useEffect(() => {
    if (!match) return;
    const [, prefix, numeric, suffix] = match;
    const target = parseFloat(numeric.replace(/,/g, ''));
    if (!isFinite(target)) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    if (!inView) {
      const zeroed = Math.round(target) === target ? '0' : '0.0';
      setDisplay(`${prefix}${zeroed}${suffix}`);
      return;
    }

    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const decimals = numeric.includes('.') ? numeric.split('.')[1].length : 0;
        const formatted = latest.toFixed(decimals);
        const grouped = numeric.includes(',') && !numeric.includes('.')
          ? Math.round(latest).toLocaleString('en-IN')
          : formatted;
        setDisplay(`${prefix}${grouped}${suffix}`);
      },
      onComplete: () => setDisplay(value),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, match, duration]);

  return { ref, display };
}
