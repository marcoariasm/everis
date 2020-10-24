import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const Text = styled.label`
  text-align: center;
  padding-bottom: 18px;
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopM}) {
    padding-bottom: 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    padding-bottom: 0;
  }
`
const TextFinal = ({ children }) => {
  return <Text className="bodyText">{children}</Text>
}
export default TextFinal
