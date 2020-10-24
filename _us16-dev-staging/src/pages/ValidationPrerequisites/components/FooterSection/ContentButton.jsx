import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import Button from 'global/components/Button/ButtonNormal/Button'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  @media screen and (min-width: ${size.laptopM}) {
    padding-top: 30px;
  }
`
function ContentButton() {
  return (
    <Content>
      <Link to="/proceso95-5/dataValidation">
        <Button classButton="btn-pagina-principal" widthB="152px" heightB="45px">
          Empezar
        </Button>
      </Link>
    </Content>
  )
}

export default ContentButton
