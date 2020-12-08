import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { textAlternatives } from 'modules/Retirement955/constants/ConstantAlternatives'

import PopPup from '../PopPup'
import { BoldText, ContainerText, EndText, EndTextClose, Line, PopUpLink } from './style'

export const Footer = () => {
  const [showModalValidation, setShowModalValidation] = useState(false)
  const handleShowModalValidation = () => {
    setShowModalValidation(true)
  }

  const handleCloseModalValidation = () => {
    setShowModalValidation(false)
  }
  return (
    <>
      <ContainerText>
        <Line />
        <EndText className="informationFooterText">
          <BoldText>Los montos de pensión resultantes son una estimación. </BoldText>
          {textAlternatives.textFinal1}
          <PopUpLink onClick={handleShowModalValidation}> supuestos</PopUpLink>
          {textAlternatives.textFinal7}
        </EndText>
        <EndTextClose className="informationFooterText">
          <BoldText>Estas cifras no comprometen de modo alguno a la AFP ni a la empresa de seguros</BoldText>
          {textAlternatives.textFinal22}
        </EndTextClose>
        <EndTextClose className="informationFooterText">
          <BoldText>El Bono será pagado por la ONP</BoldText>
          {textAlternatives.textFinal10}
        </EndTextClose>
      </ContainerText>
      {ReactDOM.createPortal(
        <PopPup
          widthB="170px"
          heightB="45px"
          justifyContent="center"
          nameButton="Entendido"
          hideButtonCancel={true}
          show={showModalValidation}
          onClose={handleCloseModalValidation}
        />,
        document.getElementById('modal')
      )}
    </>
  )
}
