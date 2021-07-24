'use strict'

export const SET_CURRENT_USER = '@login/SET_CURRENT_USER'
export const SET_TOKEN = '@login/SET_TOKEN'
export const SET_ORGANIZATION = '@login/SET_ORGANIZATION'
export const SET_CURRENT_DATA = '@login/SET_CURRENT_DATA'
export const SET_ERROR = '@login/SET_ERROR'
export const SET_LOADING = '@login/SET_LOADING'
export const SET_ACTION_LOADING = '@login/SET_ACTION_LOADING'
export const LOGIN = '@login/LOGIN'
export const LOGOUT = '@login/LOGOUT'

export const REQUEST_ORGANIZATION = '@login/REQUEST_ORGANIZATION'
export const REQUEST_LOGIN = '@login/REQUEST_LOGIN'
export const REQUEST_LOGOUT = '@login/REQUEST_LOGOUT'
export const REQUEST_PASSWORD_CHANGE = '@login/REQUEST_PASSWORD_CHANGE'
export const REQUEST_AUTH = '@login/REQUEST_AUTH'
export const REQUEST_FAILURE = '@login/REQUEST_FAILURE'

export const setCurrentData = (user, token) => {
  return {
    type: SET_CURRENT_DATA,
    user,
    token
  }
}

export const setToken = (token) => {
  return {
    type: SET_TOKEN,
    token
  }
}

export const setOrganization = (organization) => {
  return {
    type: SET_ORGANIZATION,
    organization
  }
}

export const setError = (error) => {
  return {
    type: SET_ERROR,
    error
  }
}

export const setLoading = (flag) => {
  return {
    type: SET_LOADING,
    flag
  }
}

export const setActionLoading = (flag) => {
  return {
    type: SET_ACTION_LOADING,
    flag
  }
}

export const requestOrganization = (name) => {
  return {
    type: REQUEST_ORGANIZATION,
    name
  }
}

export const requestLogin = (tenant, email, password, remember) => {
  return {
    type: REQUEST_LOGIN,
    tenant,
    email,
    password,
    remember
  }
}

export const requestTokenLogin = (tenant, token, remember) => {
  return {
    type: REQUEST_LOGIN,
    tenant,
    token,
    remember
  }
}

// action for requesting password change
export const requestPasswordChange = (password, newPassword) => {
  return {
    type: REQUEST_PASSWORD_CHANGE,
    password,
    newPassword
  }
}

export const requestLogout = () => {
  return {
    type: REQUEST_LOGOUT
  }
}

export const requestAuth = (token) => {
  return {
    type: REQUEST_AUTH,
    token
  }
}

export const requestFail = (error) => {
  return {
    type: REQUEST_FAILURE,
    error
  }
}
