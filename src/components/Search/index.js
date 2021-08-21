import React, { useEffect, useRef, useState } from 'react'
import { ipcRenderer } from 'electron'
import Torrent from '../../ipcRenderer/torrent.js'
import { Redirect } from 'react-router-dom'
import SearchButtons from './Search'

import '../../css/main.scss'

const Search = props => {
  const input = useRef('')
  const [clicked, setClicked] = useState(false)

  const searchHandler = () => {
    if(input.current.state.value !== undefined && Torrent.getSearch()) {
      setClicked(true)
    }
  }

  useEffect(() => {
    setClicked(false)
  })

  return (
    <>
      {clicked === true ? (<Redirect to={`/search/route/${input.current.state.value || ''}`} />) : null}
      <SearchButtons searchHandler={searchHandler} refVar={input}></SearchButtons>
    </>
  )
}

export default Search
