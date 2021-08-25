const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
const { dialog } = require('electron')
const { getHistory, addItem } = require('../history')
const { addToQueue, updateQueueItem, removeFromQueue} = require('./queue')
const Logger = require('../../src/logger/electronCon.js')
const WebTorrent = require('webtorrent-hybrid')

const client = new WebTorrent()
const Cons = new Logger('ipcMain')

const addToHistory = (title, magnet) => {
  const currentDate = Date.now()
  const data = [{
    title,
    magnet,
    'date': currentDate
  }]

  addItem(data, 'download').then((result) => {
    console.log(result)
  }).catch(error => {
    console.error(error)
  })
}

const removeTorrent = (magnet) => {
  client.remove(magnet, err => {
    if(err) {
      console.error(err)
    }
    console.log('removed')
  })
}

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

   const k = 1024
   const dm = decimals < 0 ? 0 : decimals
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

   const i = Math.floor(Math.log(bytes) / Math.log(k))

   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const onDownload = (torrent, bytes, info) => {
  // update queue here
  updateQueueItem({
    title: info.title, size: info.size, magnet: info.magnet,
    speed: formatBytes(torrent.downloadSpeed),
    total: formatBytes(torrent.downloaded),
    progress: Math.trunc(torrent.progress * 100),
    length: torrent.files.length
  })
}

const onFinish = (info, files) => {
  Cons.log('Torrent', `finished`)
  addToHistory(info.title, info.magnet)
  // remove from queue here
  files.forEach(file => {
    Cons.log('Torrent', `file: ${file.name}`)
  })
  removeFromQueue(info.magnet)
  removeTorrent(info.magnet)
}

const downloadTorrentFromMagnet = (event, info, folderPath) => {
  Cons.log('Torrent', 'downloading torrent...')
  client.add(info.magnet, {path: folderPath}, torrent => {
    const files = torrent.files
    let length = files.length
    // add to queue here
    addToQueue({
      title: info.title, size: info.size, magnet: info.magnet,
      speed: 0, total: 0, progress: 0, length: length
    })
    Cons.log('Torrent', `downloading to ${torrent.path}`)
    Cons.log('Torrent', `Number of files: ${length}`)

    torrent.on('download', bytes => onDownload(torrent, bytes, info))
    torrent.on('done', () => onFinish(info, files))
  })
  event.reply('magnet:download:response', 'downloading')
}

const selectDownloadDirectory = (event, info) => {
  dialog.showOpenDialog({
    title: 'Select Folder',
    properties: ['openDirectory', 'showHiddenFiles']
  }).then(obj => {
    if(!obj.canceled) {
      const folderPath = path.resolve(obj.filePaths[0])
      downloadTorrentFromMagnet(event, info, folderPath)
    }
  })
}

module.exports = {
  selectDownloadDirectory
}
