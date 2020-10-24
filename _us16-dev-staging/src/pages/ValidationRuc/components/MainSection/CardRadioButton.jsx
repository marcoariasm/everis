import React from 'react'
import styled from 'styled-components'

import { allColors } from 'shared/styles/index'

import RadioButton from 'global/components/RadioButton/RadioButton'

const Content = styled.div`
  padding: 25px 20px 25px 20px;
  margin: 0 20px 0 20px;
  & > label {
    font-weight: 500;
    font-size: 18px;
    line-height: 20px;
  }
  & > input[type='radio']:checked {
    color: ${allColors.colorGreen};
  }
`

function CardRadioButton({ id, name, value, label, onChange, type }) {
  return (
    <Content>
      <RadioButton id={id} name={name} value={value} label={label} onChange={onChange} type={type} />
    </Content>
  )
}

export default CardRadioButton
