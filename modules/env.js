'use strict'

const lodash = require('lodash')

const DEFAULT_ENV = 'development'

const ENV = process.env['NODE_ENV'] || DEFAULT_ENV

const PLATFORM = process.env['TARGET'] || 'electron'

const getEnvChecker = (shortcut) => {
  return () => {
    return String(ENV).toLowerCase().startsWith(shortcut)
  }
}

const Environment = new Function()

Environment.isDev = getEnvChecker('dev')
Environment.isProd = getEnvChecker('prod')
Environment.getEnv = lodash.memoize(() => {
  if (Environment.isDev()) {
    return 'dev'
  }
  return 'prod'
})
Environment.getPlatform = () => PLATFORM
Environment.isWeb = () => Environment.getPlatform().toLowerCase() === 'web'

module.exports = Environment
