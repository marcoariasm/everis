import React from 'react'
import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'

const ContainerCard = styled.div`
  display: grid;
  flex-direction: column;
  grid-column-gap: 30px;
  grid-row-gap: 20px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    grid-template-columns: 1fr 1fr;
    font-size: 20px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 40px;
    font-size: 20px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    grid-template-columns: 1fr 1fr;
    font-size: 22px;
    grid-row-gap: 50px;
  }
`
const ContainerCards = ({ children }) => {
  return (
    <>
      <ContainerCard>{children}</ContainerCard>{' '}
    </>
  )
}
export default ContainerCards
