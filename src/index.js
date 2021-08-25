'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
// import {hot} from 'react-hot-loader/root'
import store from './store'
import { HashRouter, Switch, Route } from 'react-router-dom'

import App from './screens/App'
import Results from './screens/Results'
import SearchRoute from './screens/Results/route'
import TorrentPage from './screens/Torrent'

import SideBar from './components/SideBar'
import Credit from './components/Credit'

// const ComputedApp = String(process.env['ENV_TYPE']).startsWith('dev') ? hot(App) : App

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <SideBar />
      <Switch>
          <Route path='/' exact component={App}></Route>
          <Route path='/search/:value' exact component={Results}></Route>
          <Route path='/search/route/:value' component={SearchRoute}></Route>
          <Route path='/torrent/:searchValue' component={TorrentPage}></Route>
      </Switch>
      <Credit>{'Made by Orel Shriki'}</Credit>
    </HashRouter>
  </Provider>
), document.getElementById('app-root'))
