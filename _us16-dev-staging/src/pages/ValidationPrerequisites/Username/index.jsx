import React from 'react'

import { toCamelCase } from 'shared/helpers/HelperForm'

import { Content, IntroSection, UserNameText } from './style'

export const Username = ({ user, text }) => {
  return (
    <Content>
      <UserNameText className="informativeTitle">¡Hola {toCamelCase(user)}!</UserNameText>
      <IntroSection className="bodyText">{text}</IntroSection>
    </Content>
  )
}
