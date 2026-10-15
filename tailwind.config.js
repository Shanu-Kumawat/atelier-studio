/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#020202',
        surface: '#080808',
        'surface-card': '#0E0E0E',
        'surface-light': '#FAF9F5',
        accent: {
          DEFAULT: '#FBFF8D',
          hover: '#F2F770',
          champagne: '#E8D5A3',
          gold: '#D4A017',
        },
        hairline: 'rgba(255, 255, 255, 0.12)',
        'hairline-light': '#E5DED5',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Didot', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(3rem, 7.5vw, 8.5rem)', { lineHeight: '0.88', letterSpacing: '-0.02em' }],
        'section-head': ['clamp(2.2rem, 5vw, 5rem)', { lineHeight: '0.96' }],
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        full: '9999px',
      },
      maxWidth: {
        '7xl': '1280px',
        '8xl': '1440px',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'spin-slow': 'spin 120s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
