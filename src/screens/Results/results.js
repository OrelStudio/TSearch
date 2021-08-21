import React, { useEffect, useState, useCallback } from 'react'
import { ipcRenderer } from 'electron'
import Torrent from '../../ipcRenderer/torrent.js'
import ResultsItem from '../../components/ResultsItem'

const resultsContent = searchValue => {
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [firstTime, setFirstTime] = useState(true)

  if(firstTime) {
    Torrent.getData(searchValue)
    setFirstTime(false)
  }

  // The component
  const Content = props => {
    const addData = (arg) => {
      setData(data => (
        data.concat(arg)
      ))
    }

    const onTorrentRequest = (event, arg) => {
      addData(arg)
      setLoaded(true)
    }

    useEffect(() => {
      ipcRenderer.on('torrent:response', onTorrentRequest)
      return () => {
        ipcRenderer.removeListener('torrent:response', onTorrentRequest)
      }
    }, [])

    return (
      <>
        {loaded === true ? (
          <div className='results-items'>
            {data.map((torrent, i) =>
              <ResultsItem torrent={torrent} searchValue={searchValue} key={i} />
            )}
            {data.length === 0 ? (<h1>{'No Results, maybe try other providers.'}</h1>) : null}
          </div>
        ) : <h1>Loading</h1>}
      </>
    )
  }
  return Content
}

export default resultsContent
