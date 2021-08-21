import { ipcRenderer } from 'electron'
import Logger from '../logger'
const Cons = new Logger('Torrent')

let canSearch = false
let selectedProviders = null

class Torrent {
  static getData = (value) => {
    return ipcRenderer.send('torrent:request', value)
  }
  static getMagnet = (torrent) => {
    return ipcRenderer.send('magnet:request', torrent)
  }
  static download = (magnet) => {
    return ipcRenderer.send('magnet:download:request', magnet)
  }
  static enableProvider = (provider) => {
    return ipcRenderer.send('torrent:enable:request', provider)
  }
  static disableProvider = (provider) => {
    return ipcRenderer.send('torrent:disable:request', provider)
  }
  static disableAllProviders = () => {
    return ipcRenderer.send('torrent:disable:all:request', 'torrent:disable:all:request')
  }

  // events
  static onEnableProvider = (event, provider) => {
    Cons.log('onEnableProvider', `Enabled ${provider.value}`)
  }
  static onDisableProvider = (event, provider) => {
    Cons.log('onDisableProvider', `Disabled ${provider.value}`)
  }
  static onDisableAllProviders = (event, arg) => {
    Cons.log('onDisableAllProvider', `Disabled All`)
  }
  static onDownload = (event, arg) => {
    Cons.log('onDownload', `${arg}`)
  }

  static setSearch = bool => {
    canSearch = bool
  }
  static getSearch = () => {
    return canSearch
  }

  static setSelectedProviders = providers => {
    selectedProviders = providers
  }
  static getSelectedProviders = providers => {
    return selectedProviders
  }
}

export default Torrent
