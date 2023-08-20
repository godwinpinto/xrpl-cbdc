/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#07206b",
        
"secondary": "#B03E3C",
        
"accent": "#2F8A70",
        
"neutral": "#262b31",
        
"base-100": "#2c3159",
        
"info": "#94def5",
        
"success": "#32e28d",
        
"warning": "#f3c162",
        
"error": "#A82927",
        },
      },
    ],
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="synthwave"]'],
  theme: {
    extend: {
      height: {
      'minus-h': 'calc(100vh - 100px)',
    },
    daisyui: {
      themes: ['synthwave'],
      base: true,
      darkTheme: "synthwave",

    },

  colors:{
    'badge-secondary':'#CCC'
  }
  },
  },
  plugins: [require("@tailwindcss/typography"),require("daisyui")],
}

