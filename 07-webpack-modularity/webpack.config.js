const webpack = require("webpack");

module.exports = {
  context: __dirname,
  devtool: false,
  entry: "./src/js/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        enforce: "pre",
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192
          }
        }]
      }
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: false
    },
    comments: false
  })],
  devServer: {
    inline: true,
    port: 5000
  }
};