'use strict'

const path = require('path')
const {app, BrowserWindow} = require('electron')
const Env = require('./modules/env')
const { startWindow, platformCheck } = require('./electron')
const { torrentRequest, enableProvider, disableProvider, disableAllProviders } = require('./electron/ipcMain.js')
const { ipcMain } = require('electron')
const webfont = require("webfont").default;

let win

// Creates new window and loads the page, also handles the close event
app.on('ready', () => startWindow(win))

ipcMain.on('torrent:request', (event, arg) => {
  torrentRequest(event)
})
ipcMain.on('torrent:enable:request', (event, provider) => {
  enableProvider(event, provider)
})
ipcMain.on('torrent:disable:request', (event, provider) => {
  disableProvider(event, provider)
})
ipcMain.on('torrent:disable:all:request', (event, provider) => {
  disableAllProviders(event, provider)
})

app.on('window-all-closed', () => platformCheck(app))
