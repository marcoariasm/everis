import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { textAlternatives } from 'shared/constant/ConstantAlternatives'

import PopPup from '../../PopPup/'
import { ContainerText, EndTextClose, Line, PopUpLink } from './style'

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
        <span className="informationFooterText">
          {textAlternatives.textFinal1}
          <PopUpLink onClick={handleShowModalValidation}> supuestos</PopUpLink>
          {textAlternatives.textFinal7}
        </span>
        <EndTextClose className="informationFooterText">{textAlternatives.textFinal2}</EndTextClose>
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
          onClick={handleCloseModalValidation}
        />,
        document.getElementById('modal')
      )}
    </>
  )
}
