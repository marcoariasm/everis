import React from 'react'
import styled from 'styled-components'

import { allColors } from 'shared/styles/index'
import { size } from 'shared/styles/Responsive'

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding-bottom: 10px;
  & > a {
    text-align: center;
    cursor: pointer;
    color: ${allColors.colorGreen};
    text-decoration-line: underline;
    text-decoration: underline;
  }
  @media screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    display: block;
    padding-bottom: 25px;
    text-align: center;
    & > a {
      font-size: 16px;
      line-height: 20px;
      padding-left: 10px;
      text-decoration: underline;
    }
  }
  @media only screen and (min-width: ${size.laptopM}) {
    display: block;
    padding-bottom: 25px;
    text-align: center;
    & > a {
      font-size: 18px;
      line-height: 22px;
      padding-left: 10px;
    }
  }
`
const UpdateContent = ({ children }) => {
  return <Content className="bodyTextBold">{children}</Content>
}
export default UpdateContent
