import React from 'react'
import styled from 'styled-components'

import { allColors } from 'global/styles'

const Title = styled.span`
  grid-area: 1 / 2 / 2 / 3;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
  padding-left: 12px;
  color: ${(props) => (props.step > props.index ? allColors.colorGreen : allColors.colorGrayStep)};
`
const StepTitle = ({ children, index, step }, props) => {
  return (
    <Title className="tableBodyTitle" index={index} step={step}>
      {children}
    </Title>
  )
}
export default StepTitle
