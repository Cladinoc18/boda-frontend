/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          primary: {
            DEFAULT: '#c1a283',
            light: '#d2bca5',
            dark: '#a88869',
          },
          accent: {
            DEFAULT: '#d5924a',
            light: '#e1ad71',
            dark: '#b57635',
          },
          neutral: {
            bone: '#fcfbf9',      // Fondo principal / blanco roto elegante
            cream: '#f4efe9',     // Fondos alternativos / crema suave
            dark: '#2c2621',      // Color de texto principal / gris-marrón oscuro
            muted: '#7a7065',     // Color de texto secundario / marrón apagado
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
