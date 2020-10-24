import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const ContainerData = styled.div`
  display: contents;
  @media screen and (min-width: ${size.tablet}) {
    margin-bottom: 25px;
    border-radius: 11px;
  }
`
function ContentData({ children }) {
  return <ContainerData>{children}</ContainerData>
}
export default ContentData
