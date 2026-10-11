import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Maarjud Design System (CLAUDE.md): use these token names, never raw Tailwind colors
      colors: {
        surface: '#fbf4ec',
        'surface-raised': '#fffaf5',
        line: '#e8d6c9',
        ink: '#2b1320',
        'ink-muted': '#6b4f5c',
        rouge: '#b3124f',
        velvet: '#4a0f2b',
        gold: '#d4a03c',
        blush: '#f5cfd3',
        jade: '#2e6f5c',
      },
      fontFamily: {
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-baskervville)', 'Baskerville', 'Georgia', 'serif'],
        promo: ['"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
