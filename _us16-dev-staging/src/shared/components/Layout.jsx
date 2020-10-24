import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles'

import Navbar from 'global/components/Menu/Navbar'

const Menu = styled.div`
  grid-area: menu;
  width: 248px;
  max-height: 100vh;
  background-color: ${allColors.colorOrangeMain};
  @media screen and (max-width: ${size.laptopL}) {
    display: grid;
    justify-items: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 63px;
    z-index: 1;
  }
`
const Content = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background-color: ${allColors.colorGrayCard};
  @media screen and (min-width: ${size.laptopL}) {
    width: calc(100% - 248px);
  }
  @media screen and (max-width: ${size.laptopL}) {
    overflow-x: hidden;
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
`

const Layout = ({ children }) => (
  <Wrapper>
    <Menu>
      <Navbar />
    </Menu>
    <Content>{children}</Content>
  </Wrapper>
)

export default Layout
