import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

import ErrorAcceso from 'shared/images/error.svg'

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    width: auto;
    padding-top: 50px;
    align-items: flex-start;
  }
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    align-items: flex-start;
    padding-top: 65px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    align-items: flex-start;
    padding-top: 68px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    align-items: flex-start;
    padding-top: 78px;
  }
`
const Imagen = styled.img`
  width: 65px;
  height: 80px;
  padding-top: 35px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    width: 85px;
    height: 95px;
    padding-left: 45px;
    padding-top: 0;
  }
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    width: 80px;
    height: 95px;
    padding-left: 45px;
    padding-top: 0;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    width: 100px;
    height: 115px;
    padding-left: 65px;
    padding-top: 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    width: 140px;
    height: 155px;
    padding-left: 85px;
    padding-top: 0;
  }
`
function ContentImage() {
  return (
    <Content>
      <Imagen src={ErrorAcceso} alt="Error" />
    </Content>
  )
}

export default ContentImage
