import React from 'react'
import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'
import CheckNoRuc from 'shared/images/checkredondo.svg'

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    width: auto;
    align-items: center;
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
  width: 54.36px;
  height: 54.36px;
  padding-top: 35px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    width: 54.36px;
    height: 54.36px;
    width: 85px;
    height: 95px;
    padding-left: 45px;
    padding-top: 0;
  }
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    width: 54.36px;
    height: 54.36px;
    padding-left: 45px;
    padding-top: 0;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    width: 54.36px;
    height: 54.36px;
    padding-left: 65px;
    padding-top: 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    width: 54.36px;
    height: 54.36px;
    padding-left: 97px;
    padding-top: 0;
  }
`
function ContentImage() {
  return (
    <Content>
      <Imagen src={CheckNoRuc} alt="CheckNoRuc" />
    </Content>
  )
}

export default ContentImage
