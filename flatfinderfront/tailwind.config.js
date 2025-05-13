// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#00BCD4",     // Claro
          dark: "#26A69A",        // Oscuro
        },
        background: {
          DEFAULT: "#ffffff",
          dark: "#121212",
        },
        text: {
          DEFAULT: "#000000",
          dark: "#ffffff",
        },
      },
    },
  },
  plugins: [heroui()],
};
