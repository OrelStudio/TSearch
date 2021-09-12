import React, { useCallback } from 'react'
import { Button } from 'antd'
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons'
import Torrent from '../../ipcRenderer/torrent.js'
import electron from 'electron'

const DownloadButtons = props => {
  const handleDownload = useCallback(() => {
    Torrent.download({magnet: props.magnet, title: props.title, size: props.size})
  }, [props.magnet])

  const magnetHandler = useCallback(() => {
    electron.shell.openExternal(props.magnet)
  }, [props.magnet])

  return (
    <>
      <Button onClick={handleDownload} type={'primary'} icon={<DownloadOutlined />} size={'large'}>
        <span>{'Download'}</span>
      </Button>
      <Button onClick={magnetHandler} type='primary' icon={<LinkOutlined />} size={'large'}>
        <span>{'Magnet'}</span>
      </Button>
    </>
  )
}

export default DownloadButtons
