import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 0 5px;
`

const ContentInfoValidate = styled.div`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 33px;
  padding: 25px 0;
  border-radius: 7px;
  color: ${allColors.colorGrayText};
  background-color: ${allColors.colorGrayCard};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 32px;
    line-height: 35px;
  }
`

function CardInformationGray({ text }) {
  return (
    <Content>
      <ContentInfoValidate>{text}</ContentInfoValidate>
    </Content>
  )
}

export default CardInformationGray
