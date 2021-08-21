const path = require('path')
const {app, BrowserWindow} = require('electron')
const Env = require('../modules/env')
const Logger = require('../src/logger/electronCon.js')

const Cons = new Logger('electron-startpoint')

const startWindow = (win) => {
  Cons.log('startWindow', 'Creating new window...')
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 900,
    minHeight: 500,
    icon: path.resolve(__dirname, '../resources/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  Cons.log('startWindow', 'Loading page...')
  win.loadURL(Env.isDev() ? 'http://localhost:3000' : `file://${path.join(__dirname, '../config/webpack/dist/index.html')}`)
  win.on('closed', () => {
    win = null
    Cons.log('closed', 'Window closed')
  })
}

const platformCheck = (app) => {
  if (process.platform !== 'darwin') {
    app.quit()
    Cons.log('platformCheck', 'Window closed')
  }
}

module.exports = {
  startWindow: startWindow,
  platformCheck: platformCheck
}
