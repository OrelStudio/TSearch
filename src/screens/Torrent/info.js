import React from 'react'

const Info = props => {
  return (
    <div className='info-container'>
      <span>{`Title: ${props.torrent.title}`}</span>
      <span>{`Size: ${props.torrent.size}`}</span>
      <span>{`Seeds: ${props.torrent.seeds}`}</span>
      <span>{`Peers: ${props.torrent.peers}`}</span>
      <span>{`Provider: ${props.torrent.provider}`}</span>
      {props.torrent.desc !== undefined ? (
        <span>{`Desc: ${props.torrent.desc}`}</span>
      ) : null}
    </div>
  )
}

export default Info
