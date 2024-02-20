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
        'repohover' : '#171B20'
      }
    },
  },
  plugins: [],
};
export default config;
