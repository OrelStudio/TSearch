'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const merge = require('webpack-merge')
const sass = require('sass')

const port = process.env.FPORT || 3000

const config = require('./webpack.config.common')

module.exports = merge(config, {
  entry: {
    main: [
      'react-hot-loader/patch',
      // path.resolve(__dirname, '../../src/index.js')
      // `webpack-dev-server/client?http://localhost:${port}`,
      // 'webpack/hot/dev-server'
    ]
  },
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$|\.css$/,
        exclude: /node_modules/,
        // include: 'node_modules/codemirror-graphql',
        use: [
          'thread-loader',
          'style-loader',
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            } // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              implementation: sass
            } // compiles Sass to CSS
          }
        ]
      }
    ]
  },
  plugins: [
    // enables hot replacement for modules
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      // 'react-dom': '@hot-loader/react-dom'
    }
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    contentBase: '../../src',
    publicPath: '',
    hot: true,
    inline: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
    compress: false, // compress only on production
    port,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true
    }
  }
})
