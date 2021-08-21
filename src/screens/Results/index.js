import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Selector from '../../components/Select'
import Search from '../../components/Search'
import Navigation from '../../components/Navigation'
import resultsContent from './results'
import '../../css/results.scss'

const Results = props => {
  const { value } = useParams()
  let Content = resultsContent(value)

  const tabs = [{'path': '/', 'name': 'Home'}]

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
