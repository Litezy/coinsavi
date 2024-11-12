/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors:{
        'primary': '#34908e',
        'sec':'#c1ed1d',
        'light':'#d6e9e8',
        'gray':'#f6f5f0',
        'dark':'#0d1123'
      },
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(50%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInTop: {
          '0%': { opacity: '0', transform: 'translateY(-50%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInBottom: {
          '0%': { opacity: '0', transform: 'translateY(50%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInLeft: 'fadeInLeft 1s ease-out forwards',
        fadeInRight: 'fadeInRight 1s ease-out forwards',
        fadeInTop: 'fadeInTop 1s ease-out forwards',
        fadeInBottom: 'fadeInBottom 1s ease-out forwards',
      },

    },
  },
  plugins: [
    // require('flowbite/plugin')
  ],
}