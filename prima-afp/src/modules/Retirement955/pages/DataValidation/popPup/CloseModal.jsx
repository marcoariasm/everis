import React from 'react'
import styled from 'styled-components'
import { size } from 'global/styles/Responsive'

const Content = styled.div`
  padding-left: 95%;
  & img {
    width: 12px;
    height: 12px;
    cursor: pointer;
  }
  @media only screen and (min-width: ${size.tablet}) {
    padding-top: 3%;
    & img {
      width: 20px;
      height: 20px;
    }
  }
`
const CloseModal = ({ children }) => {
  return <Content>{children}</Content>
}
export default CloseModal
