import React from 'react'
import createItem from '../create'
import { Link, useParams } from 'react-router-dom'
import Torrent from '../../../../ipcRenderer/torrent.js'
import { HistoryOutlined } from '@ant-design/icons'

const SideBarHistory = props => {
  const ItemComponent = createItem()

  return (
    <Link to={`/history`}>
      <ItemComponent
        outlined={HistoryOutlined}
        itemCategory={'History'}
        isOpen={props.isOpen}
      />
    </Link>
  )
}

export default SideBarHistory
