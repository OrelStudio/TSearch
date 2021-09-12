import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Selector from '../../components/Select'
import Search from '../../components/Search'
import Navigation from '../../components/Navigation'
import resultsContent from './results'
import '../../css/results.scss'
import Torrent from '../../ipcRenderer/torrent.js'

const Results = props => {
  const { value } = useParams()
  let Content = resultsContent(value)

  const tabs = useMemo(() => {
    Torrent.setNavigation([{'path': '/', 'name': 'Home'}, {'path': `/search/route/${value}`, 'name': value}])
    return [{'path': '/', 'name': 'Home'}]
  }, [value])

  return (
    <div className={'results-main'}>
      <Navigation tabs={tabs} current={value} />
      <div className='results-search'>
        <Selector />
        <Search id={'results-input'}/>
      </div>
      <Content />
    </div>
  )
}

export default Results
