import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import ButtonFileUpload from 'global/components/Button/ButtonFileUpload/ButtonFileUpload'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`
const Subtitle = styled.div`
  margin-top: 18px;
  margin-bottom: 50px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-top: 5px;
    margin-bottom: 20px;
  }
`
const ContentButton = styled.div`
  margin-top: 15px;
`

const CardAddFile = ({ title, subtitle, textDragDrop }) => {
  return (
    <Content>
      <h1 className="cardTitleLarge">{title}</h1>
      <Subtitle className="informationFooterText">{subtitle}</Subtitle>
      <div className="informationFooterText">{textDragDrop}</div>
      <ContentButton>
        <ButtonFileUpload />
      </ContentButton>
    </Content>
  )
}

export default CardAddFile
