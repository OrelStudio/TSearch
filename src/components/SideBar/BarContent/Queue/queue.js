import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import Torrent from '../../../../ipcRenderer/torrent.js'
import QueueItem from './item'
import { motion } from 'framer-motion'

import '../../../../css/sidebar/queue.scss'

const Queue = props => {
  const [queue, setQueue] = useState([])
  const [firstTime, setFirstTime] = useState(true)
  const queueAnimate = { opacity: props.isInside ? 1 : 0}

  if(firstTime) {
    setQueue(Torrent.getQueue())
    setFirstTime(false)
  }

  const addToQueue = (event, item) => {
    setQueue(queue => {
      Torrent.setQueue(queue.concat(item))
      return queue.concat(item)
    })
  }

  const updateItem = (event, itemToReplace) => {
    const chosenItem = queue.filter(item => item.magnet === itemToReplace.magnet)

    if(chosenItem.length !== 0) {
      setQueue(queue => {
        const newQueue = queue.map(item => {
          if(item === chosenItem[0]) {
            return itemToReplace
          } else {
            return item
          }
        })
        Torrent.setQueue(newQueue)

        return newQueue
      })
    }
  }

  const removeFromQueue = (event, magnet) => {
    setQueue(queue => {
      const newQueue = queue.filter(item => item.magnet !== magnet)
      Torrent.setQueue(newQueue)

      return newQueue
    })
  }

  useEffect(() => {
    ipcRenderer.on('queue:add', addToQueue)
    ipcRenderer.on('queue:update', updateItem)
    ipcRenderer.on('queue:remove', removeFromQueue)
    return () => {
      ipcRenderer.removeListener('queue:add', addToQueue)
      ipcRenderer.removeListener('queue:update', updateItem)
      ipcRenderer.removeListener('queue:remove', removeFromQueue)
    }
  })

  return (
    <>
      <div className={'queue-container'} >
        <motion.div className={'queue'} animate={{ opacity: props.isInside ? 1 : 0, display: props.isInside ? 'block' : 'none' }} transition={{ duration: 0.2 }}>
          {queue.length === 0 ? (
            <div className={'queue-empty'}>
              <h3>{'Download queue is empty'}</h3>
              <h3>{'Torrents will appear here'}</h3>
              <h3>{'when you download them'}</h3>
            </div>
          ) : null}
          {queue.map((item, i) => <QueueItem item={item} key={i} />)}
        </motion.div>
        <motion.div className={'arrow-right'} animate={{ opacity: props.isInside ? 1 : 0, display: props.isInside ? 'block' : 'none' }} transition={{ duration: 0.2 }} />
      </div>
    </>
  )
}

export default Queue
