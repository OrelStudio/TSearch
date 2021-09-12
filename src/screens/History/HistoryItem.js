import React from 'react'
import { Link } from 'react-router-dom'
import Torrent from '../../ipcRenderer/torrent.js'

const HistoryItem = props => {
  const enableProviders = () => {
    Torrent.disableAllProviders()
    props.providers.forEach(provider => {
      console.log(provider);
      Torrent.enableProvider(provider)
    })
  }

  return (
    <Link onClick={enableProviders} to={`/search/route/${props.children}`}>
      <div className='item'>
        <div className={'item-text'}>
          <div className={'item-title'}>
            <span>
              {props.children}
            </span>
          </div>
          <div className={'item-info'}>
            <span>{'providers: '}</span>
            {props.providers.map((provider, i) =>
              <span key={i}>{`${provider.value},`}</span>
            )}
            <div>{`Date: ${props.date}.`}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default HistoryItem
