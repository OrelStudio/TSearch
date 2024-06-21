import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import ItemContent from './content'

import '../../../../css/sidebar/queue.scss'

const QueueItem = props => {
  const [type, setType] = useState('pause')
  const item = props.item

  const pauseHandler = (value) => {
    setType(type => {
      let newType = type === 'pause' ? 'resume' : 'pause'
      ipcRenderer.send('torrent:download:action', newType)

      return newType
    })
  }

  const removeHandler = () => {
    ipcRenderer.send('torrent:download:action', 'destroy')
  }

  return (
    <ItemContent item={item} pauseHandler={pauseHandler} removeHandler={removeHandler} type={type} />
  )
}

export default QueueItem
