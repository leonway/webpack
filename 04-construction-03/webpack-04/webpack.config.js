const path = require("path");
const minicssExtracePlugin = require("mini-css-extract-plugin");
const htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js");
module.exports = {
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name]-[chunkhash:8].js",
  },
  mode: "development",
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          minicssExtracePlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../images",
            outputPath: "images",
            limit: 1024 * 3, //图片大于阈值 不会转base64,小于会转base64
          },
        },
      },
      {
        test: /\.(woff|woff2|svg|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../",
          },
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devtool: "sourcemap",
  devServer: {
    contentBase: "./dist",
    port: 8081,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092/",
      },
    },
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
    new txtwebpackplugin(),
    new CleanWebpackPlugin(),
    new minicssExtracePlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
  ],
};
