import React from 'react'
import { CopyrightOutlined } from '@ant-design/icons'
import { Space } from 'antd'

const Credit = props => {
  return (
    <span className='credit'>{props.children}</span>
  )
}

export default Credit
