
const getBaseConfig = require('./webpack.base')
const { merge} = require('webpack-merge')
const path = require('path')

console.log('PRIMARY: ', process.env.PRIMARY)

module.exports = merge(getBaseConfig(true), {
  devtool: 'source-map',
  devServer: {
    port: 3000,
    compress: false,
    hot: true, // 热更新
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '../public')
    }
  }
})