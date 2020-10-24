import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'

export const ContentTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  text-align: center;
  padding: 15px 0 40px 0;
  @media only screen and (min-width: ${size.tablet}) {
    padding: 15px 0 30px 0;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    padding: 15px 0 40px 0;
  }
`

export const SubTitle = styled.div`
  margin-top: 20px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-top: 40px;
  }
`
