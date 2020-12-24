const path = require("path");
// 默认配置
module.exports = {
  entry: "./src/index.js",
  //入口 单页面应用 多页面应用
  output: {
    // 输出的文件存放的目录，必须是绝对路径
    path: path.resolve(__dirname, "./kkb"),
    // 输出的文件名称
    filename: "kkb.js",
  },
  mode: "development",
};
