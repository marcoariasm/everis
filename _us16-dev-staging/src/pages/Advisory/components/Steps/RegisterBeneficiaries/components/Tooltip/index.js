import React, { useState } from 'react'
import styled from 'styled-components'

import { allColors } from 'shared/styles/index'

const TooltipDiv = styled.div`
  position: absolute;
  cursor: pointer;
  top: -380px;
  left: 250px;
  background: ${allColors.colorGrayText};
  justify-content: center;
  visibility: hidden;
  padding: 5px;
  border-radius: 5px;
  width: 60%;
  @media (max-width: 740px) {
    margin-top: 0;
    margin-left: -28%;
  }
  @media (max-width: 414px) {
    margin-top: -20%;
    margin-left: -60%;
    width: 100%;
  }
  @media (max-width: 360px) {
    margin-left: -88%;
    margin-top: -44%;
      width: 100%;
  }
`

const Tooltiptext = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 16px;
  z-index: 500;
  padding: 30px 20px;
  border-radius: 8px;
  color: white;
`
const HelpIcon = styled.div`
  width: 20px;
  cursor: pointer;
  margin-left: 5px;
`

const Arrow = styled.div`
  position: absolute;
  top: 100%;
  left: 25%;
  border-width: 15px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.7) transparent transparent;
  @media (max-width: 740px) {
    left: 75%;
  }
  @media (max-width: 360px) {
    left: 88%;
  }
`

function Tooltip({ children }) {
  const [show, setShow] = useState(false)

  return (
    <>
      <TooltipDiv style={show ? { visibility: 'visible' } : {}}>
        <Tooltiptext>
          <h1 className="cardTitleLarge2">¿Por qué te preguntamos esto?</h1>
          <span className="tableBodyText2">
            Para que cuando realices la <b>Etapa 2</b> del trámite, tengas a la mano los siguientes documentos:
          </span>
          <span className="tableBodyText2">
            <b>Si eres pensionista en el SNP:</b> la Resolución ONP y la última boleta de pago de pensión.
          </span>
          <span className="tableBodyText2">
            <b>Si eres pensionista en otra AFP:</b> la constancia emitida por dicha AFP que acredite esta condición.
          </span>
          <span className="tableBodyText2">
            Estos documentos sustentarán que ya cuentas con atención médica en EsSalud, por lo que ya no será necesario
            que transfiramos el 4.5% de tu fondo a dicha entidad.
          </span>
        </Tooltiptext>
        <Arrow className="tooltip-arrow" />
      </TooltipDiv>
      <HelpIcon onClick={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </HelpIcon>
    </>
  )
}

export default Tooltip
