import React from 'react'

import { SubTitle, ContentDeclaration, ContainerText, EndTextClose, Line } from './style'
import CheckBox from 'global/components/v2/CheckBoxV2'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'


export const Footer = ({ onChange }) => {
  function getCheckDeclaration(event) {
    onChange(event.target.checked)
  }

  return (
    <>
      <SubTitle className="bodyTextSecundary">{textAlternatives.textFinal8}</SubTitle>
      <ContentDeclaration>
        <CheckBox value="declaration" label={textAlternatives.titleDeclaration} onChange={getCheckDeclaration} />
      </ContentDeclaration>
      <ContainerText> 
        <EndTextClose className="informationFooterText">
          <Line />
          {textAlternatives.textFinal9}
        </EndTextClose>
      </ContainerText>
    </>
  )
}
