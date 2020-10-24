import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

const Style = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  align-items: flex-end;
  margin-top: 20px;
  & > hr {
    height: 5px;
    border-radius: 9px;
    background: ${(props) => (props.step > props.index ? allColors.colorGreen : allColors.colorGrayStep)};
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
  @media only screen and (min-width: ${size.tablet}) {
    margin-top: 10px;
  }
`

const StyleLine = ({ index, step }) => {
  return (
    <Style index={index} step={step}>
      <hr></hr>
    </Style>
  )
}
export default StyleLine
