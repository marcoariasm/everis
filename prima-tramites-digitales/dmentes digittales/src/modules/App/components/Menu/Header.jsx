import React from 'react'
import styled from 'styled-components'
import { size } from 'global/styles/Responsive'

import LogoImage from 'modules/App/assets/images/logo.svg'
import MenuBurger from 'modules/App/assets/images/menusanguche.svg'

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-left: 20px;
  @media screen and (min-width: ${size.laptopL}) {
    margin-top: 31px;
    margin-left: 8%;
    margin-right: 40px;
  }
  .header-logo {
    display: inline-flex;
    width: 100px;
    height: 35px;
    padding: 18px 0px;
    background: url(${LogoImage}) no-repeat center;
    background-size: contain;
    @media screen and (min-width: ${size.laptopL}) {
      display: block;
      padding-top: 20px;
    }
  }
  .menu-open {
    width: 25px;
    height: 25px;
    padding-right: 40px;
    display: inline-flex;
    cursor: pointer;
    background-image: url(${MenuBurger});
    background-size: 25px 25px;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    color: var(--whiteColorBase);
    @media screen and (min-width: ${size.laptopL}) {
      display: none;
    }
  }
`

function Header() {
  return (
    <HeaderTop>
      <a className="header-logo" />
      <label htmlFor="open" className="menu-open"></label>
    </HeaderTop>
  )
}

export default Header
