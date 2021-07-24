'use strict'

const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')

const sass = require('sass')
const lessToJs = require('less-vars-to-js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(config, {
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.less$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              minimize: true
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: lessToJs(fs.readFileSync(path.join(__dirname, './src/css/antd-overrides.less'), 'utf8')),
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.scss$|\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: sass
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new CleanWebpackPlugin('dist'),
    // new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment/),
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: 'css/[id].[chunkhash].css'
    })
  ],
  resolve: {
    // extensions: ['.js', '.jsx', '.less'],
    alias: {
      'react': 'react/umd/react.production.min',
      'react-dom$': 'react-dom/umd/react-dom.production.min',
      'react-dom/server': 'react-dom/umd/react-dom-server.browser.production.min',
      'redux': 'redux/dist/redux.min',
      'react-redux': 'react-redux/dist/react-redux.min',
      'react-router-dom': 'react-router-dom/umd/react-router-dom.min',
      'prop-types': 'prop-types/prop-types.min',
      // 'redux-saga': 'redux-saga/dist/redux-saga.min',
      'moment$': 'moment/min/moment.min.js',
      'immutable': 'immutable/dist/immutable.min',
      'react-transition-group$': 'react-transition-group/dist/react-transition-group',
      'axios': 'axios/dist/axios.min',
      'animate.css': 'animate.css/animate.min.css'
      // 'pdfmake': 'pdfmake/build/pdfmake.min'
    }
  },
  devtool: false,
  optimization: {
    runtimeChunk: false,
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          mangle: true,
          ie8: false,
          warnings: false,
          output: null,
          exclude: [/\.min\.js$/gi]
        }
      }),
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {safe: true, discardComments: {removeAll: true}}
      })
      // new LodashModuleReplacementPlugin()
    ],
    splitChunks: {
      name: true,
      chunks: 'async',
      cacheGroups: {
        default: {
          chunks: 'initial',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  }
})
