import { ipcRenderer } from 'electron'
import Logger from '../../logger'

const Cons = new Logger('Torrent')

class Torrent {
    static getData = () => {
      return ipcRenderer.send('torrent:request', 'torrent:request')
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
        Cons.log('onDisableProvider', `Disabled ${provider}`)
    }
    static onDisableAllProviders = (event, arg) => {
        Cons.log('onDisableProvider', `Disabled All`)
    }
}

export default Torrent
