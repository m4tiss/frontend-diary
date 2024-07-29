const { light } = require('@mui/material/styles/createPalette');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        run: {
          night: {
            background: "#1f1d2b",
            element: "#2a2a42",
            contrast: "#0a84ff", 
          },
        },
        gym: {
          night: {
            background: "#000000",
            element: "#1b1b1b",
            contrast: "#f85c8c", 
          },
        },
      },
    },
  },
  plugins: [],
};
