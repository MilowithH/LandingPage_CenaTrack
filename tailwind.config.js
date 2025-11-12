/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'colombia-regular': ['"Colombia Regular"', 'sans-serif'],
        'colombia-italic': ['"Colombia Italic"', 'sans-serif'],
        'colombia-bold': ['"Colombia Bold"', 'sans-serif'],
        'colombia-bold-italic': ['"Colombia Bold Italic"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
