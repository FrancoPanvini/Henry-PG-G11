module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      height: {
        screen9: '9vh',
        screen60: '60vh',
        screen70: '70vh',
        screen82: '82vh',
        screen85: '85vh',
        screen90: '90vh',
        100: '28rem',
        104: '32rem',
        108: '36rem',
        112: '40rem',
        116: '44rem',
        120: '48rem',
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '7/10': '70%',
        '9/10': '90%',
      },
      width: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '7/10': '70%',
        '9/10': '90%',
        100: '28rem',
        104: '32rem',
        108: '36rem',
        112: '40rem',
        116: '44rem',
        120: '48rem',
      },

      minWidth: {
        sign: '350px',
      },
      minHeight: {
        screen82: '82vh',
      },
      inset: {
        18: '4.5rem',
        '1/7': '14%',
      },
      colors: {
        fourtyLight: '#5a889b',
        fourty: '#316B83',
        fourtyDark: '#275568',
        thirtyLight: '#8a9bad',
        thirty: '#6D8299',
        thirtyDark: '#57687a',
        primaryLight: '#f7c380',
        primary: '#f5b461',
        primaryDark: '#dca257',
        secondaryLight: '#e1d2d2',
        secondary: '#D5BFBF',
        secondaryDark: '#caabab',
        facebook: '#4267B2',
        donations: '#D4AF37 ',
        instagram: '#405DE6',
        instagram2: '#C13584',
        attention: '#C84B31',
        attentionLight: '#de8775',
      },
      backgroundImage: {
        cachorroWeb:
          "url('https://images.unsplash.com/photo-1560807707-8cc77767d783?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=435&q=80')",
        gatitosWeb:
          "url('https://images.unsplash.com/photo-1576013488633-fda5098dd03f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80')",
      },
      backgroundPosition: {
        'leftish-center': '25% 50%',
        'center-bottomish': '50% 80%',
      },
      boxShadow: {
        activeNavBar: '0 -1.8em 5px -24px #f5b461 inset;', // ← difuminado en la NavBar, para quitarlo remplazar el tercer valor ('5px') por '0'
        similBorderWhite: '0 20px 25px -5px #0003, 0 0 3px 3px #FFF6 inset;',
        buttonShadow: '0px 5px 15px 2px #0003;',
        emptyPagination: '0 0 0 2px #8a9bad inset',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
