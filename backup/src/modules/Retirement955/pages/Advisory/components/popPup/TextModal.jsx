import React from 'react'
import styled from 'styled-components'

import { allColors } from 'global/styles'
import { size } from 'global/styles/Responsive'

const Content = styled.p`
  display: grid;
  grid-template-rows: 65px 1fr;
  grid-row-gap: 22px;
  font-family: Calibri;
  margin: 30px 140px 0px 43px;
  color: ${allColors.colorGrayText};
  & > span {
    display: block;
    font-size: 18px;
    line-height: 22px;
    font-style: normal;
    font-weight: normal;
    text-align: center;
    color: ${allColors.colorGrayText};
    & > span {
      font-weight: bold;
    }
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin: 30px 140px 0px 43px;
    & span {
      font-size: 20px;
      line-height: 24px;
      text-align: left;
    }
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 30px 140px 0px 43px;
    & span {
      font-size: 20px;
      line-height: 24px;
      text-align: left;
    }
  }
`
const TextModal = ({ children }) => {
  return <Content>{children}</Content>
}
export default TextModal
