/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        surface: '#18181b',
        primary: '#6366f1',
        accent: '#10b981',
      },
      backdropBlur: {
        md: '12px',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.glass-panel': {
          '@apply': 'bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-xl shadow-xl',
        },
      });
    },
  ],
};
