const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry:{
    index:'./src/index.js',
    // main:'./src/main.js',
  },
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:'[name].js'
  },
  mode:'production',
  plugins:[
    new MiniCssExtractPlugin({
      filename:'[name].css'
    }),
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      // path:path.resolve(__dirname,"./dist")
    }),
    
  ],
  resolveLoader:{
    modules: ['node_modules','myLoaders']
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      // {
      //   test:/\.less$/,
      //   use:[
      //     // MiniCssExtractPlugin.loader,
      //     'style-loader',
      //     'css-loader',
      //     // 'postcss-loader',
      //     'less-loader'
      //   ]
      // },
      {
        test:/\.less$/,
        use:[
          'clm-style-loader',
          'clm-css-loader',
          'clm-less-loader'
        ]
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
      },
      {
        test:/\.js$/,
        // use:path.resolve(__dirname,'./myLoaders/replace-loader.js')
        use:[
          {
            loader:'replace-loader',
            options:{
              info:'reamey'
            }
          },
          {
            loader:'replace-async-loader',
            options:{
              info:'你是'
            }
          }
        ]
      }
    ]
  }
}
