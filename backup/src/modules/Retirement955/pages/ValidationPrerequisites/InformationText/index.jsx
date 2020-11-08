import React from 'react'

import { Content, ContentInfoValidate, ContentInfoValue, TPrincipal } from './style'

export const InformationText = ({ title, text, value }) => {
  return (
    <Content>
      <TPrincipal>
        <span className="informativeBodyTitleGreen">{title}</span>
      </TPrincipal>
      <ContentInfoValidate className="bodyText">{text}</ContentInfoValidate>
      {value ? (
        <ContentInfoValue className="bodyText">
          * Valor UIT: <strong>S/ {value}</strong>
        </ContentInfoValue>
      ) : (
        <div></div>
      )}
    </Content>
  )
}
