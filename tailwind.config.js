/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js,css,hbs}"],
  theme: {
    colors: {
      'sky': {
        light: '#c1e0f0',
        DEFAULT: "#81bfdb"
      },
      'clean': "#FFFFFF",
      'blue': "#53a9d1",
      'pink': {
        light: "#efa5a0",
        DEFAULT: "#FE938C"
      },
      'black': "#2a475b",
      'orange': "#D04E17",
      'silver': "#B7B7B7",
      'pearl': "#EAECF0"
    },
    fontFamily: {
      sans: ['Manrope', 'Arial', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
