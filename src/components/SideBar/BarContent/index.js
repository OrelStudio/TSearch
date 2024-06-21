import React, { useState } from 'react'
import DownloadQueue from './Queue'

const BarContent = props => {
  return (
    <>
      <DownloadQueue isOpen={props.isOpen} />
    </>
  )
}

export default BarContent
