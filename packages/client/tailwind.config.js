const path = require("path")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.resolve(__dirname, "./src/frameworks/**/*.{js,ts,jsx,tsx}")],
  theme: {
    extend: {}
  },
  plugins: []
}
