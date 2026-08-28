/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{svelte,ts,js}',
    './src/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        void: '#030408',
        'deep-space': '#060a14',
        'nebula-dark': '#0a0e1a',
        'nebula-mid': '#101628',
        'accent-blue': '#7ba6f7',
        'accent-purple': '#a78bfa',
        'accent-cyan': '#67e8f9',
        'accent-violet': '#8b5cf6',
        'accent-indigo': '#6366f1',
        'accent-lavender': '#c4b5fd',
        moonlight: '#e8c99b',
        'moonlight-dim': '#b99e73',
        text: '#f0eef8',
        'text-secondary': '#b0b8d0',
        'text-muted': '#7a829a',
        'text-faint': '#4a5068',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        lg: '24px',
        DEFAULT: '18px',
        sm: '12px',
        xs: '8px',
      },
      backdropBlur: {
        xs: '6px',
        sm: '12px',
      },
    },
  },
  plugins: [],
};