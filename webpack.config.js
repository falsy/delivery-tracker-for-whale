const HTMLWeebPackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = (env, options) => {
  return {
    entry: path.resolve(__dirname, "src/index.tsx"),
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" },
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    output: {
      filename: 'delivery-bundle.js',
      path: path.resolve(__dirname, "dist")
    },
    plugins: [
      new HTMLWeebPackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        filename: "./index.html"
      }),
    ]
  }
}