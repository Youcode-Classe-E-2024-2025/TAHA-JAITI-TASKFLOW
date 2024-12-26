/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html","./public/**/*.{html,js,php}"],
  theme: {
    extend: {
      fontFamily:{
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}