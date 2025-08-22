/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          black: '#0a0a0a',
          charcoal: '#1a1a1a',
          gray: '#2a2a2a',
          silver: '#c0c0c0',
          white: '#f5f5f5',
          sepia: '#704214',
          amber: '#d4af37'
        }
      },
      fontFamily: {
        'noir': ['Georgia', 'Times New Roman', 'serif'],
        'deco': ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 0.5s ease-in-out infinite alternate',
        'tv-static': 'tv-static 0.1s linear infinite',
        'spotlight': 'spotlight 4s ease-in-out infinite',
        'door-open': 'door-open 2s ease-out forwards',
        'curtain-rise': 'curtain-rise 3s ease-out forwards'
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 
            boxShadow: '0 0 5px rgba(212, 175, 55, 0.5)',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.6)',
            textShadow: '0 0 20px rgba(212, 175, 55, 0.8)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'flicker': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0.7 }
        },
        'tv-static': {
          '0%': { opacity: 0.9 },
          '25%': { opacity: 0.95 },
          '50%': { opacity: 0.85 },
          '75%': { opacity: 0.9 },
          '100%': { opacity: 0.88 }
        },
        'spotlight': {
          '0%': { transform: 'translateX(-20px)' },
          '50%': { transform: 'translateX(20px)' },
          '100%': { transform: 'translateX(-20px)' }
        },
        'door-open': {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' }
        },
        'curtain-rise': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' }
        }
      },
      backgroundImage: {
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)" opacity="0.02"/%3E%3C/svg%3E")',
        'gradient-noir': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        'gradient-spotlight': 'radial-gradient(circle at center, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 30%, transparent 70%)'
      }
    },
  },
  plugins: [],
}