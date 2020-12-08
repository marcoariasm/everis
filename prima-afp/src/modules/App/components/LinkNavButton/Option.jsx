import React from 'react'

function Option({ texto }) {
  return (
    <>
      <div className="option-content">
        <div className="text-menu">{texto}</div>
      </div>
    </>
  )
}

export default Option
