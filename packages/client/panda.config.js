import path from "path"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  preflight: true,
  include: [path.resolve(__dirname, "src/**/*.{js,jsx,ts,tsx}")],
  exclude: [],
  theme: {
    extend: {}
  },
  globalCss: {
    "::placeholder": {
      color: "#bbb"
    },
    "*": {
      boxSizing: "border-box"
    },
    "html, #wrap": {
      height: "100%"
    },
    body: {
      background: "#f7f7f7",
      fontSize: "14px",
      "@media (prefers-color-scheme: dark)": {
        background: "rgb(41, 41, 41)"
      }
    },
    a: {
      textDecoration: "none",
      color: "inherit"
    },
    button: {
      cursor: "pointer",
      border: 0,
      background: "none",
      padding: 0
    }
  },
  outdir: "styled-system",
  outExtension: "js",
  importMap: "styled-system"
})
