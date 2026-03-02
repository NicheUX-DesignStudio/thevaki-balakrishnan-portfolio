// tailwind.config.js — COMPLETE FIX

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Custom Arconia colors
        'background-interior': 'hsl(var(--background-interior))',
        surface: 'hsl(var(--surface))',
        'surface-elevated': 'hsl(var(--surface-elevated))',
        building: 'hsl(var(--building))',
        'building-dark': 'hsl(var(--building-dark))',
        'building-detail': 'hsl(var(--building-detail))',
        'window-amber': 'hsl(var(--window-amber))',
        'window-coral': 'hsl(var(--window-coral))',
        'window-cyan': 'hsl(var(--window-cyan))',
        'window-dim': 'hsl(var(--window-dim))',
        'window-dark': 'hsl(var(--window-dark))',
        gold: 'hsl(var(--gold))',
        coral: 'hsl(var(--coral))',
        cyan: 'hsl(var(--cyan))',
        emerald: 'hsl(var(--emerald))',
        rose: 'hsl(var(--rose))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'cinematic-fade': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'subtle-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'breathing-glow': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.15)' },
        },
        'pin-glow': {
          '0%, 100%': {
            boxShadow: '0 0 10px hsl(var(--accent) / 0.5)',
            opacity: 0.9,
          },
          '50%': {
            boxShadow: '0 0 20px hsl(var(--accent) / 0.8)',
            opacity: 1,
          },
        },
        'thread-pull': {
          '0%': { strokeDashoffset: 20 },
          '100%': { strokeDashoffset: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'cinematic-fade': 'cinematic-fade 2s ease-out forwards',
        'subtle-float': 'subtle-float 6s ease-in-out infinite',
        'breathing-glow': 'breathing-glow 3s ease-in-out infinite',
        'pin-glow': 'pin-glow 2s ease-in-out infinite',
        'thread-pull': 'thread-pull 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};