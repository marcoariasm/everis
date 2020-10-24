import React from 'react'
import MediaQuery from 'react-responsive'

import { CompletionAdvisory } from 'shared/constant/ConstantCompletionOfAdvisory'

import {
  CardData,
  Content,
  ContentData,
  ContentImageData,
  ContentText,
  Ellipse,
  GridTable,
  ImageData,
  Space,
} from './style'

import TelephoneConsulting from 'shared/images/telephoneConsultingGray.svg'
import GreenEllipse from 'shared/images/greenEllipse.svg'
import Adviser from 'shared/images/adviser.svg'

export const LegalRejaMax100 = ({ email }) => {
  var rows = []
  var rowsT = []
  for (var i = 0; i < 6; i++) {
    rows.push(<img key={i} src={GreenEllipse} alt="" />)
  }
  for (var j = 0; j < 18; j++) {
    rowsT.push(
      <div key={'div' + j}>
        <img key={j} src={GreenEllipse} alt="" />
      </div>
    )
  }
  return (
    <Content>
      <ContentText>
        <span className="bodyText">
          <span>{CompletionAdvisory.dataLegalRejaMax100}</span>
          {email}
          {CompletionAdvisory.dataLegalRejaMax1002}
          <strong>{CompletionAdvisory.dataLegalRejaMax1003}</strong>
          {CompletionAdvisory.dataLegalRejaMax1004}
        </span>
      </ContentText>
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
            <img src={TelephoneConsulting} alt="Adviser" />
          </ImageData>
        </ContentImageData>
        <ContentData>
          <CardData className="informativeBodyTitleGreenSmall">Asesoría virtual</CardData>
          <Space></Space>
          <CardData className="cardTitle">Asesoría telefónica</CardData>
        </ContentData>
      </GridTable>
    </Content>
  )
}
