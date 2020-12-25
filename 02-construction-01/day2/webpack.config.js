const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  mode: "development",
  resolveLoader: {
    modules: ["./node_modules", "./myLoaders"],
  },
  module: {
    rules: [
      {
        test: /.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/images/",
            limit: 3 * 1024, //对小体积的资源图片进行管理，小图片转成base64,减少请求数量
          },
        },
      },
      {
        test: /\.(eot|woff)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.less$/,
        use: ["styleLoader", "cssLoader", "lessLoader"],
      },
      {
        test: /\.js$/,
        use: [
          "replaceLoader",
          {
            loader: "replaceLoaderAsync",
            options: {
              name: "老韩",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/assets/html/index.html",
      filename: "index.html",
    }),
  ],
};
