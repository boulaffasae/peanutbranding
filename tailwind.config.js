const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        axiforma: "Axiforma",
      },
      colors: {
        primary: "#FAD9CB",
        secondary: "#716CB0",
        tertiary: "#F1D66A",
      },
      keyframes: {
        mouse: {
          "0%": { "margin-top": "6px", opacity: 0 },
          "30%": { opacity: 1 },
          "100%": { "margin-top": "18px", opacity: 0 },
        },
      },
      animation: {
        mouse: "mouse 1.75s infinite ease",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
