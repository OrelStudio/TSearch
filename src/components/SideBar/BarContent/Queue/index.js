import React, { useState } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import Queue from './queue'
import createItem from '../create'

const DownloadQueue = props => {
  const ItemComponent = createItem(Queue)

  return (
    <ItemComponent
      outlined={DownloadOutlined}
      itemCategory={'Queue'}
      isOpen={props.isOpen}
    />
  )
}

export default DownloadQueue
