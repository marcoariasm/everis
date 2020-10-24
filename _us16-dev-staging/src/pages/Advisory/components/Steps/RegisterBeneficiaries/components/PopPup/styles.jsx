import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 20px 0px 20px;
`
export const ContentDetails = styled.ul`
  margin-top: 25px;
  > li {
    margin-bottom: 20px;
  }
  > li::before {
    content: '- ';
  }
`
export const Footer = styled.span`
  margin-top: 10px;
`
