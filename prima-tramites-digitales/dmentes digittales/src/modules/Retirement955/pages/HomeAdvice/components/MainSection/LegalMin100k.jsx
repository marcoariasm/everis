import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { size } from 'global/styles/Responsive'

import { textHomeAdvice } from 'modules/Retirement955/constants/ConstantHomeAdvice'

import CardData from 'modules/Retirement955/pages/HomeAdvice/components/MainSection/CardData'

import GreenEllipse from 'shared/images/greenEllipse.svg'
import Choice from 'shared/images/choice.svg'
import Adviser from 'shared/images/adviser.svg'

const GridTable = styled.div`
  display: grid;
  grid-template-columns: 23% 70%;
  grid-column-gap: 7%;
  margin: 0 5px 40px 5px;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr;
    width: 515px;
    margin: auto;
  }
`
const ContentImageData = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  justify-self: center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`
const ImageData = styled.div`
  align-self: flex-start;
  justify-self: center;
  & > img {
    width: 100%;
    max-width: 70px;
    height: 100%;
    max-height: 70px;
  }
`
const Ellipse = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  @media only screen and (min-width: ${size.tablet}) {
    flex-direction: row;
    justify-self: center;
  }
`
const ContentData = styled.div`
  display: grid;
  grid-template-rows: auto 70px auto;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`
const Space = styled.div``

export default function LegalMin100k() {
  var rows = []
  var rowsT = []
  for (var i = 0; i < 6; i++) {
    rows.push(<img key={i} src={GreenEllipse} alt="" />)
  }
  for (var j = 0; j < 18; j++) {
    rowsT.push(<img key={j} src={GreenEllipse} alt="" />)
  }
  return (
    <GridTable>
      <ContentImageData>
        <ImageData>
          <img src={Adviser} alt="Adviser" />
        </ImageData>
        <MediaQuery maxDeviceWidth={767}>
          <Ellipse>{rows}</Ellipse>
        </MediaQuery>
        <MediaQuery minDeviceWidth={767}>
          <Ellipse>{rowsT}</Ellipse>
        </MediaQuery>
        <ImageData>
          <img src={Choice} alt="Choice" />
        </ImageData>
      </ContentImageData>
      <ContentData>
        <CardData title={textHomeAdvice.stageOne} text={textHomeAdvice.textCardLegal} colorTitle="Green" />
        <Space></Space>
        <CardData title={textHomeAdvice.stageTwo} text={textHomeAdvice.textCardTwoLegal} colorTitle="Green" />
      </ContentData>
    </GridTable>
  )
}
