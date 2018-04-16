var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //抽取CSS文件插件
//html-webpack-plugin插件，重中之重，webpack中生成HTML的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var webpackConfig = {
  entry: {
    vendor: ['react', 'react-dom', 'material-ui'],
    index: './src/scripts/index.js',
  },
  output: {
    path: path.join(__dirname, 'publish'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
    filename: 'jss/[name]-bundle.js',            //每个页面对应的主js的生成配置
    chunkFilename: 'jss/[id].chunk.js'   //chunk生成的配置
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  devtool: 'source-map',
  module: {
    rules: [ //加载器  
      { test: /\.less$/, loader: 'less-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },

  devServer: {
    contentBase: 'publish', // Relative directory for base of server
    // devtool: 'eval',
    disableHostCheck: true,
    hot: true, // Live-reload
    inline: true,
    port: 9000, // Port Number
    host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // 将公共模块提取，生成名为`vendor-bundle.js`
      minChunks: Infinity
    }),

    new ExtractTextPlugin('css/[name]-bundle.css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath 

    //根据模板插入css/js等生成最终HTML
    new HtmlWebpackPlugin({
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', //生成的html存放路径，相对于path
      template: './src/page/index.html', //html模板路径
      inject: 'body', //js插入的位置，true/'head'/'body'/false 
      chunks: ['vendor', 'index'],//需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件    
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      },
      hash: true, //为静态资源生成hash值
    }),

    //复制资源文件
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      }
    ]),
    new webpack.HotModuleReplacementPlugin() //热加载
  ],
};



module.exports = function makeWebpackConfig(cfgEnv) {

  if (cfgEnv && cfgEnv.compress === 'true') {
    console.log('-----使用命令:webpack --env.compress=true ------------:');
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );

  } 

  return webpackConfig;
};