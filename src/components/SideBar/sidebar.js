import React, { useState } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import '../../css/sidebar/sidebar.scss'

const Bar = ({isOpen: open, children}) => {
  return (
    <motion.div className={classNames('sidebar-wrapper', {open})} animate={{width: open ? '170px' : '73px'}}>
      {children}
    </motion.div>
  )
}

export default Bar
