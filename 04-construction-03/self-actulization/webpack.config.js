const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry:{
    index:'./src/index.js',
    list:'./src/list.js',
  },
  output:{
    path:path.resolve(__dirname,"./dist"),
    filename:'[name]-[hash].js'
  },
  mode:'development',
  devtool:'cheap-source-map',
  devServer:{
    open:true,
    proxy:{
     '/api': {
       target:'http://localhost:9092'
     }
    }
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/[name]-[contenthash].css',
    }),
    new htmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html',
      chunks:['index']
      // path:path.resolve(__dirname,"./dist")
    }),
    // new htmlWebpackPlugin({
    //   template:'./src/list.html',
    //   filename:'list.html',
    //   chunks:['list']
    //   // path:path.resolve(__dirname,"./dist")
    // }),
    new CleanWebpackPlugin(),
  ],
  // resolveLoader:{
  //   modules: ['node_modules','myLoaders']
  // },
  module:{
    rules:[
      {
        test:/\.js$/,
        use: ["babel-loader"]
      },
      {
        test:/\.css$/,
        use:[
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath:'../',
            },
          },
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test:/\.less$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath:'../',
            },
          },
          // 'style-loader',
          'css-loader',
          // 'postcss-loader',
          'less-loader'
        ]
      },
      // {
      //   test:/\.less$/,
      //   use:[
      //     'clm-style-loader',
      //     'clm-css-loader',
      //     'clm-less-loader'
      //   ]
      // },
      {
        test:/\.(png|jpg|jpeg|gif)$/i,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:1024*2,
              outputPath:'images',
              // publicPath:'../',
              // outputPath: "images/",
              // publicPath: "../images",
              filename:'[name]-[contenthash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            limit:1024*2,
            outputPath:'fonts',
            filename:'[name]-[contenthash].[ext]'
          },
        },
      },
      // {
      //   test:/\.js$/,
      //   // use:path.resolve(__dirname,'./myLoaders/replace-loader.js')
      //   use:[
      //     {
      //       loader:'replace-loader',
      //       options:{
      //         info:'reamey'
      //       }
      //     },
      //     {
      //       loader:'replace-async-loader',
      //       options:{
      //         info:'你是'
      //       }
      //     }
      //   ]
      // }
    ]
  }
}
