import React from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

const ContainerText = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 30px;
  text-align: center;
  padding: 40px 10px 0px 10px;
`
const Title = styled.span`
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 26px;
    line-height: 29px;
  }
`
const BodyText = styled.span`
  font-size: 18px;
  line-height: 22px;
  text-align: left;
  @media screen and (min-width: ${size.laptopM}) {
    font-size: 20px;
    line-height: 24px;
  }
`
function ContentText() {
  return (
    <>
      <ContainerText>
        <Title className="informativeTitle">Validación de ingresos por cuarta categoría</Title>
        <BodyText className="bodyText">
          Indícanos a continuación si cuentas con RUC como persona independiente:
        </BodyText>
      </ContainerText>
    </>
  )
}
export default ContentText
