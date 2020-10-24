import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

export const ContainerText = styled.div`
  width: auto;
  text-align: center;
  margin: 30px 0 32px;
  @media only screen and (min-width: ${size.tablet}) {
    margin: 25px 10px 40px 10px;
  }
`
