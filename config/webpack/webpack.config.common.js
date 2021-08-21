'use strict'

const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: [
      path.resolve(__dirname, '../../src/index.js')
    ],
    vendors: [
      'react',
      'react-dom'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    sourcePrefix: '\t'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: [
          // 'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              ...JSON.parse(fs.readFileSync(path.resolve(__dirname, './.babelrc'))),
              // babelrc: './.babelrc',
              babelrc: true,
              cwd: 'babelrc',
              root: path.resolve(__dirname, '.')
            }
          }
        ],
        include: /src/,
        exclude: /node_modules/
      },
      // font awesome
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      // ignore outer css
      {
        test: /\.css$/,
        include: /node_modules/,
        use: 'ignore-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'react-svg-loader',
            options: {
              ref: true,
              jsx: true,
              svgo: {
                plugins: [
                  {removeTitle: true, prefixIds: true}
                ],
                floatPrecision: 2
              }
            }
          }
        ],
        // only when included by js file
        issuer: {
          include: /\.js$|\.jsx$|\.mjs$/
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        issuer: {
          exclude: /\.js$|\.jsx$|\.mjs$/
        }
      },
      // other stuff
      {
        test: /\.(png|gif|jpg)$/,
        include: path.resolve(__dirname, './src/images'),
        exclude: /node_modules/,
        use: 'url-loader?limit=20480&name=images/[name]-[hash].[ext]'
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  },
  resolve: {
    alias: {
      // TODO: fix building inside docker - for some reason this is buggy
      'fs-icons': '@fortawesome/pro-solid-svg-icons'
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/index.html'),
      filename: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        API: JSON.stringify(process.env['API']),
        'API_PATH': JSON.stringify(process.env['API_PATH']),
        SSL: JSON.stringify(process.env['SSL'] || false),
        'ENV_TYPE': JSON.stringify(process.env['ENV_TYPE'])
      }
    })
  ],
  stats: {
    errors: true,
    errorDetails: false,
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    timings: true,
    reasons: true
  }
}
