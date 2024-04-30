/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mardoto: ["Mardoto", "sans-serif"]
      },
      transitionProperty: {
        height: "height"
      },
      screens: {
        "2xl": "1440px",
        xl: "1024px",
        md: "744px",
        sm: "360px"
      }
    }
  },
  plugins: []
});
