const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
const TorrentSearchApi = require('torrent-search-api')
const Logger = require('../src/logger/electronCon.js')
const { getHistory, addItem } = require('./history')

const addToHistory = (value) => {
  const date = new Date()
  const currentDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
  const data = [{
    value,
    'date': currentDate,
    'providers': TorrentSearchApi.getActiveProviders().map((provider) =>
      ({'value': provider.name, 'label': provider.name})
    )
  }]

  addItem(data, 'search').then((result) => {
    console.log(result);
  }).catch(error => {
    console.error(error);
  })
}

const Cons = new Logger('ipcMain')

const torrentRequest = async(event, value) => {
  Cons.log('Torrent', `Searching for ${value}`)
  addToHistory(value)
  const torrents = await TorrentSearchApi.search(value, 'All');
  event.reply('torrent:response', torrents)
}

const magnetRequest = async(event, torrent) => {
  Cons.log('Magnet', `requesting magnet for ${torrent.title}`)
  const magnet = await TorrentSearchApi.getMagnet(torrent)
  event.reply('magnet:response', magnet)
}

const getEnabledProviders = (event, args) => {
  event.reply('torrent:providers:response', TorrentSearchApi.getActiveProviders().map((provider) =>
    ({'value': provider.name, 'label': provider.name})
  ))
}

const enableProvider = (event, provider) => {
  Cons.log('Torrent', `Enabled ${provider.value}`)
  TorrentSearchApi.enableProvider(provider.value)
  event.reply('torrent:enable:response', provider)
}

const disableProvider = (event, provider) => {
  Cons.log('Torrent', `Disabled ${provider.value}`)
  TorrentSearchApi.disableProvider(provider.value)
  event.reply('torrent:disable:response', provider)
}

const disableAllProviders = (event) => {
  Cons.log('Torrent', `Disabled All`)
  TorrentSearchApi.disableAllProviders()
  event.reply('torrent:disable:all:response', 'torrent:disable:all:response')
}

module.exports = {
  torrentRequest,
  magnetRequest,
  getEnabledProviders,
  enableProvider,
  disableProvider,
  disableAllProviders
}
