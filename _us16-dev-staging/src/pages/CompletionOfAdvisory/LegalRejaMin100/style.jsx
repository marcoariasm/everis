import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

export const ContentText = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  padding: 0px 17px 45px 17px;
  align-content: center;
  @media only screen and (min-width: ${size.tablet}) {
    padding: 50px 50px 50px 0px;
  }
`
