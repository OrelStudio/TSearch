import React, { useState, useEffect } from 'react'
import { ipcRenderer } from 'electron'
import useTorrentStore from '../../../../useTorrentStore'
import QueueItem from './item'
import { motion } from 'framer-motion'

import '../../../../css/sidebar/queue.scss'

const Queue = props => {
  const [queue, setQueue] = useState([])
  const queueAnimate = { opacity: props.isInside ? 1 : 0}
  const storedQueue = useTorrentStore(state => state.queue)

  const setStoreQueue = useTorrentStore(state => state.setQueue)


  useEffect(() => {
    setQueue(storedQueue)
  }, [])

  const addToQueue = (event, item) => {
    setQueue(queue => {
      setStoreQueue(queue.concat(item))
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
        setStoreQueue(newQueue)

        return newQueue
      })
    }
  }

  const removeFromQueue = (event, magnet) => {
    setQueue(queue => {
      const newQueue = queue.filter(item => item.magnet !== magnet)
      setStoreQueue(newQueue)

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
        <div className={'queue'}>
          {queue.length === 0 ? (
            <div className={'queue-empty'}>
              <h3>{'Download queue is empty'}</h3>
              <h3>{'Torrents will appear here'}</h3>
              <h3>{'when you download them'}</h3>
            </div>
          ) : null}
          {queue.map((item, i) => <QueueItem item={item} key={i} />)}
        </div>
        <div className={'arrow-right'} />
      </div>
    </>
  )
}

export default Queue
