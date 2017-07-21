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
        enforce: 'pre',
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }, {
          loader: "autoprefixer-loader"
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        enforce: 'pre',
        test: /\.html/,
        loader: 'htmlhint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
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