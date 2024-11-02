const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  entry: "./src/index.tsx",
  output: {
    publicPath: "/",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@constants": path.resolve(__dirname, "./src/constants/"),
      "@domains": path.resolve(__dirname, "./src/domains/"),
      "@adapters": path.resolve(__dirname, "./src/adapters/"),
      "@di": path.resolve(__dirname, "./src/frameworks/di/"),
      "@pages": path.resolve(__dirname, "./src/frameworks/pages/"),
      "@providers": path.resolve(__dirname, "./src/frameworks/providers/"),
      "@containers": path.resolve(__dirname, "./src/frameworks/containers/"),
      "@components": path.resolve(__dirname, "./src/frameworks/components/"),
      "@services": path.resolve(__dirname, "./src/frameworks/services/"),
      "@hooks": path.resolve(__dirname, "./src/frameworks/hooks/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    compress: true,
    port: 2000,
    historyApiFallback: true
  }
}
