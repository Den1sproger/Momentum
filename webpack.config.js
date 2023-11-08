const path = require('path')
const HTMLWebPackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')



module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './scripts/index.js',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: './assets',
              destination: path.resolve(__dirname, 'dist/assets')
            },
            {
              source: './css',
              destination: path.resolve(__dirname, 'dist/css')
            },
            {
              source: './scripts/playList.js',
              destination: path.resolve(__dirname, 'dist/playList.js')
            }
          ]
        }
      }
    })
  ],
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       use: ['style-loader', 'css-loader']
  //     }
  //   ]
  // },
  devServer: {
    port: 9000
  }
}