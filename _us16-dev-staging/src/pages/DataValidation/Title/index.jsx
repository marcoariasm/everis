import React from 'react'

import { textDataValidation } from 'shared/constant/ConstantDataValidation'

import { ContainerText, TextSubtitle, TextTitle } from './style'

export const Title = () => {
  return (
    <ContainerText>
      <TextTitle className="informativeTitle">{textDataValidation.title}</TextTitle>
      <TextSubtitle className="bodyText">{textDataValidation.subtitle}</TextSubtitle>
    </ContainerText>
  )
}
