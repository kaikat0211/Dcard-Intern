import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'githubBorder': '#30363C',
        'buttonhover' : '#8B949E',
        'repohover' : '#171B20',
        'bordercolor' : '#21262C',
        'aftercolor' : '#F68166',
        'bodycolor' : '#0E1117',
        'inputcolor' : '#3080F7',
        'submitbuttoncolor' : '#1D572A',
        'disablecolor' : '#7F9D83',
        'textgray' : '#848D97',
        'labelscolor' : '#161B22',
        'labelshover' : '#1F242C',
        'bugtext' : '#EA9CA5',
        'bugbg' : '#321A20',
        'bugborder' : '#6A4149',
                
      }
    },
  },
  plugins: [],
};
export default config;
