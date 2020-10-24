import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const TFinal = styled.div`
  text-align: center;
  margin: 40px;
  border-radius: 7.5px;
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopM}) {
    margin: 40px 0 60px 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 40px 0 30px 0;
  }
`
const TextFinal = ({ children }) => {
  return (
    <>
      <TFinal className="bodyText">{children}</TFinal>
    </>
  )
}
export default TextFinal
