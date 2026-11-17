import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RevealTextProps {
  /** Headline content. Use `\n` to force explicit line breaks; otherwise text
   * is split into words, each wrapped in its own mask for a staggered rise. */
  children: string;
  className?: string;
  /** Delay before the first line starts (seconds) */
  delay?: number;
  /** Stagger between words/lines (seconds) */
  stagger?: number;
  /** When false, animates on mount instead of on scroll into view */
  inView?: boolean;
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Luxury line-mask headline reveal: each word rises from behind an
// overflow-hidden mask. Renders as a block-level element.
export const RevealText: React.FC<RevealTextProps> = ({
  children,
  className,
  delay = 0,
  stagger = 0.05,
  inView = false,
}) => {
  const segments = useMemo(() => children.split('\n'), [children]);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word = {
    hidden: { y: '110%' },
    visible: {
      y: '0%',
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      {...(inView ? { whileInView: 'visible', viewport: { once: true, amount: 0.4 } } : { animate: 'visible' })}
      className={className ?? 'block'}
      aria-label={children}
    >
      {segments.map((segment, sIdx) => (
        <span key={sIdx} className={sIdx > 0 ? 'block' : undefined}>
          {segment.split(' ').map((w, wIdx, arr) => (
            <span key={wIdx} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]">
              <motion.span variants={word} className="inline-block will-change-transform">
                {w}
                {wIdx < arr.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};
