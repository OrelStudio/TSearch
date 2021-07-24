const { ipcMain } = require('electron')
const fs = require('fs')
const TorrentSearchApi = require('torrent-search-api')

const torrentRequest = async(event) => {
  // fs.readFile('test.srt', 'utf8', (err, data) => {
  //   if(err) {
  //     throw err
  //   }
  //   event.reply('srt:response', data)
  // })
  const torrents = await TorrentSearchApi.search('One Piece', 'All', 20);
  event.reply('torrent:response', torrents)
}

const enableProvider = (event, provider) => {
    TorrentSearchApi.enableProvider(provider.value)
    event.reply('torrent:enable:response', provider)
}

const disableProvider = (event, provider) => {
    TorrentSearchApi.disableProvider(provider.value)
    event.reply('torrent:disable:response', provider)
}

const disableAllProviders = (event) => {
    TorrentSearchApi.disableAllProviders()
    event.reply('torrent:disable:all:response', 'torrent:disable:all:response')
}

module.exports = {
    torrentRequest,
    enableProvider,
    disableProvider,
    disableAllProviders
}
