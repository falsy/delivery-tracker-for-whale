import path from "path"
import { defineConfig } from "@pandacss/dev"

export default defineConfig({
  logLevel: "debug",
  preflight: true,
  include: [path.resolve(__dirname, "src/**/*.{js,jsx,ts,tsx}")],
  exclude: [],
  theme: {
    extend: {}
  },
  outdir: "styled-system",
  outExtension: "js",
  importMap: "styled-system"
})
