/** @type {import('tailwindcss').Config} */
export default {
  content: ["./_site/**/*.{html,njk}"],
  theme: {
    extend: {
      borderWidth: {
        "1em": "1em",
      },
      animation: {
        "slow-spin": "spin 2s linear infinite",
      },
      colors: {
        neutral: {
          50: "#F3F5F8",
          300: "#B7B8BE",
          500: "#BABCCA",
          700: "#646783",
          900: "#2D2D2D",
        },
        selected:{
          lightBlue:"#DEEBF5"

        },
        secondary:{
          orange:"#ecac4d"
        }
        ,
        accent: {
          yellow: "#ECAC4D",
          green: "#71A953",
          red: "#DE5F42",
          blue: "#1F5296",
        },
        primary: "#73C3CD",
        success: "#10B981",
        Warning: "#F59E0B",
        error: "#EF4444",
        "background-light": "#d1d5db",
        "background-light-transparent": "#d1d5db80",
        "background-medium": "#a2a7ad",
        "background-light-accent": "#f3f4f6",
        "background-dark": "#151934",
        "accent-light": "#8e9ebd",
        "accent-dark": "#4b5563",
        "accent-darker": "#282d36",
        "dropzone":"#fbfbffF",//name for now
      },
      padding: {
        "5-percent": "5%",
        "10-percent":"10%"
      },
      width: {
        "8/10": "80%",
        "80rem": "80rem",
      },
      minHeight: {
        halfContainer: "50%",
        "Three-Quaters": "75%",
        0: "0",
        "x-small": "1em",
        small: "3em",
        medium: "5em",
        large: "10em",
        larger: "15em",
        "x-large": "25em",
        "xx-large": "45rem",
      },
      minWidth: {
        0: "0",
        "x-small": "1em",
        small: "3em",
        medium: "5em",
        large: "10em",
        "x-large": "25em",
      },
      maxWidth: {
        halfContainer: "50%",
        "Three-Quaters": "75%",
        0: "0",
        "x-small": "1em",
        small: "3em",
        medium: "5em",
        large: "10em",
        larger: "15em",
        "x-large": "25em",
        "80rem": "80rem",
      },
      maxHeight: {
        halfContainer: "50%",
        "Three-Quaters": "75%",
        0: "0",
        "x-small": "1em",
        small: "3em",
        medium: "5em",
        large: "10em",
        larger: "15em",
        "x-large": "25em",
      },
      blur: {
        xs: "2px",
      },
      scale: {
        xs: "1.02",
      },
      screens: {
        "max-sm": { max: "639px" },
        "max-md": { max: "767px" },
        "max-lg": { max: "1023px" },
        "max-xl": { max: "1279px" },
      },
    },
  },
  plugins: [],
};
