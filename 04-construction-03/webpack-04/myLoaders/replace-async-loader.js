// loader 本质上是一个函数
//! 不可以是箭头函数
// loader 必须有返回值，需要返回一个str buffer
// loader 支持配置
// loader 如何返回多个信息
// loader 如何处理异步
// 如何处理多个loader

module.exports = function (source) {
  //   console.log(this.query);
  //   this.callback(null, msg);
  const callback = this.async();
  setTimeout(() => {
    const msg = source.replace("webpack", this.query.info);
    callback(null, msg);
  }, 2000);
};
