import React from 'react'
import { Button } from 'antd'
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons'
import useTorrentStore from '../../useTorrentStore'

const DownloadButtons = props => {
  const download = useTorrentStore(state => state.download)

  const handleDownload = () => {
    download({magnet: props.magnet, title: props.title, size: props.size})
  }

  return (
    <>
      <Button onClick={handleDownload}
        type={'primary'} icon={
          <div className='icon'>
            <div id='down-1'>
              <DownloadOutlined style={{fontSize: '24px', strokeWidth: 45, stroke: 'white'}} />
            </div>
            <div id='down-2'>
              <DownloadOutlined style={{fontSize: '24px', strokeWidth: 45, stroke: 'white'}} />
            </div>
          </div>
        } size={'large'}>
        <span>{'Download'}</span>
      </Button>
      <Button
        type='primary'
        icon={
          <div className='icon'>
            <div id='down-1'>
              <LinkOutlined style={{fontSize: '24px', strokeWidth: 30, stroke: 'white'}} />
            </div>
            <div id='down-2'>
              <LinkOutlined style={{fontSize: '24px', strokeWidth: 30, stroke: 'white'}} />
            </div>
          </div>
        } size={'large'}>
        <span>{'Magnet'}</span>
      </Button>
    </>
  )
}

export default DownloadButtons
