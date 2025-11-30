/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: '#c0a062',
      },
      fontFamily: {
        cursive: ['var(--font-cursive)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
}
