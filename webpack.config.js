const HTMLWeebPackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = () => {
  return {
    entry: path.resolve(__dirname, "src/index.tsx"),
    module: {
      rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@core": path.resolve(__dirname, "./src/core/"),
        "@constants": path.resolve(__dirname, "./src/constants/"),
        "@di": path.resolve(__dirname, "./src/frameworks/di/"),
        "@services": path.resolve(__dirname, "./src/frameworks/services/"),
        "@hooks": path.resolve(__dirname, "./src/frameworks/hooks/"),
        "@components": path.resolve(__dirname, "./src/frameworks/components/")
      }
    },
    output: {
      filename: "delivery-bundle.js",
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new HTMLWeebPackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        filename: "./index.html"
      })
    ]
  }
}
