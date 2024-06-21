'use strict'

// import Store from 'store'
import {takeLatest, takeEvery, take, put, call, all, race, delay} from 'redux-saga/effects'

import {login, auth, getOrganizationConnectivity, setNewPassword, heartbeat} from '../../api/login'

const Store = {
  get: () => '',
  set: () => {},
  remove: () => {}
}

import {INITIALIZE} from '../actions/app'
import {
  REQUEST_ORGANIZATION,
  REQUEST_LOGIN,
  REQUEST_LOGOUT,
  REQUEST_AUTH,
  REQUEST_PASSWORD_CHANGE,
  LOGIN,
  LOGOUT,
  // REQUEST_FAILURE,
  requestAuth,
  requestFail,
  requestLogout,
  requestOrganization,
  setOrganization,
  setCurrentData,
  setToken,
  setError,
  setLoading,
  setActionLoading
} from '../actions/login'

export const initializeSaga = function * () {
  const token = Store.get('user-token')
  if (token) {
    yield put(setToken(token))
    try {
      yield put(requestAuth(token))
    } catch (e) {
      yield put(requestFail(e))
    }
  }
}

export const authSaga = function * ({token}) {
  try {
    const response = yield call(auth, token)
    yield put(setCurrentData(response.user, response.token))
    yield put({type: LOGIN})
  } catch (e) {
    Store.remove('user-token')
    yield put(setCurrentData(null, null))
  } finally {
    yield put(setLoading(false))
  }
}

export const heartbeatSaga = function * () {
  try {
    while (true) {
      // calls heartbeat
      yield call(heartbeat)
      // delay before sends again - right now it's 2.5s
      yield delay(25000)
    }
  } catch (e) {
    yield put(requestLogout())
  }
}

export const watchHeartbeatSaga = function * () {
  while (true) {
    yield take(LOGIN)
    yield race([
      call(heartbeatSaga),
      take(LOGOUT)
    ])
  }
}

export const loginSaga = function * ({tenant, token, email, password, remember}) {
  const data = {tenant, token, email, password}
  yield put(setLoading(true))
  try {
    const {user, token} = yield call(login, data)
    if (remember) {
      Store.set('user-token', token)
    }
    yield put(requestOrganization(tenant))
    yield put(setCurrentData(user, token))
    yield put({type: LOGIN})
  } catch (e) {
    yield put(setError(e))
  } finally {
    yield put(setLoading(false))
  }
}

export const logoutSaga = function * () {
  apollo.resetStore()
  Store.remove('user-token')
  yield put(setCurrentData(null, null))
  yield put(setLoading(false))
  yield put({type: LOGOUT})
}

export const organizationSaga = function * ({name}) {
  const org = yield call(getOrganizationConnectivity, name)
  if (org) {
    yield put(setOrganization(org))
  }
}

export const passwordSaga = function * ({password, newPassword}) {
  yield put(setActionLoading(true))
  yield put(setError(null))
  try {
    yield call(setNewPassword, password, newPassword)
  } catch (e) {
    yield put(setError(e))
  } finally {
    yield put(setActionLoading(false))
  }
}

export default function * root () {
  yield all([
    takeLatest(REQUEST_LOGIN, loginSaga),
    takeLatest(REQUEST_LOGOUT, logoutSaga),
    // takeLatest(LOGIN, watchHeartbeatSaga),
    takeLatest(REQUEST_AUTH, authSaga),
    takeLatest(REQUEST_ORGANIZATION, organizationSaga),
    takeLatest(REQUEST_PASSWORD_CHANGE, passwordSaga),
    takeEvery(INITIALIZE, initializeSaga),
    watchHeartbeatSaga()
  ])
}
