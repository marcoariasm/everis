import React from 'react'

import { Content, TextoAditional } from './style'

export const TextSecundary = ({ text }) => {
  return (
    <Content>
      <TextoAditional className="bodyText">{text}</TextoAditional>
    </Content>
  )
}
