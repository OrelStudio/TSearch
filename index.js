'use strict'

const path = require('path')
const {app, BrowserWindow} = require('electron')
const Env = require('./modules/env')
const { startWindow, platformCheck } = require('./electron')
const { torrentRequest,
  getEnabledProviders,
  enableProvider,
  disableProvider,
  disableAllProviders,
  magnetRequest
} = require('./electron/search.js')
const { fetchHistory } = require('./electron/history/history')
const { selectDownloadDirectory } = require('./electron/download')
const { ipcMain } = require('electron')

// Creates new window and loads the page, also handles the close event
app.on('ready', () => startWindow())
// Search events
ipcMain.on('torrent:request', (event, value) => torrentRequest(event, value))
ipcMain.on('magnet:request', (event, torrent) => magnetRequest(event, torrent))
ipcMain.on('torrent:providers:request', (event, args) => getEnabledProviders(event, args))
ipcMain.on('torrent:enable:request', (event, provider) => enableProvider(event, provider))
ipcMain.on('torrent:disable:request', (event, provider) => disableProvider(event, provider))
ipcMain.on('torrent:disable:all:request', (event, provider) => disableAllProviders(event, provider))
// Download events
ipcMain.on('magnet:download:request', (event, info) => selectDownloadDirectory(event, info))
// History events
ipcMain.on('history:get:request', (event, type) => fetchHistory(event, type))

app.on('window-all-closed', () => platformCheck(app))
