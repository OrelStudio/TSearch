import React, { useRef, useEffect } from 'react'
// import TorrentSearchApi from 'torrent-search-api'
import Logger from '../../logger'
import { ipcRenderer } from 'electron'
import { Button } from 'antd';
import Selector from '../../components/Select'
import Torrent from '../../components/Select/torrent.js'
import '../../css/main.scss'

const App = props => {
  useEffect(() => {
    const onTorrentRequest = (event, arg) => {
        console.log(`sdfsdf: ${JSON.stringify(arg)}`)
    }

    ipcRenderer.on('torrent:response', onTorrentRequest)

    return () => {
        ipcRenderer.removeListener('torrent:response', onTorrentRequest)
    }
  }, [])

  const cons = new Logger('test')

  const test = () => {
      Torrent.getData()
  }

  return (
    <>
        <div className="logo-area">{'TSearch'}</div>
        <div className="content">
            <div className="main-wrapper">
                <Selector/>
                <Button onClick={test} type="primary">{'Let\'s Go!'}</Button>
            </div>
        </div>
    </>
  )
}

export default App
