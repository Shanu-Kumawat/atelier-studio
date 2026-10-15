import React, { useState, useEffect } from 'react';

export const TopProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-black/40">
      <div
        className="h-full bg-accent transition-all duration-75 shadow-[0_0_12px_#FBFF8D]"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
      />
    </div>
  );
};
