'use strict'

const path = require('path')
const {app, BrowserWindow} = require('electron')
const Env = require('./modules/env')
const { startWindow, platformCheck } = require('./electron')
const { torrentRequest,
  enableProvider,
  disableProvider,
  disableAllProviders,
  magnetRequest
} = require('./electron/search.js')
const { selectDownloadDirectory } = require('./electron/download')
const { ipcMain } = require('electron')

let win

// Creates new window and loads the page, also handles the close event
app.on('ready', () => startWindow(win))

ipcMain.on('torrent:request', (event, value) => torrentRequest(event, value))
ipcMain.on('magnet:request', (event, torrent) => magnetRequest(event, torrent))
ipcMain.on('torrent:enable:request', (event, provider) => enableProvider(event, provider))
ipcMain.on('torrent:disable:request', (event, provider) => disableProvider(event, provider))
ipcMain.on('torrent:disable:all:request', (event, provider) => disableAllProviders(event, provider))

ipcMain.on('magnet:download:request', (event, magnet) => selectDownloadDirectory(event, magnet))

app.on('window-all-closed', () => platformCheck(app))
