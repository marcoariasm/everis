import React from 'react'
import styled from 'styled-components'

import { allColors } from 'global/styles'

const CircleStyle = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  align-items: initial;
  float: left;
  width: 30px;
  height: 30px;
  background: ${(props) => (props.step > props.index ? allColors.colorGreen : allColors.colorGrayStep)};
  border-radius: 50%;
  color: ${allColors.colorWhiteBase};

  > label {
    margin-top: 5px;
    margin-left: 11px;
    font-family: Calibri;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 19px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${allColors.white};
    transform: rotate(-0.91deg);
  }
`

const Circle = ({ children, index, step }, props) => {
  return (
    <CircleStyle props={props} index={index} step={step}>
      {children}
    </CircleStyle>
  )
}
export default Circle
