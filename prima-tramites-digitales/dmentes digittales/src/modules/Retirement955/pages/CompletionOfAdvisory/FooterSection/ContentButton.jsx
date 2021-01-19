import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from 'global/components/v1/Button/ButtonLink/Button'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-top: 40px;
`
function ContentButton() {
  return (
    <Content>
      <Link to={'/inicio'}>
      <Button
        classButton="btn-pagina-principal"
        widthB="20px"
        heightB="11.5px"
      >
        Volver pantalla principal
      </Button>
      </Link>
      
    </Content>
  )
}

export default ContentButton
