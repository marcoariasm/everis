import React from 'react'
import styled from 'styled-components'
import CheckSolo from 'shared/images/checksolo.svg'

import './checkbox.sass'
import classNames from 'classnames'

const CheckBox = ({
  id = '',
  label = null,
  name = '',
  width = null,
  radius = false,
  onChange,
  checked,
  className = '',
  underline,
  disabled,
}) => {
  const idBox = id || Math.floor(Math.random() * 1000000000)
  let styles = {}

  if (label === ' ' || label === null) {
    label = 'checkbox-' + idBox
  } else {
    styles.width = 350
  }

  if (width !== null) {
    styles.width = width
  }

  return (
    <DivContainer className={`checkbox-container ${className}`}>
      <div className={classNames('box', { radius: radius })} style={styles}>
        <input id={idBox} type="checkbox" name={name} checked={checked} disabled={disabled} onChange={onChange} />
        <span className="check" />
        <label
          className={classNames({
            'no-label': label === 'checkbox-' + idBox,
            uderline: underline,
          })}
          htmlFor={idBox}
        >
          {label}
        </label>
      </div>
    </DivContainer>
  )
}

export default CheckBox

const DivContainer = styled.div`
  span.check:after {
    background-image: url(${CheckSolo});
    background-repeat: no-repeat;
  }
`
