import React from 'react'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'

import { ContainerText } from './styles'

export const Header = () => {
  return (
    <ContainerText>
      <span className="informativeTitleSmall">{textAlternatives.title}</span>
    </ContainerText>
  )
}
