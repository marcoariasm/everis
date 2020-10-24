import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 20px 40px 20px;
  text-align: left;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    padding: 30px 0 40px 0;
  }
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    padding: 30px 0 40px 0;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    padding: 25px 0 40px 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    padding: 45px 0 40px 0;
  }
`
const TextoAditional = styled.p`
  width: 100%;
`

function ContentTextAditional({ texto }) {
  return (
    <Content>
      <TextoAditional className="bodyText">{texto}</TextoAditional>
    </Content>
  )
}

export default ContentTextAditional
