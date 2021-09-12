import React, { useState } from 'react'
import DownloadQueue from './Queue'
import SideBarHistory from './History'

const BarContent = props => {
  return (
    <>
      <SideBarHistory isOpen={props.isOpen} />
      <DownloadQueue isOpen={props.isOpen} />
    </>
  )
}

export default BarContent
