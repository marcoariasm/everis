import React from 'react'
import styled from 'styled-components'

import Button from 'global/components/Button/ButtonLink/Button'

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
      <Button
        src="https://www.prima.com.pe/wcm/portal/PrimaAFP/inicio"
        classButton="btn-pagina-principal"
        widthB="20px"
        heightB="11.5px"
      >
        Volver pantalla principal
      </Button>
    </Content>
  )
}

export default ContentButton
