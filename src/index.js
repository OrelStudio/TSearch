'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
// import {hot} from 'react-hot-loader/root'
import store from './store'

import App from './screens/App'

// const ComputedApp = String(process.env['ENV_TYPE']).startsWith('dev') ? hot(App) : App

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app-root'))
