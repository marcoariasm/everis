import React from 'react'

import './RadioButton.sass'
function RadioButton({ checked, onChange, name, id, label, type, value }) {
  return (
    <>
      <label className={type === 'normal' ? 'radioN' : type === 'radioG' ? 'radioG' : 'radio'} htmlFor={id}>
        <input type="radio" checked={checked} onChange={onChange} name={name} id={id} value={value} />
        <span></span>
        {label}
      </label>
    </>
  )
}

export default RadioButton
