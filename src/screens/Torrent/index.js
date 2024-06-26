import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import queryString from 'query-string'
import { ipcRenderer } from 'electron'
import useTorrentStore from '../../useTorrentStore'
import Selector from '../../components/Select'
import Search from '../../components/Search'
import Navigation from '../../components/Navigation'
import DownloadSection from './download'
import '../../css/torrent.scss'

import Logger from '../../logger'
const Cons = new Logger('Torrent')

const TorrentPage = props => {
  const torrent = localStorage.getItem('temp')
  const torrentObj = queryString.parse(torrent)
  const { searchValue } = useParams()

  const getMagnet = useTorrentStore(state => state.getMagnet)
  const onDownload = useTorrentStore(state => state.onDownload)

  const tabs = useMemo(() => [{'path': '/', 'name': 'Home'}, {'path': `/search/${searchValue}`, 'name': searchValue}], [searchValue])
  const current = torrentObj.title

  const [magnet, setMagnet] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getMagnet(torrentObj)
  }, [])

  const onMagnetResponse = (event, magnet) => {
    Cons.log('onMagnetResponse', magnet)
    setMagnet(magnet)
    setLoaded(true)
  }

  useEffect(() => {
    ipcRenderer.on('magnet:response', onMagnetResponse)
    ipcRenderer.on('magnet:download:response', onDownload)
    return () => {
      ipcRenderer.removeListener('magnet:response', onMagnetResponse)
      ipcRenderer.removeListener('magnet:download:response', onDownload)
    }
  })

  return (
    <div className='torrent-main'>
    <Navigation tabs={tabs} current={current} />
      {loaded ? (
        <>
          <div className={'results-search'}>
            <Selector />
            <Search id={'torrent-input'}/>
          </div>
          <DownloadSection torrent={torrentObj} magnet={magnet}/>
        </>
      ) : <h1>Loading</h1>}
    </div>
  )
}

export default TorrentPage
