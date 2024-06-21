import React from 'react'
import {Skeleton} from 'antd'

const ResultSkeleton = props => {
  return (
    <div className='item-skeleton'>
      <div className={'item-text-skeleton'}>
        <div className={'item-title-skeleton'}>
          <Skeleton active paragraph={{rows: 1}}  />
        </div>
      </div>
    </div>
  )
}

export default ResultSkeleton
