import styled from 'styled-components'
import { size } from 'shared/styles/Responsive'

export const ContentImage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: flex-start;
  padding: 30px;
  @media only screen and (min-width: ${size.tablet}) {
    padding: 50px 30px;
  }
`
