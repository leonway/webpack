// import css from "./index.less";
import axios from "axios";
axios.get("/api/info").then((res) => {
  console.log(res);
});
// import img from "./logo.png";
// jpg jpeg png gif svg webx
// file-loader url-loader
console.log("hello webpack");

// 创建本地服务器
// 打包成功 自动帮助我们启动一个浏览器窗口
// 热更新
// mock数据 提升开发效率
// 前端端分离 -》项目组 -》评估工时 -》
// 前端：视觉稿什么时候给 服务端接口什么时候（联调时间） 测试介入
// 前后端 在开发之前定义好接口，接口字段，以及文档产出时间
// 多页面打包通用方案
