import React, { useState } from 'react'
import { DownloadOutlined } from '@ant-design/icons'
import Queue from './queue'
import ItemTemplate from '../template'

const DownloadQueue = props => {
  const [isInside, setInside] = useState(false)

  const enterHandler = () => {
    setInside(true)
  }
  const leaveHandler = () => {
    setInside(false)
  }

  // onMouseLeave={leaveHandler}

  return (
    <div className={'sidebar-content'} onMouseLeave={leaveHandler}>
      <Queue isOpen={props.isOpen} isInside={isInside} />
      <div className={'queue-download'}>
        <ItemTemplate isOpen={props.isOpen}>
          {props.isOpen ? <div className={'icon-text'} onMouseEnter={enterHandler}>Queue</div> : null}
          <DownloadOutlined style={{ fontSize: '33px', color: '#ffffff' }} className={'queue-icon'} onMouseEnter={enterHandler} />
        </ItemTemplate>
      </div>
    </div>
  )
}

export default DownloadQueue
