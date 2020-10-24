import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'

export const Content = styled.div`
  flex-direction: column;
  text-align: center;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    flex-direction: row;
  }
`
export const UserNameText = styled.div`
  margin: 40px 0 20px 0;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    margin: 15px 0 20px 0;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin: 25px 0 30px 0;
  }
`
export const IntroSection = styled.p`
  text-align: center;
  margin: 0 30px 30px 30px;
  @media only screen and (min-width: ${size.laptop}) and (max-width: ${size.laptopM}) {
    margin-bottom: 40px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin-bottom: 50px;
  }
`
