import React from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

const Content = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-row-gap: 24px;
  margin-top: 83px;
  margin-left: 20px;
  margin-right: 20px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    margin-top: 103px;
    margin-left: 36px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin-top: 30px;
    margin-left: 103px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin-top: 3%;
    margin-left: 9%;
  }
`
const ContentStep = ({ children }) => {
  return <Content>{children}</Content>
}
export default ContentStep
