import React, { useRef, useEffect } from 'react'
// import TorrentSearchApi from 'torrent-search-api'
import Logger from '../../logger'
import { ipcRenderer } from 'electron'
import { Button } from 'antd';
import Selector from '../../components/Select'
import Search from '../../components/Search'
import SideBar from '../../components/SideBar'
import '../../css/main.scss'

const App = props => {
  return (
    <div className={'main-page'}>
      
      <div className={'main-content'}>
        <div className='main-part'>
          <div className={'logo-area'}>
            <span>{'TSearch'}</span>
          </div>
          <div className={'content'}>
            <div className={'main-wrapper'}>
            <div className={'search-wrapper'}>
                <Search />
              </div>
              <Selector/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
