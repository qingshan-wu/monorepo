const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = (isDev) => ({
  entry: path.join(__dirname, '../src/index.tsx'),
  mode: isDev ? 'development' : 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        oneOf: [
          {
            test: /.(css)$/,
            use: [
              !isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
            ]
          },
          {
            // 定义 xxx.module.(less|css)
            test: /.module.(less|css)$/,
            include: [path.resolve(__dirname, '../src')],
            use: [
              !isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2,
                  // 开启css modules
                  modules: {
                    localIdentName: '[path][name]__[local]--[hash:base64:4]'
                  }
                }
              },
              "postcss-loader",
              'less-loader'
            ]
          },
          {
            test: /.(less)$/,
            use: [
              !isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              'less-loader'
            ]
          }
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        generator: {
          filename: 'static/images/[name][ext]'
        }
      },
      {
        test: /.(woff2|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        generator: {
          filename: 'static/fonts/[name][ext]'
        }
      },
      {
        test: /.(mp4|mp3|webm)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        generator: {
          filename: 'static/media/[name][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      "@": path.join(__dirname, '../src')
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
    }),
    new MiniCssExtractPlugin({
      // [contenthash] | [chunkhash] - hash: 内容变更，浏览器不需要使用缓存
      filename: 'static/css/[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      "process.env.PRIMARY": JSON.stringify(process.env.PRIMARY)
    })
  ]
})