import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import useTorrentStore from '../../useTorrentStore'

const Navigation = props => {
  const disableAllProviders = useTorrentStore(state => state.disableAllProviders)

  const clickHandler = tab => {
    if(props.tabs.length === 1) {
      disableAllProviders()
    }
  }

  return (
    <Breadcrumb className={'navigation'}>
      {props.tabs.map((tab, i) =>
        <Breadcrumb.Item key={i} id='inactive-bread'>
          <Link to={tab.path}>{tab.name}</Link>
        </Breadcrumb.Item>
      )}
      <Breadcrumb.Item id='bread'>{props.current}</Breadcrumb.Item>
    </Breadcrumb>
  )
}

export default Navigation
