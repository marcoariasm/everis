import React from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { size } from 'global/styles/Responsive'

import { textHomeAdvice } from 'modules/Retirement955/constants/ConstantHomeAdvice'

import CardData from 'modules/Retirement955/pages/HomeAdvice/components/MainSection/CardData'

import Message from 'shared/images/message.svg'
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
    grid-template-rows: auto auto;
    margin: auto;
  }
`
const ContentImageData = styled.div`
  display: grid;
  grid-template-rows: 1fr auto 1fr auto 1fr;
  justify-self: center;
  width: 100%;
  .center {
    align-self: center;
  }
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 150px auto 150px 1fr;
    grid-template-rows: 1fr;
  }
`
const ImageData = styled.div`
  align-self: flex-start;
  justify-self: center;
  & > img {
    width: 100%;
    max-width: 80px;
    height: 100%;
    max-height: 80px;
  }
`
const Ellipse = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  padding: 5px 0;
  @media only screen and (min-width: ${size.tablet}) {
    flex-direction: row;
    justify-self: center;
    padding: 0;
  }
`
const ContentData = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-row-gap: 40px;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 200px 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 80px;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    grid-template-columns: 1fr 240px 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 75px;
  }
`

export default function RejaMin100k() {
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
        <ImageData className="center">
          <img src={Message} alt="Message" />
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
        <CardData title={textHomeAdvice.stageOne} text={textHomeAdvice.textReja} colorTitle="Green" />
        <CardData title="Correo de confirmación" text={textHomeAdvice.textCardReja} colorTitle="" />
        <CardData title={textHomeAdvice.stageTwo} text={textHomeAdvice.textCardTwoReja} colorTitle="Green" />
      </ContentData>
    </GridTable>
  )
}
