const webpack = require('webpack')
const config = require('./webpack.config')

const compiler = webpack(config)

// console.log('compiler hooks',Object.keys(compiler.hooks));
Object.keys(compiler.hooks).forEach(hookName =>{
  if(compiler.hooks[hookName].tap){
    compiler.hooks[hookName].tap('anyString',()=>{
      console.log(`run -> ${hookName}`);
      
    })
  }
})

compiler.run((err,{ compilation:{ hooks } })=>{
// console.log('compilation hooks',Object.keys(hooks));

})
