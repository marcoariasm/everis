import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { size } from 'global/styles/Responsive'

import Line from 'modules/shared/components/Line'

export const StyleData = styled.div`
  display: grid;
  grid-row-gap: 8px;
  grid-template-rows: auto auto;
  @media only screen and (min-width: ${size.tablet}) {
    grid-row-gap: 14px;
  }
`
const TitleData = styled.span`
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    font-size: 15px;
    line-height: 17px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 16px;
    line-height: 19px;
  }
`
const ValueData = styled.span`
  font-size: 18px;
  line-height: 22px;
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 20px;
    line-height: 24px;
  }
`
function CardData({ title, value, doNotDisplayLine }) {
  return (
    <StyleData>
      <TitleData className="tableBodyTitle">{title}</TitleData>
      <ValueData className="bodyText">{value}</ValueData>
      {!doNotDisplayLine && (
        <MediaQuery maxDeviceWidth={767}>
          <Line />
        </MediaQuery>
      )}
    </StyleData>
  )
}
export default CardData
