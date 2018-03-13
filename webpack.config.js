var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");

module.exports = {
  context: __dirname,
  entry: ["babel-polyfill", "./example/client.js"],
  output: {
    filename: "bundle.js",
    path: __dirname,
    publicPath: "/"
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ["babel-loader"], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: "./example/index.html"
    })
  ]
};
