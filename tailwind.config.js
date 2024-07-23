/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      fontFamily: {
        jost: ['Jost', 'sans-serif']
      },
      colors: {
        'primary': '#D9D9D9',
        'secondary': '#E4E4E4',
        'active': '#EB3D3D'
      }
    },
  },
  plugins: [],
}

