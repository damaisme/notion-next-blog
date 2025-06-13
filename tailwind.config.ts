// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <-- PASTIKAN BARIS INI ADA
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {},
  plugins: [],
};
export default config;
