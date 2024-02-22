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
        'bodycolor' : '#0E1117'
      }
    },
  },
  plugins: [],
};
export default config;
