import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import { textDataValidation } from 'shared/constant/ConstantDataValidation'

const ContainerText = styled.div`
  margin-top: 37px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    margin-top: 15px;
  }
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopM}) {
    margin-top: 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin-top: 30px;
  }
`
const Title = styled.span`
  display: block;
  text-align: center;
  padding-bottom: 20px;
  @media only screen and (min-width: ${size.tablet}) {
    padding-bottom: 25px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 26px;
    line-height: 29px;
  }
`
const BodyText = styled.span`
  display: block;
  text-align: left;
  padding: 0 5px 37px 0px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    padding: 0 0 40px 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 20px;
    line-height: 24px;
  }
`
function ContentText() {
  return (
    <>
      <ContainerText>
        <Title className="informativeTitle">{textDataValidation.title}</Title>
        <BodyText className="bodyText">{textDataValidation.subtitle}</BodyText>
      </ContainerText>
    </>
  )
}
export default ContentText
