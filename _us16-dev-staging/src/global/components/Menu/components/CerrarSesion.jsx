import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import ExitImage from 'shared/images/exit.svg'

const CerrarSessionStyled = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  margin: 0;
  @media screen and (max-width: ${size.laptopL}) and (orientation: landscape) {
    top: 200px;
  }
  @media screen and (min-width: ${size.laptopL}) {
    bottom: 20px;
    font-size: 14px;
  }
  @media screen and (max-width: ${size.laptopL}) {
    padding-left: 15%;
    bottom: 70px;
  }
  img {
    margin: 0px 30px 0px 0px;
    width: auto;
  }
  p {
    font-family: FS Emeric;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
  }
`

function CerrarSesion() {
  return (
    <CerrarSessionStyled>
      <img src={ExitImage} alt="Cerrar Session" />
      <p>Cerrar sesión</p>
    </CerrarSessionStyled>
  )
}

export default CerrarSesion
