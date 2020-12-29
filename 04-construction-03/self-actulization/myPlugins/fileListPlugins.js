const { compilation } = require("webpack")

module.exports = class FileListPlugins{
  apply(compiler){
    compiler.hooks.emit.tapAsync('fileListPlugins',(compilation,cb)=>{
      const fileNumber = Object.keys(compilation.assets).length+1
      const list = Object.keys(compilation.assets).reduce((state,key,index)=>state+`${index+2}  ${key}\n`,'1  fileList.txt\n')
      compilation.assets['fileList.txt'] = {
        source:function(){
          return `fileList:${fileNumber}
${list}
          `
        },
        size:()=>1024
      }
      cb()
    })
    // compiler.hooks.afterEmit.tap('fileListPlugins',compilation=>{
    //   console.log('compilation',compilation.assets);
      
    // })
  }
}
