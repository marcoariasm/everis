import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 20px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    padding: 50px 30px 35px 30px;
  }
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopL}) {
    padding: 60px 45px 25px 35px !important;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    padding: 68px 70px 65px 30px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    padding: 78px 110px 85px 50px;
  }
`
export const TextoPrincipal = styled.p`
  width: 100%;
  margin: 0px 0px 30px;
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 22px;
    line-height: 24px;
    margin: 0px 0px 50px;
  }
`
