const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "[name].boundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new HTMLWebpackPlugin({
  //     title: "Hot Module Replacement",
  //   }),
  //   new webpack.NamedModulesPlugin(),
  //   new webpack.HotModuleReplacementPlugin(),
  // ],
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
  // devServer: {
  //   contentBase: "./dist",
  //   hot: true,
  // },
  // devtool: "inline-source-map",
  // module: {
  //   rules: [
  //     { test: /\.css$/, use: ["style-loader", "css-loader"] },
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
  //   ],
  // },
};
