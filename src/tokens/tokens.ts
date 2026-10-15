/**
 * DESIGN TOKENS — SINGLE SOURCE OF TRUTH
 * Section 1: Every colour, font, and spacing value resolves here.
 * Chrome is identical across both stages. Only the stage inverts.
 * Gold is the only accent family. No blue, purple, green, gradient meshes, or neon.
 */

export const TOKENS = {
  // Stage Dark: Editorial / Campaign / Lookbook
  dark: {
    stage: {
      base: '#000000',
      surface: '#050505',
      surface2: '#101010',
      sunken: '#080808',
    },
    metal: {
      primary: '#D4A017',     // Antique gold
      highlight: '#FDE68A',   // Champagne highlight
      shadow: '#2D1B0E',      // Gold gradient base
      hairline: '#C8A45C',    // Gold rule accents, SVG strokes
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255,255,255,0.70)',
      tertiary: 'rgba(255,255,255,0.40)',
    },
    ink: {
      primary: '#FFFFFF',
      muted: 'rgba(255,255,255,0.40)',
    },
    hairline: 'rgba(255,255,255,0.14)',
  },

  // Stage Light: Storefront / Product Grid / PDP
  light: {
    stage: {
      base: '#F9F4F0',        // Warm off-white
      surface: '#FFFFFF',     // Card faces
      surface2: '#F5EFEB',    // Secondary surface
      sunken: '#EFEAE4',      // Image wells
    },
    metal: {
      primary: '#D4A017',
      highlight: '#FDE68A',
      shadow: '#2D1B0E',
      hairline: '#C8A45C',    // Gold rule accents, SVG strokes
    },
    text: {
      primary: '#1A1A1A',
      secondary: 'rgba(26,26,26,0.70)',
      tertiary: 'rgba(26,26,26,0.40)',
    },
    ink: {
      primary: '#1A1A1A',     // Active states
      muted: '#888888',       // Struck prices, inactive tabs
    },
    hairline: '#E5DED5',      // Card borders
  },

  // Typography definitions (Non-negotiable)
  typography: {
    display: '"Bodoni Moda", Didot, "Times New Roman", serif',
    body: 'Inter, system-ui, sans-serif',
    scale: {
      hero: 'clamp(3rem, 7vw, 8rem)',
      sectionHead: 'clamp(2rem, 4.5vw, 4.5rem)',
      productName: '1.125rem',
      body: '0.9375rem',
      meta: '0.6875rem',
    },
  },

  // Spacing & Motion
  layout: {
    editorialMax: '1240px',     // max-w-7xl
    storefrontMax: '1480px',    // max-w-[1480px]
    rhythm: 'py-24 md:py-32',
    gutters: 'px-6 md:px-12',
  },

  radius: {
    editorial: '2px',
    cards: '4px',
    pills: '9999px',
  },

  motion: {
    standardEasing: [0.22, 1, 0.36, 1],
    complexEasing: [0.16, 1, 0.3, 1],
    duration: 0.8,
    stagger: 0.2,
  },
} as const;

export type StageMode = 'light' | 'dark';
