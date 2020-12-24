const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
// 默认配置
module.exports = {
  //入口 单页面应用 多页面应用
  //   entry: "./src/index.js",
  // 多入口 对应 多出口
  // 字符串 对象 数组
  // 字符串和数组 是对象的单页面应用
  // 对象 可以单页面应用 也可以多页面应用
  entry: {
    index: "./src/index.js",
    a: "./src/a.js",
  },
  //   entry: ["./src/index.js", "./src/a.js"],
  output: {
    // 输出的文件存放的目录，必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
    // 输出的文件名称 占位符写法[name],根据入口的key
    filename: "[name].js",
  },
  mode: "development", // none development production
  module: {
    rules: [
      {
        test: /\.css$/,
        // 多个loader情况下，执行顺序是自后往前的
        use: ["style-loader", "css-loader"],
      },
      //   {
      //     test: /\.png$/,
      //     use: "",
      //   },
    ],
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
};
