const webpack = require("webpack");

module.exports = {
  context: __dirname,
  devtool: false,
  entry: "./src/public/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "./dist/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", "json", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.css/,
        enforce: "pre",
        use: [
          "style-loader",
          "css-loader"
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
        test: /\.(png|jpg|gif|ttf)$/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 8192
          }
        }]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.html$/,
        loader: "html"
      }
    ]
  },
  // plugins: [new webpack.optimize.UglifyJsPlugin({
  //   minimize: true,
  //   compress: {
  //     warnings: false
  //   },
  //   comments: false
  // })],
  devServer: {
    inline: true,
    port: 5000
  }
};