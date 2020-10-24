import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import CheckNoRuc from 'shared/images/checkredondo.svg'

const Content = styled.div`
  display: grid;
  justify-content: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    grid-template-columns: 20% 80%;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    grid-template-columns: 30% 70%;
  }
`
const ContentImage = styled.div`
  text-align: center;
  & > img {
    width: 69px;
    height: 69px;
  }
`
const TPrincipal = styled.div`
  text-align: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    text-align: left;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 20px;
    line-height: 22px;
    text-align: left;
  }
`
const ContentInfoValidate = styled.div`
  font-size: 18px;
  line-height: 20px;
  text-align: left;
  padding-top: 22px;
`

function CardInformationGray({ title, text, handleReload }) {
  const handleClick = () => {
    handleReload(null)
  }
  return (
    <Content>
      <ContentImage>
        <img src={CheckNoRuc} alt="CheckNoRuc" />
      </ContentImage>
      <TPrincipal className="tableHeaderTitle">
        {title}
        <ContentInfoValidate className="bodyText">{text}</ContentInfoValidate>
      </TPrincipal>
    </Content>
  )
}

export default CardInformationGray
