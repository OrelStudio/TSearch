'use strict'

import {Map} from 'immutable'

import {
  SET_CURRENT_DATA,
  SET_TOKEN,
  SET_ORGANIZATION,
  SET_LOADING,
  SET_ACTION_LOADING,
  REQUEST_AUTH,
  REQUEST_LOGIN,
  REQUEST_FAILURE,
  SET_ERROR
} from '../actions/login'

const initialState = Map({
  current: null,
  organization: null,
  token: null,
  loading: false,
  actionLoading: false,
  error: null
})

const actionsMap = {
  [SET_CURRENT_DATA]: (state, {user, token}) => {
    return Map(state.withMutations(state => {
      return state.set('current', user).set('token', token)
    }))
  },
  [SET_TOKEN]: (state, {token}) => {
    return state.set('token', token)
  },
  [SET_ORGANIZATION]: (state, {organization}) => {
    localStorage.setItem('organization', JSON.stringify(organization))
    return state.set('organization', organization)
  },
  [SET_LOADING]: (state, {flag = !state.get('loading')}) => {
    return state.set('loading', flag)
  },
  [SET_ACTION_LOADING]: (state, {flag = !state.get('actionLoading')}) => {
    return state.set('actionLoading', flag)
  },
  [REQUEST_AUTH]: (state) => {
    return Map(state.withMutations(state => {
      return state.set('loading', true).set('error', null)
    }))
  },
  [REQUEST_LOGIN]: (state) => {
    return Map(state.withMutations(state => {
      return state.set('loading', true).set('error', null)
    }))
  },
  [REQUEST_FAILURE]: (state) => {
    return state.set('loading', false)
  },
  [SET_ERROR]: (state, {error}) => {
    return state.set('error', error).set('loading', false)
  }
}

export default function reducer (state = initialState, action = {}) {
  const fn = actionsMap[action.type]
  return fn ? fn(state, action) : state
}
