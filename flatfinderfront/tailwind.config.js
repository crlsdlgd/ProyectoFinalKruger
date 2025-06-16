// tailwind.config.js
import { heroui, lightLayout } from "@heroui/react";

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
        'matisse': {
          '50': '#f1f8fe',
          '100': '#e3eefb',
          '200': '#c0def7',
          '300': '#89c4f0',
          '400': '#4aa5e6',
          '500': '#2389d4',
          '600': '#156eb7',
          '700': '#125792',
          '800': '#134a79',
          '900': '#153f65',
          '950': '#0e2843',
        },
        'bglight': '#ffffff',
        'bgdark': '#0E0E11',
        'txtdark': '#f4f4f5',
        'txtlight': '#0E0E11',
        'bgdarkOpacity': '#19191c',
        'bglightOpacity': '#f2f2ff',
        'primary': '#185886',
        'secondary': '#4aa5e6',
        'success': '#30d93b',
        'danger': '#ff3f3f',
        'warning': '#ffdf46',
      },
    },
  },
  plugins: [heroui()],
};