import React from 'react'
import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'
import styled from 'styled-components'

const Content = styled.div`
  margin-top: 83px;
  margin-left: 20px;
  margin-right: 40px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    margin-top: 103px;
    margin-left: 36px;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    margin-top: 30px;
    margin-left: 103px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin-top: 3%;
    margin-left: 9%;
  }
`

const HeaderTittle = styled.h1`
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${allColors.grayText2};
  margin-bottom: 20px;
  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopM}) {
    margin-bottom: 15px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 18px;
    line-height: 20px;
  }
`
const HeaderText = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  text-align: left;
  font-feature-settings: 'pnum' on, 'lnum' on;
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 18px;
    line-height: 20px;
  }
`
function Header({ title, text }) {
  return (
    <Content>
      <HeaderTittle className="headerTitle">{title}</HeaderTittle>
      <HeaderText className="headerSubTitle">{text}</HeaderText>
    </Content>
  )
}

export default Header
