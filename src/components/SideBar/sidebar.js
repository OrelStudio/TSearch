import React, { useState } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import '../../css/sidebar/sidebar.scss'

const Bar = props => {
  return (
    <motion.div className={'sidebar-wrapper'} animate={{ width: props.isOpen ? '170px' : '73px' }}>
      {props.children}
    </motion.div>
  )
}

export default Bar
