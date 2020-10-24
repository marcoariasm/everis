import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { size } from 'shared/styles/Responsive'

import Line from 'shared/components/Line'

const StyleData = styled.div`
  display: grid;
  grid-row-gap: 8px;
  grid-template-rows: 10% 70%;
  @media only screen and (min-width: ${size.tablet}) {
    grid-row-gap: 13px;
  }
`
const TitleData = styled.span`
  font-size: 14px;
  line-height: 15px;
  font-weight: 600;
  @media only screen and (min-width: ${size.tablet}) {
    font-size: 15px;
    line-height: 17px;
  }
`
const ValueData = styled.div`
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
`
function CardDataBeneficiarie({ title, value, doNotDisplayLine }) {
  return (
    <>
      <StyleData>
        <TitleData className="valueFormTitle">{title}</TitleData>
        <ValueData className="bodyText">
          {value}
          {!doNotDisplayLine && (
            <MediaQuery maxDeviceWidth={767}>
              <Line />
            </MediaQuery>
          )}
        </ValueData>
      </StyleData>
    </>
  )
}
export default CardDataBeneficiarie
