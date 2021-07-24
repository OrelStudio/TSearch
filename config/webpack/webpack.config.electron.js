'use strict'

const spawn = require('cross-spawn')

module.exports = {
  target: 'electron-renderer',
  node: { fs: 'empty' },
  devServer: {
    before () {
      spawn('npm run start:electron', [], {shell: true, env: process.env, stdio: 'inherit'})
        .on('close', (code) => process.exit(code))
        .on('error', (error) => console.error(error))
    }
  }
}
