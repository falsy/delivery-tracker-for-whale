import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  server: {
    port: 2000
  },
  resolve: {
    alias: {
      "@constants": path.resolve(__dirname, "./src/constants/"),
      "@domains": path.resolve(__dirname, "./src/domains/"),
      "@adapters": path.resolve(__dirname, "./src/adapters/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@di": path.resolve(__dirname, "./src/frameworks/di/"),
      "@pages": path.resolve(__dirname, "./src/frameworks/pages/"),
      "@providers": path.resolve(__dirname, "./src/frameworks/providers/"),
      "@containers": path.resolve(__dirname, "./src/frameworks/containers/"),
      "@components": path.resolve(__dirname, "./src/frameworks/components/"),
      "@hooks": path.resolve(__dirname, "./src/frameworks/hooks/"),
      "@styled-system": path.resolve(__dirname, "./styled-system/")
    },
    extensions: [".ts", ".tsx", ".js", ".mjs"]
  },
  build: {
    emptyOutDir: false
  },
  plugins: [react()]
})
