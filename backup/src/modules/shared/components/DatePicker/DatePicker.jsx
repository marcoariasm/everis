import React from 'react'
import DatePicker from 'react-datepicker'

import './datePicker.scss'

const DatePick = ({ selected, onChange, onSelect, className, name, value }) => {
  return (
    <>
      <DatePicker
        name={name}
        selected={selected}
        onChange={onChange}
        onSelect={onSelect}
        value={value}
        className={className}></DatePicker>
    </>
  )
}
export default DatePick
