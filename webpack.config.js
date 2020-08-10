const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: "Hot Module Replacement",
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // optimization: {
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all",
  //       },
  //     },
  //   },
  // },
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  output: {
    filename: "[name].boundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      //     {
      //       test: /\.(png|svg|jpg|gif)$/,
      //       use: ["file-loader"],
      //     },
      //     {
      //       test: /\.(csv|tsv)$/,
      //       use: ["csv-loader"],
      //     },
      //     {
      //       test: /\.xml$/,
      //       use: ["xml-loader"],
      //     },
    ],
  },
};
