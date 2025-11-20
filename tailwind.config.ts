import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // <--- Das hier gibt uns die Kontrolle
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ikb: "#002FA7",
        bg: "#ffffff",
        text: "#000000",
      },
      fontFamily: {
        serif: ["var(--font-playfair)"],
        mono: ["var(--font-jetbrains)"],
      },
      animation: {
        scroll: 'scroll 40s linear infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;