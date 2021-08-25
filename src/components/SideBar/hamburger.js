import React, { useState } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import '../../css/sidebar/hamburger.scss'

const Hamburger = props => {
  return (
    <div className={'hamburger'} onClick={props.action}>
      <motion.div className={'hamburger-line'} animate={{ transform: props.isOpen ? 'rotate(45deg) translate(7px, 7px)' : 'rotate(0deg) translate(0px, 0px)' }} />
      <motion.div className={'hamburger-line'} animate={{ opacity: props.isOpen ? 0 : 1 }} transition={{ duration: 0.2 }}/>
      <motion.div className={'hamburger-line'} animate={{ transform: props.isOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'rotate(0deg) translate(0px, 0px)' }} />
    </div>
  )
}

export default Hamburger
