'use strict'

const merge = require('webpack-merge')

const Environment = require('../../modules/env')

module.exports = (env = Environment.getEnv()) => {
  if (Environment.isWeb()) {
    return require(`./webpack.config.${env}.js`)
  }
  return merge(require(`./webpack.config.${env}.js`), require('./webpack.config.electron.js'))
}
