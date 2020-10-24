import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const StyleData = styled.div`
  text-align: left;
  @media only screen and (min-width: ${size.tablet}) {
    text-align: center;
  }
`
const TitleData = styled.div`
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 2%;
  padding-bottom: 10px;
  text-align: left;
  @media only screen and (min-width: ${size.tablet}) {
    text-align: center;
    padding-top: 10px;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    font-size: 18px;
    line-height: 20px;
  }
`
const TextData = styled.div`
  font-size: 16px;
  line-height: 20px;
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 18px;
    line-height: 22px;
  }
`
function CardData({ title, text, colorTitle }) {
  return (
    <StyleData>
      <TitleData className={`title${colorTitle}`}>{title}</TitleData>
      <TextData className="text">{text}</TextData>
    </StyleData>
  )
}
export default CardData
