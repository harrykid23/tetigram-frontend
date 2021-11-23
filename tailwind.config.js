module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        '80vh' : '80vh',
        '60vh' : '60vh',
      },
      width: {
        '30vw' : '30vw',
        '11/24' : '45.833333%'
      },
    },
    maxHeight: {
      '60vh' : '60vh',
      'full' : '100%'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
