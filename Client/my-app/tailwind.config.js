module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#E08F62',
        secondary: '#FFCFBB',
        tercero: '#CF410B'
      },
    },
  },
  variants: {
    extend: {
     
    },
  },
  plugins: [],
}
