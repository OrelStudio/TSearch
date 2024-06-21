import React from 'react'
import { Input, Button } from 'antd'

const SearchButtons = props => {
  return (
    <>
      <Input.Search placeholder='Search...' className='search' onPressEnter={props.searchHandler} onSearch={props.searchHandler} ref={props.refVar} enterButton='Search' size='large' allowClear bordered/>
      {/* <Button onClick={props.searchHandler} type='primary'>{'TSearch'}</Button> */}
    </>
  )
}

export default SearchButtons
