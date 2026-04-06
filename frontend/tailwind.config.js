/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Inter', 'sans-serif'], // For headings
        accent: ['Space Grotesk', 'sans-serif'], // Just in case
      },
      colors: {
        black: '#000000',
        lime: '#E4FE9A',
        lavender: '#C1A4E8',
        'theme-accent': 'var(--theme-accent)',
        'gray-950': '#0a0a0a',
        'gray-900': '#171717',
        'gray-800': '#262626',
        'gray-700': '#404040',
        'gray-600': '#525252',
        'gray-500': '#737373',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
}
