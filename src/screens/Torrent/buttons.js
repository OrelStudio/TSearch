import React from 'react'
import { Button } from 'antd'
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons'
import Torrent from '../../ipcRenderer/torrent.js'

const DownloadButtons = props => {
  const handleDownload = () => {
    Torrent.download({magnet: props.magnet, title: props.title, size: props.size})
  }

  return (
    <>
      <Button onClick={handleDownload} type={'primary'} icon={<DownloadOutlined />} size={'large'}>
        <span>{'Download'}</span>
      </Button>
      <Button type='primary' icon={<LinkOutlined />} size={'large'}>
        <span>{'Magnet'}</span>
      </Button>
    </>
  )
}

export default DownloadButtons
