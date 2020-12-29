//loader 本质上是一个函数
//! 不可以是箭头函数
// loader 必须有返回值，需要返回一个str
// loader 支持配置
// loader 如何返回多个信息
// loader 如何处理异步
// 如何处理多个loader
module.exports = function(str) {
  console.log('-------this---------');
  console.log(this.query);
  // console.log('----------str------------');
  // console.log(str);
  const msg = str.replace('我是',this.query.info)
  const cb = this.async()
  setTimeout(() => {
    cb( null,msg)
  }, 2000);
}
