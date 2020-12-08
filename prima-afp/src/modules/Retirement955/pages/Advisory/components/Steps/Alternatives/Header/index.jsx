import React from 'react'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import { ContainerText } from './styles'

export const Header = () => {
  return (
    <ContainerText>
      <span className="informativeTitleSmall">{textAlternatives.title}</span>
    </ContainerText>
  )
}
