import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import Bar from './sidebar'
import Hamburger from './hamburger'
import BarContent from './BarContent'

import '../../css/sidebar/hamburger.scss'
import '../../css/sidebar/sidebar.scss'

const SideBar = props => {
  const [isOpen, setOpen] = useState(false)

  const handleChange = () => {
    setOpen(isOpen => {
      return !isOpen
    })
  }

  return (
    <Bar isOpen={isOpen}>
      <div className={'sidebar-hamburger'}>
        <Hamburger action={handleChange} isOpen={isOpen} />
      </div>
      <div className={'content-wrapper'}>
        <BarContent isOpen={isOpen} />
      </div>
    </Bar>
  )
}

export default SideBar
