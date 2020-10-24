import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { CompletionAdvisory } from 'shared/constant/ConstantCompletionOfAdvisory'

import Validacion from 'shared/images/validacion.svg'
import CardInformationGray from './CardInformationGray'

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
  align-self: center;
  & > img {
    width: 69px;
    height: 69px;
  }
`
const TPrincipal = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
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
  padding-right: 52px;
  padding-top: 22px;
`

function RejaMin100k({ ruc }) {
  return (
    <CardInformationGray>
      <Content>
        <ContentImage>
          <img src={Validacion} alt="Validacion" />
        </ContentImage>
        <TPrincipal className="titleGreen">
          {ruc === true && (
            <ContentInfoValidate className="text">{CompletionAdvisory.dataRejaConRuc}</ContentInfoValidate>
          )}
          {ruc === false && (
            <ContentInfoValidate className="text">{CompletionAdvisory.dataRejaSinRuc}</ContentInfoValidate>
          )}
        </TPrincipal>
      </Content>
    </CardInformationGray>
  )
}

export default RejaMin100k
