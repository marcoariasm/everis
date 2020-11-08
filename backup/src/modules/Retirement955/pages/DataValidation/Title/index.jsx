import React from 'react'

import { textDataValidation } from 'modules/Retirement955/constants/ConstantDataValidation'

import { ContainerText, TextSubtitle, TextTitle } from './style'

export const Title = () => {
  return (
    <ContainerText>
      <TextTitle className="informativeTitle">{textDataValidation.title}</TextTitle>
      <TextSubtitle className="bodyText">{textDataValidation.subtitle}</TextSubtitle>
    </ContainerText>
  )
}
