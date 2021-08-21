import React from 'react'
import DownloadButtons from './buttons'
import Info from './info'

const DownloadSection = props => {
  const torrent = props.torrent

  return (
    <div className='download-wrapper'>
      <div className='download-title'>
        <span>{torrent.title}</span>
      </div>
      <div className='download-section'>
        <DownloadButtons magnet={props.magnet} />
      </div>
      <Info torrent={torrent} />
    </div>
  )
}

export default DownloadSection
