'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import { HashRouter, Switch, Route } from 'react-router-dom'
// screens
import App from './screens/App'
import Results from './screens/Results'
import History from './screens/History'
import SearchRoute from './screens/Results/route'
import TorrentPage from './screens/Torrent'
// components
import SideBar from './components/SideBar'
import Credit from './components/Credit'

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <SideBar />
      <Switch>
          <Route path='/' exact component={App}></Route>
          <Route path='/search/:value' exact component={Results}></Route>
          <Route path='/search/route/:value' component={SearchRoute}></Route>
          <Route path='/torrent/:searchValue' component={TorrentPage}></Route>
          <Route path={'/history'} component={History}></Route>
      </Switch>
      <Credit>{'Made by Orel Shriki'}</Credit>
    </HashRouter>
  </Provider>
), document.getElementById('app-root'))
