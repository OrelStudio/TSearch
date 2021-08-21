import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import Torrent from '../../ipcRenderer/torrent.js'

const Navigation = props => {
  const clickHandler = tab => {
    if(props.tabs.length === 1) {
      Torrent.disableAllProviders()
    }
  }

  return (
    <Breadcrumb className={'navigation'}>
      {props.tabs.map((tab, i) =>
        <Breadcrumb.Item key={i}>
          <Link to={tab.path}>{tab.name}</Link>
        </Breadcrumb.Item>
      )}
      <Breadcrumb.Item>{props.current}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default Navigation
