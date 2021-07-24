'use strict'

import {createSelector} from 'reselect'

// ui
export const isMenuOpen = (state) => state.ui.get('isMenuOpen')
export const isMenuWide = (state) => state.ui.get('isMenuWide')
export const isSearchOpen = (state) => state.ui.get('isSearchOpen')
export const getScroll = (state) => state.ui.get('scroll')
export const isScrollAtTop = createSelector([getScroll], (yScroll) => {
  return yScroll === 0
})

// current user
export const getCurrentUser = (state) => state.login.get('current')
export const getToken = (state) => state.login.get('token')
export const getCurrentOrganization = (state) => state.login.get('organization')
export const isCurrentLoading = (state) => state.login.get('loading')
export const isCurrentActionLoading = (state) => state.login.get('actionLoading')
export const isLoggedIn = createSelector([getCurrentUser, getToken], (current, token) => {
  return !!current && !!token
})
export const getLoginError = (state) => state.login.get('error')

// search
export const getSearchTerm = (state) => state.search.get('term')
export const getSearchAutocompleteResults = (state) => state.search.get('autocompleteResults')
export const getSearchResults = (state) => state.search.get('results')
export const getSearchCount = (state) => state.search.get('count')
export const getSearchTotalCount = (state) => state.search.get('totalCount')
export const hasMoreSearchResults = createSelector([getSearchCount, getSearchTotalCount], (count, total) => total > count)
export const getSearchHistory = (state) => state.search.get('history')
export const getSearchError = (state) => state.search.get('error')
export const isSearchLoading = (state) => state.search.get('loading')
export const isSearchAutocompleting = (state) => state.search.get('autocompleteLoading')

// entities
export const isEntitiesLoading = (state) => state.entities.get('loading')
export const getEntities = (state) => state.entities.get('list')
export const getEntitiesError = (state) => state.entities.get('error')
export const getEntitiesIdentities = (state) => state.entities.get('identities')
export const getEntitiesGroups = (state) => state.entities.get('groups')
export const getEntitiesPrivileged = (state) => state.entities.get('privileged')
export const getEntitiesSubcontactors = (state) => state.entities.get('subcontactors')
export const getEntitiesServices = (state) => state.entities.get('services')
export const getEntitiesOrphaned = (state) => state.entities.get('orphaned')
export const getEntitiesDisabled = (state) => state.entities.get('disabled')
export const getEntitiesInactive = (state) => state.entities.get('inactive')

export const getId = (state, props) => {
  if (props.id) {
    return props.id
  }
  return props.match ? props.match.params.id : null
}

export const getEntity = createSelector([getId, getEntities], (id, entities) => {
  return entities.get(id)
})

// assets
export const isAssetsLoading = (state) => state.assets.get('loading')
export const getAssets = (state) => state.assets.get('list')
export const getAssetsError = (state) => state.assets.get('error')
export const getCurrentAsset = createSelector([getId, getAssets], (id, assets) => assets.get(id))

// policies
export const getPolicies = (state) => state.policies.get('list')
export const getPoliciesError = (state) => state.policies.get('error')
export const isPoliciesLoading = (state) => state.policies.get('loading')

// policies
export const getRoles = (state) => state.roles.get('list')
export const getCurrentRole = createSelector([getId, getRoles], (id, roles) => roles.get(id))
export const getRolesError = (state) => state.roles.get('error')
export const isRolesLoading = (state) => state.roles.get('loading')
