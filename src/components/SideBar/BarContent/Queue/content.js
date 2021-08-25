import React from 'react'
import { PauseOutlined, CloseOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Progress, Button } from 'antd'

const ItemContent = props => {
  const item = props.item
  const type = props.type

  return (
    <>
      <div className={'queue-title'}>
        <span>{item.title}</span>
      </div>
      <div className={'queue-desc'}>
        <span>{`Download Speed: ${item.speed}ps, `}</span>
        <span>{`Files: ${item.length}`}</span>
      </div>
      <div className={'progress'}>
        <span>{`${item.total}/${item.size}`}</span>
        <Progress percent={item.progress} size='small' status={item.progress === 100 ? 'success' : 'active'} />
      </div>
    </>
  )
}

export default ItemContent
