import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-stage-surface border-b border-hairline py-2 text-center text-xs tracking-widest uppercase text-ink-muted transition-colors">
      <div className="max-w-storefront mx-auto px-4 flex items-center justify-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
        <span>Complimentary insured shipping over $500 · Worldwide white-glove courier</span>
        <span className="w-1.5 h-1.5 rounded-full bg-metal-primary" />
      </div>
    </div>
  );
};
