/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
