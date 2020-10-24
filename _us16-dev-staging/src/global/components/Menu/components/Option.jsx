import React from 'react'
import classNames from 'classnames'

function Option({ texto, icon, isActive }) {
  return (
    <>
      <div className="option-content">
        <div className="icon" style={{ backgroundImage: 'url(' + icon + ')' }} />
        <div className="text-menu" className={classNames({ active: isActive })}>{texto}</div>
      </div>
    </>
  )
}

export default Option
