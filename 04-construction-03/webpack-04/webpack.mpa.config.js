const path = require("path");
const minicssExtracePlugin = require("mini-css-extract-plugin");
const htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

const setMPA = () => {
  const entry = {};
  const htmlwebpackplugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index];

    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = entryFile;
    htmlwebpackplugins.push(
      new htmlwebpackplugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}/${pageName}.html`,
        chunks: [pageName],
      })
    );
  });

  //
  return {
    entry,
    htmlwebpackplugins,
  };
};
const { entry, htmlwebpackplugins } = setMPA();
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, "./mpa"),
    filename: "[name]-[chunkhash:8].js",
  },
  mode: "development",

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
    ],
  },
  plugins: [
    ...htmlwebpackplugins,
    new CleanWebpackPlugin(),
    new minicssExtracePlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
  ],
};
