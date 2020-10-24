import React from 'react'
import { Link } from 'react-router-dom'

import { Content, TFinal } from './style'
import Button from 'global/components/Button/ButtonNormal/Button'

export const Footer = ({ gender }) => {
  return (
    <>
      <TFinal className="bodyText">
        Si estás {gender === 'MALE' ? 'listo' : 'lista'}, ¡Empecemos con el trámite!
      </TFinal>
      <Content>
        <Link to="/proceso95-5/dataValidation">
          <Button classButton="btn-pagina-principal" widthB="152px" heightB="45px">
            Empezar
          </Button>
        </Link>
      </Content>
    </>
  )
}
