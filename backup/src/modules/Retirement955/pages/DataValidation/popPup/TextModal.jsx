import React from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

const Content = styled.p`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-row-gap: 14px;
  margin: 30px 20px 0px 20px;
  & > span {
    display: block;
    text-align: left;
    & > span {
      font-weight: bold;
    }
  }
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    margin: 10px 20px 0 20px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 15px 30px 0px 30px;
    & span {
      text-align: left;
    }
  }
`
const TextModal = ({ children }) => {
  return <Content className="bodyText">{children}</Content>
}
export default TextModal
