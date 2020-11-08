import React from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

const StyleData = styled.div`
  text-align: left;
  @media only screen and (min-width: ${size.tablet}) {
    text-align: center;
  }
`
const TitleData = styled.div`
  letter-spacing: 2%;
  padding-bottom: 10px;
  text-align: left;
  @media only screen and (min-width: ${size.tablet}) {
    text-align: center;
    padding-top: 10px;
  }
`
function CardData({ title, text, colorTitle }) {
  return (
    <StyleData>
      <TitleData className={colorTitle === 'Green' ? 'informativeBodyTitleGreen' : 'cardTitleLarge'}>{title}</TitleData>
      <span className="tableBodyText">{text}</span>
    </StyleData>
  )
}
export default CardData
