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
    extend: {
      height: { 
        screen80: "60vh",
        screen85: "85vh",
      },
      colors: {
        fourty: '#316B83',
        thirty: '#6D8299',
        primary: '#8CA1A5',
        secondary: '#D5BFBF',
      },
      backgroundImage: {
        'cachorroWeb': "url('https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80')",
        'gatitosWeb': "url('https://images.unsplash.com/photo-1576013488633-fda5098dd03f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80')"
      },
      backgroundPosition: {
        'leftish-center': '30% 50%',
        'center-bottomish': '50% 80%',
      },
      boxShadow: {
        'activeNavBar': '0px -4px 0 0 #8CA1A5 inset;'
      }
    },
  },
  variants: {
    extend: {
     
    },
  },
  plugins: [],
}
