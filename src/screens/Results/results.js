import React, { useEffect, useState, useCallback } from 'react'
import { ipcRenderer } from 'electron'
import useTorrentStore from '../../useTorrentStore'
import ResultsItem from '../../components/ResultsItem'
import ResultSkeleton from '../../components/ResultsItem/ResultSkeleton'

const resultsContent = searchValue => {
  const [data, setData] = useState([])
  const [loaded, setLoaded] = useState(false)

  const getData = useTorrentStore(state => state.getData)

  useEffect(() => {
    getData(searchValue)
  }, [])

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
        ) : (
          <div className='results-items'>
            {[...Array(10)].map((e, i) => {
              return <ResultSkeleton key={i} />
            })}
          </div>
        )}
      </>
    )
  }
  return Content
}

export default resultsContent
