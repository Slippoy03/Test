/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        colorTransition: {
          "0%": { backgroundColor: "red" },
          "2%": { backgroundColor: "white" },
          "50%": { backgroundColor: "orange" },
        },
        slideDown: {
          "0%": { maxHeight: "0", opacity: "0" },
          "100%": { maxHeight: "500px", opacity: "1" }, // maxHeight should be large enough to accommodate content
        },
        slideUp: {
          "0%": { maxHeight: "500px", opacity: "1" },
          "100%": { maxHeight: "0", opacity: "0" },
        },
      },
      animation: {
        colorTransition: "colorTransition 1s ease-in-out forwards",
        slideDown: "slideDown 0.5s forwards",
        slideUp: "slideUp 2s forwards",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        main: {
          red: "#CC0E16",
        },
      },
    },
  },
  plugins: [],
});
