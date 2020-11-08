import React from 'react'
import styled from 'styled-components'
import { size } from 'global/styles/Responsive'

const Sequency = styled.div`
  display: grid;
  grid-template: 1fr / 41% 41% 41%;
  grid-column-gap: 10px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  @media only screen and (min-width: ${size.laptop}) {
    grid-template: 1fr / 33% 33% 33%;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    grid-template: 1fr / 30% 30% 30%;
  }
`
const BodySequency = ({ children }) => {
  return <Sequency>{children}</Sequency>
}
export default BodySequency
