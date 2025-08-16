/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  Mode: "jit",
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "shakespare-bg-home": "url('/src/assets/shakespare.svg')",
        "shakespare-bg-trestleboard": "url('/src/assets/calenderimg.svg')",
        "shakespare-bg-whereWeMeet": "url('/src/assets/whereWeMeet.svg')",
      },
      gridTemplateColumns: {
        "auto-fill-100": "repeat(auto-fill, minmax(200px, 1fr))",
        "auto-fill-120": "repeat(auto-fill, minmax(120px, 1fr))",

        // grid template for the lodge page
        "lodge_officers_auto-fill-200": "repeat(auto-fill, minmax(200px, 1fr))",
        "lodge_officers_auto-fill-110": "repeat(auto-fill, minmax(110px, 1fr))",
      },
      fontFamily: {
        Montserrat: ["Montserrat"],
        NewYorkSmall: ["NewYorkSmall"],
        Great: ["Great Vibes", defaultTheme],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
