const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
const { ipcMain, dialog } = require('electron')
const Logger = require('../src/logger/electronCon.js')
const WebTorrent = require('webtorrent-hybrid')

const client = new WebTorrent()
const Cons = new Logger('ipcMain')

const onDownload = (torrent, bytes) => {
  console.log(torrent);
  // send to ipcRenderer here
}

const downloadTorrentFromMagnet = (event, magnet, folderPath) => {
  Cons.log('Torrent', 'downloading torrent...')
  client.add(magnet, {path: folderPath}, torrent => {
    Cons.log('Torrent', `downloading to ${torrent.path}`)
    const files = torrent.files
    let length = files.length
    // torrent.on('download', bytes => onDownload(torrent, bytes))
    Cons.log('Torrent', `Number of files: ${length}`)
    torrent.on('done', () => {
      Cons.log('Torrent', `finished`)

      files.forEach(file => {
        Cons.log('Torrent', `file: ${file.name}`)
      })
    })
  })
  event.reply('magnet:download:response', 'downloading')
}

const selectDownloadDirectory = (event, magnet) => {
  dialog.showOpenDialog({
    title: 'Select Folder',
    properties: ['openDirectory', 'showHiddenFiles']
  }).then(obj => {
    if(!obj.canceled) {
      const folderPath = path.resolve(obj.filePaths[0])
      downloadTorrentFromMagnet(event, magnet, folderPath)
    }
  })
}

module.exports = {
  selectDownloadDirectory
}
