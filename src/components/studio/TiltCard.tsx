import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees */
  maxTilt?: number;
  /** Show a cursor-tracked glare sheen */
  glare?: boolean;
}

function useGlareBackground(
  glareX: MotionValue<string>,
  glareY: MotionValue<string>,
  enabled: boolean,
): MotionValue<string> | null {
  return useTransform([glareX, glareY] as const, ([gx, gy]: string[]) =>
    enabled
      ? `radial-gradient(circle at ${gx} ${gy}, rgba(251,255,141,0.10), transparent 55%)`
      : 'none',
  );
}

// Subtle 3D tilt + optional cursor glare. Fine pointers only; inert under
// prefers-reduced-motion. Must NOT own any transform another engine writes.
export const TiltCard: React.FC<TiltCardProps> = ({ children, className, maxTilt = 4, glare = true }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = React.useState(false);
  const px = useMotionValue(0); // -0.5 .. 0.5
  const py = useMotionValue(0);

  const springPx = useSpring(px, { stiffness: 200, damping: 20, mass: 0.4 });
  const springPy = useSpring(py, { stiffness: 200, damping: 20, mass: 0.4 });

  const rotateX = useTransform(springPy, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springPx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const glareX = useTransform(springPx, [-0.5, 0.5], ['20%', '80%']);
  const glareY = useTransform(springPy, [-0.5, 0.5], ['20%', '80%']);
  const glareBg = useGlareBackground(glareX, glareY, glare && finePointer);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setFinePointer(true);

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width - 0.5);
      py.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [px, py]);

  return (
    // transformPerspective gives rotateX/Y true 3D depth — without it the
    // tilt renders as an orthographic squash that looks like a size glitch.
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group/tilt relative"
    >
      {children}
      {glare && glareBg && (
        <motion.div
          aria-hidden="true"
          className="runway-glare pointer-events-none absolute inset-0 z-20 opacity-0 group-hover/tilt:opacity-100 transition-opacity duration-500"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
};
