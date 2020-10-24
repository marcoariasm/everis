import React from 'react'
import styled from 'styled-components'

import { allColors } from 'shared/styles/index'
import { size } from 'shared/styles/Responsive'

import ButtonFileUpload from 'global/components/Button/ButtonFileUpload/ButtonFileUpload'

const Text = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  color: ${allColors.colorRedError};
`
const ContainerText = styled.div`
  font-weight: bold;
  text-align: center;
  margin-top: 26px;
  margin-bottom: 20px;
`
const TextError = styled.span`
  display: inline-block;
  text-align: center;
  @media only screen and (min-width: ${size.laptop}) {
    width: 442px;
  }
`
const ContentButton = styled.div`
  margin-bottom: 5px;
  text-align: center;
`

const CardErrorFile = ({ title, textError }) => {
  return (
    <>
      <Text className="statementTableBody">{title}</Text>
      <ContainerText className="bodyText">
        <TextError className="bodyText">{textError}</TextError>
      </ContainerText>
      <ContentButton>
        <ButtonFileUpload />
      </ContentButton>
    </>
  )
}

export default CardErrorFile
