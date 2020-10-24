import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  padding: 25px;
  @media only screen and (min-width: ${size.tablet}) {
    padding: 50px 30px 25px 0px;
  }
`
