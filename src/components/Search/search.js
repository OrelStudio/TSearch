import React from 'react'
import { Input, Button } from 'antd'

const SearchButtons = props => {
  return (
    <>
      <Input placeholder='Search...' onPressEnter={props.searchHandler} ref={props.refVar} />
      <Button onClick={props.searchHandler} type='primary'>{'TSearch'}</Button>
    </>
  )
}

export default SearchButtons
