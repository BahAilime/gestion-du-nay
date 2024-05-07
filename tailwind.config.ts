import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'nay-white': {
          DEFAULT: '#f0e6d6',
          100: '#423219',
          200: '#856531',
          300: '#bf9552',
          400: '#d7bd94',
          500: '#f0e6d6',
          600: '#f3ebde',
          700: '#f6f0e6',
          800: '#f9f5ef',
          900: '#fcfaf7'
        },
        'nay-orange': {
          DEFAULT: '#e8a07c',
          100: '#3d1b0b',
          200: '#793715',
          300: '#b65220',
          400: '#dd7540',
          500: '#e8a07c',
          600: '#edb497',
          700: '#f1c6b1',
          800: '#f6d9cb',
          900: '#faece5'
        },
        'nay-light-orange': {
          DEFAULT: '#f6cba0',
          100: '#4b2907',
          200: '#95520e',
          300: '#e07a15',
          400: '#efa357',
          500: '#f6cba0',
          600: '#f8d6b4',
          700: '#fae0c7',
          800: '#fcebda',
          900: '#fdf5ec'
        },
        'nay-cyan': {
          DEFAULT: '#cbdfde',
          100: '#213534',
          200: '#416a68',
          300: '#629f9c',
          400: '#97bfbd',
          500: '#cbdfde',
          600: '#d7e6e5',
          700: '#e1ecec',
          800: '#ebf3f2',
          900: '#f5f9f9'
        }
      }
    },
  },
  plugins: [],
};
export default config;
