/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    
    extend: {
      colors: {
        pactifyPurple: '#1C133F',
        pactifyRed: '#EC5F59',
      }
    },
  },
  plugins: [require('flowbite/plugin')],
}