import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
  children: React.ReactNode;
  /** Max displacement in px when the cursor is over the element */
  strength?: number;
  className?: string;
}

// Wraps its child in a magnetically-reactive shell: the child drifts a few px
// toward the cursor and springs back on leave. Fine pointers only; inert
// under prefers-reduced-motion.
export const Magnetic: React.FC<MagneticProps> = ({ children, strength = 8, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set((relX / (rect.width / 2)) * strength);
      y.set((relY / (rect.height / 2)) * strength);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, x, y]);

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} className={className ?? 'inline-block'}>
      {children}
    </motion.div>
  );
};
