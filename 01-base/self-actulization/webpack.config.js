const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:{
    index:'./src/index.js',
    main:'./src/main.js',
  },
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:'[name].js'
  },
  mode:'production',
  plugins:[
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      // path:path.resolve(__dirname,"./dist")
    })
  ],
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      },
      {
        test:/\.(png|jpg|jpeg|gif)$/i,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:2048
            }
          }
        ]
      }
    ]
  }
}
