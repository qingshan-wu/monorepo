
const getBaseConfig = require('./webpack.base')
const { merge} = require('webpack-merge')
const path = require('path')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(getBaseConfig(false), {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin({
        // 并行压缩
        parallel: true,
        terserOptions: {
          compress: {
            pure_funcs: ["console.log", 'console.warn']
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: 1,
          test: /node_modules/,
          name: 'vendors'
        },
        commons: {
          name: 'commons',
          minChunks: 3,
        }
      } 
    }
  }
})