import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

import Button from 'global/components/v1/Button/ButtonNormal/Button'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  @media screen and (min-width: ${size.tablet}) {
    padding-top: 40px;
  }
`
function ContentButton() {
  return (
    <Content>
      <Link to="/proceso95-5/advisory">
        <Button classButton="btn-pagina-principal" widthB="152px" heightB="45px">
          Iniciar Etapa 1
        </Button>
      </Link>
    </Content>
  )
}

export default ContentButton
