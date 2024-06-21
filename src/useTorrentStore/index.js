import { ipcRenderer } from 'electron'
import Logger from '../logger'
const Cons = new Logger('Torrent')

import {create} from 'zustand'

const useTorrentStore = create((set) => ({
  canSearch: false,
  selectedProviders: null,
  queue: [],

  setCanSearch: (bool) => set({ canSearch: bool }),
  setSelectedProviders: (providers) => set({ selectedProviders: providers }),
  setQueue: (value) => set({ queue: value }),

  getData: (value) => {
    return ipcRenderer.send('torrent:request', value)
  },
  getMagnet: (torrent) => {
    return ipcRenderer.send('magnet:request', torrent)
  },
  download: (magnet) => {
    return ipcRenderer.send('magnet:download:request', magnet)
  },
  enableProvider: (provider) => {
    return ipcRenderer.send('torrent:enable:request', provider)
  },
  disableProvider: (provider) => {
    return ipcRenderer.send('torrent:disable:request', provider)
  },
  disableAllProviders: () => {
    return ipcRenderer.send('torrent:disable:all:request', 'torrent:disable:all:request')
  },

  // events
  onEnableProvider: (event, provider) => {
    Cons.log('onEnableProvider', `Enabled ${provider.value}`)
  },
  onDisableProvider: (event, provider) => {
    Cons.log('onDisableProvider', `Disabled ${provider.value}`)
  },
  onDisableAllProviders: (event, arg) => {
    Cons.log('onDisableAllProvider', `Disabled All`)
  },
  onDownload: (event, arg) => {
    Cons.log('onDownload', `${arg}`)
  }

}))

export default useTorrentStore
