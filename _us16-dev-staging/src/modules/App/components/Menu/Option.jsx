import React from 'react'

function Option({ texto, icon }) {
  return (
    <>
      <div className="option-content">
        <div className="icon" style={{ backgroundImage: 'url(' + icon + ')' }} />
        <div className="text-menu">{texto}</div>
      </div>
    </>
  )
}

export default Option
