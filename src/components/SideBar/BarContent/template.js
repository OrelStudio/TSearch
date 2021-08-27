import React from 'react'
import { motion } from 'framer-motion'

const ItemTemplate = props => {
  return (
    <div className={'item-main'}>
      <motion.div className={'queue-content'} animate={{ 'margin-left': props.isOpen ? '42px' : '22px' }}>
        {props.children}
      </motion.div>
    </div>
  )
}

export default ItemTemplate
