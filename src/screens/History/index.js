import React, { useMemo, useEffect, useState } from 'react'
import Navigation from '../../components/Navigation'
import Torrent from '../../ipcRenderer/torrent.js'
import { useParams } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import HistoryItem from './HistoryItem'

import '../../css/history.scss'

const History = props => {
  const navigation = Torrent.getNavigation()
  const tabs = useMemo(() => navigation, [navigation])
  const [history, setHistory] = useState([])

  useEffect(() => {
    ipcRenderer.send('history:get:request', 'search')
  }, [])

  const onHistoryResponse = (event, data) => {
    setHistory(data)
  }

  useEffect(() => {
    ipcRenderer.on('history:get:response', onHistoryResponse)
    return () => {
      ipcRenderer.removeListener('history:get:response', onHistoryResponse)
    }
  })

  return (
    <div className={'history-main'}>
      <Navigation tabs={tabs} current={'History'} />
      <div className={'history-items'}>
        {history.map((item, i) =>
          <HistoryItem providers={item.providers} date={item.date} key={i}>{item.value}</HistoryItem>
        )}
      </div>
    </div>
  )
}

export default History
