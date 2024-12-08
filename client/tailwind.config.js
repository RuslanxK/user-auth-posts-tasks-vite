/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },

      colors: {
        background: '#EFF7F2', 
        white: '#FFFFFF', 
        text: '#343637', 
        icon: '#9CC3A5', 
        primary: '#328A3F', 
      },
    },
  },
  plugins: [],
};
