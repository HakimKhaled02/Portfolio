/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Optima', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        dark: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
        },
        iridescent: {
          blue: '#5ee7df',
          purple: '#b490ca',
          pink: '#ee5a6f',
          green: '#a8e6cf',
          yellow: '#ffd93d',
          orange: '#ff6b6b',
        }
      },
      backgroundImage: {
        'gradient-iridescent': 'linear-gradient(135deg, #5ee7df 0%, #b490ca 25%, #ee5a6f 50%, #ffd93d 75%, #5ee7df 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(94, 231, 223, 0.5), 0 0 10px rgba(94, 231, 223, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(94, 231, 223, 0.8), 0 0 30px rgba(180, 146, 202, 0.5)' },
        }
      }
    },
  },
  plugins: [],
}

