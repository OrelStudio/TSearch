import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'

const ResultsItem = props => {
  const torrent = props.torrent
  const [clicked, setClicked] = useState(false)

  const clickHandler = () => {
    localStorage.setItem('temp', queryString.stringify(torrent));
    setClicked(true)
  }

  return (
    <div className='item' onClick={clickHandler}>
      {clicked === true ? (<Redirect to={`/torrent/${props.searchValue}`} />) : null}
      <div className={'item-text'}>
        <div className={'item-title'}>
          <span>
            {torrent.title}
          </span>
        </div>
          <div className={'item-info'}>
          <div>{`size: ${torrent.size},`}</div>
          <div>{`provider: ${torrent.provider},`}</div>
          <div>{`seeds: ${torrent.seeds},`}</div>
          <div>{`peers: ${torrent.peers}.`}</div>
        </div>
      </div>
    </div>
  )
}

export default ResultsItem
