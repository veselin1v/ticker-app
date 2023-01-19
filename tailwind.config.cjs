/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'green-600': '0 0 150px 1px rgba(22, 163, 74, 1)',
        'red-500': '0 0 150px 1px rgba(229, 68, 68, 1)'
      }
    }
  },
  variants: {
    fill: ['hover']
  },
  plugins: [],
}
