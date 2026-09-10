/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#070A11',
        'brand-dark-warm': '#0D111C',
        'brand-dark-crimson': '#141A29',
        'brand-teal': '#0B1E2B',
        'brand-amber': '#FF8F00',
        'brand-red': '#EF4444',
        // Cohesive obsidian cyber palette
        'void-black': '#070A11',
        'dark-interface': '#0D111C',
        'cyber-blue': '#38BDF8',
        'energy-purple': '#818CF8',
        'system-green': '#10B981',
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
