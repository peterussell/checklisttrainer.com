/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...colors,
      cltWhiteDark: '#efefef',
      cltBlack: '#333',
      cltBlueDark: '#15354e',
      cltGrey: '#a9a9a9'
    },
    fontFamily: {
      barlowCondensed: ['var(--font-barlow-condensed)'],
      lato: ['var(--font-lato)'],
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem"
    },
    extend: {
      backgroundImage: {
      },
    },
  },
  plugins: [],
}
