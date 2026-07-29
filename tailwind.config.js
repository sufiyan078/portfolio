/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-dark-warm': '#1F150C',
        'brand-dark-crimson': '#280905',
        'brand-teal': '#0F3040',
        'brand-amber': '#FF8F00',
        'brand-red': '#D90000',
        // Legacy alias maps to new palette
        'void-black': '#000000',
        'dark-interface': '#1F150C',
        'cyber-blue': '#FF8F00',
        'energy-purple': '#D90000',
        'system-green': '#FF8F00',
      },
      fontFamily: {
        heading: ['"Nova Flat"', 'sans-serif'],
        sans: ['"Nova Flat"', 'sans-serif'],
        mono: ['"Press Start 2P"', 'JetBrains Mono', 'monospace'],
        pixel: ['"Press Start 2P"', 'cursive'],
        bungee: ['"Bungee Shade"', 'cursive'],
        'black-ops': ['"Black Ops One"', 'cursive'],
        nova: ['"Nova Flat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
