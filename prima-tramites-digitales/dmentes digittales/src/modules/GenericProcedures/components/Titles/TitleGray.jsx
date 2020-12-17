import React from 'react'
import styled, { css } from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 30px;
  background-color: ${allColors.colorGrayCard};
  border-radius: 8px;
  padding: 30px 321px 30px 70px;
  ${ hideOnMobile => hideOnMobile && css`
    display: block;
    @media only screen and (max-width: ${size.tablet}) {
      display: none;
    }
  `};
  `
  
const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 31px;
  color: ${allColors.colorGrayText};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 22px;
    line-height: 31px;
  }
`

const Text = styled.div`
  font-family: Calibri;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  padding: 25px 0;
  color: ${allColors.colorGrayText};
  > strong{
    font-weight: bold;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 18px;
    line-height: 24px;
  }
`


const CardTitleGray = ( {user, text, text2, hideOnMobile} ) => {
  return (
    <Content>
      <Title>Hola {user}</Title>
      <Text>
        {text}
        <strong>{text2}</strong>
      </Text>
    </Content>
  )
}

export default CardTitleGray
