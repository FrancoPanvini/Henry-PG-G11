module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    height: { 
      screen80: "60vh",
    },
    extend: {
      colors: {

        primary: '#316B83',
        secondary: '#F3EAC2',
        thirty: '#F5B461',
        fourty: '#EC524B',
        // pallete1a: '#9AD3BC',
        // pallete1b: '#F3EAC2',
        // pallete1c: '#F5B461',
        // pallete1d: '#EC524B',
        // pallete4a: '#297F87',
        // pallete4b: '#FFF7AE',
        // pallete4c: '#F6D167',
        // pallete4d: '#DF2E2E',
        // pallete2a: '#316B83',
        // pallete2b: '#6D8299',
        // pallete2c: '#8CA1A5',
        // pallete2d: '#D5BFBF',
        // pallete3a: '#FAF1E6',
        // pallete3b: '#FFC074',
        // pallete3c: '#B6C867',
        // pallete3d: '#01937C',
      },
      backgroundImage: {
        'cachorroWeb': "url('https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80')",
        'gatitosWeb': "url('https://images.unsplash.com/photo-1576013488633-fda5098dd03f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80')"
      },
      backgroundPosition: {
        'leftish-center': '30% 50%',
        'center-bottomish': '50% 80%',
      }
    },
  },
  variants: {
    extend: {
     
    },
  },
  plugins: [],
}
