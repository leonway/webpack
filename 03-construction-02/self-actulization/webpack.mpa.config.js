const path = require('path')
const glob = require('glob')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const setMPA = ()=>{
  const entry = {}
  const htmlwebpackplugins = []

  const entryFiles = glob.sync(path.join(__dirname,"./src/*/index.js"))
  entryFiles.map((entryFile,index)=>{
    const pageName = entryFile.match(/src\/(.*)\/index\.js$/)[1]
    entry[pageName] = entryFile
    htmlwebpackplugins.push(new htmlWebpackPlugin({
      template:path.join(__dirname,`./src/${pageName}/index.html`),
      filename:`${pageName}/${pageName}.html`,
      chunks:[pageName]
    }))
  })
  return {
    entry,
    htmlwebpackplugins
  }
}

const {
  entry,
  htmlwebpackplugins
} = setMPA()
module.exports = {
  entry,
  output:{
    path:path.resolve(__dirname,"./mpa"),
    filename:'js/[name]-[chunkhash:8].js'
  },
  mode:'production',
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/[name]-[contenthash].css',
    }),
    ...htmlwebpackplugins,
    new CleanWebpackPlugin(),
  ],
  module:{
    rules:[
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
      {
        test:/\.(png|jpg|jpeg|gif)$/i,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:1024*2,
              outputPath:'images',
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
      }
    ]
  }
}
