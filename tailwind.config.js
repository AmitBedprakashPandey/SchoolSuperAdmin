/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors:{
        primary:"#002663",
        secondary: "#ffc20e",
        danger:'#ce181e',
        gray:'#52565e'
      }
    },
  },
  plugins: [],
}

