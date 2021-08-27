import React, {useState} from 'react'
import classNames from 'classnames'
import ItemTemplate from './template'

const createItem = (Component = null) => {

  const NewItem = props => {
    const [isInside, setInside] = useState(false)
    const Outlined = props.outlined

    const enterHandler = () => {
      setInside(true)
    }
    const leaveHandler = () => {
      setInside(false)
    }

    return (
      <div className={classNames('sidebar-content')}>
        <ItemTemplate isOpen={props.isOpen}>
          <div className={'icon-text'} onMouseEnter={enterHandler}>{props.itemCategory}</div>
          <Outlined style={{ fontSize: '33px', color: '#ffffff' }} className={'queue-icon'} onMouseEnter={enterHandler} />
          {Component !== null ? <Component /> : null}
        </ItemTemplate>
      </div>
    )
  }
  return NewItem
}

export default createItem
