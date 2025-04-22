import React from 'react'
import Selector from '../../components/Select'
import Search from '../../components/Search'
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
