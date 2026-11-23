/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scrapbook: {
          bg: '#f6f5f0',
          paper: '#fffdfa',
          tape: '#fcd34d',
          yellow: '#facc15',
          blue: '#0284c7',
          orange: '#fb923c',
          green: '#22c55e',
          dark: '#1e293b'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace', 'sans-serif'],
        handwriting: ['Caveat', 'cursive']
      },
      boxShadow: {
        'scrapbook': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'polaroid': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'retro': '4px 4px 0px 0px rgba(0,0,0,1)'
      }
    },
  },
  plugins: [],
}
