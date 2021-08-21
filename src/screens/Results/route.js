import React from 'react'
import { Redirect, useParams } from 'react-router-dom'

const SearchRoute = props => {
  const { value } = useParams()

  return <Redirect to={`/search/${value}`}></Redirect>
}

export default SearchRoute
