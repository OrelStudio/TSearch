import React from 'react'
import Select from 'react-select'

const SelectProviders = props => {
  return (
    <Select
      placeholder={'Select providers'}
      value={props.value}
      onChange={props.onChange}
      options={props.options}
      className={'select'}
      isMulti
    />
  )
}

export default SelectProviders
