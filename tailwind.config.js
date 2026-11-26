/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        agri: {
          darkest: '#051109',
          dark: '#0a1d12',
          forest: '#0f3822',
          emerald: '#10b981',
          lime: '#84cc16',
          leaf: '#22c55e',
          light: '#ecfdf5',
          gold: '#eab308',
          earth: '#854d0e',
          clay: '#9a3412',
          sand: '#fef3c7',
          surface: 'rgba(15, 38, 25, 0.75)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        tamil: ['Noto Sans Tamil', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px rgba(16, 185, 129, 0.25)',
        'glow-lg': '0 0 45px rgba(16, 185, 129, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
