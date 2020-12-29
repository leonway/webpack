// 把less 语法编译成css

const less = require('less')

module.exports = function(source) {
  less.render(source,(err,output)=>{
    this.callback(err,output.css)
  })
}
