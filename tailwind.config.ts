import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '540px',

      'sm': '640px',

      'md': '768px',

      'lg': '1012px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    extend: {
      colors:{
        'githubBorder': '#30363C',
        'buttonhover' : '#8B949E',
        'repohover' : '#171B20',
        'bordercolor' : '#21262C',
        'aftercolor' : '#F68166',
        'bodycolor' : '#0E1117',
        'inputcolor' : '#3080F7',
        'submitbuttoncolor' : '#238636',
        'submitbuttonhovercolor' : '#2DA042',
        'disablecolor' : '#7F9D83',
        'textgray' : '#848D97',
        'labelscolor' : '#161B22',
        'labelshover' : '#1F242C',
        'linkactive' : '#1F6EEB',
        'hoverblue' : '#2D7BEC',
        'issuebodyblueborder' : "#1F4272",
        'issuebodyblueheader' : "#131D2E",
        'dotblue' : "#4493F8",
        'closebuttonbg' : '#292E36',
      }
    },
  },
  plugins: [],
};
export default config;
