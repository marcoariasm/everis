import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles'

import HeaderTop from 'modules/App/components/Menu/Header'
import LateralMenu from '../LateralMenu/LateralMenu'

import LogoImage from 'shared/images/logo.svg'
import CloseMenuMini from 'shared/images/close.svg'

import './menu.sass'

const NavBarStyled = styled.div`
  .header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    margin: 0;
    transition: 0.3s background;
    z-index: 2;
    background-color: ${allColors.colorOrangeMain};
  }
  .header-content {
    @media screen and (min-width: ${size.laptopL}) {
      padding: 0;
    }
  }
  .u-wrapper {
    max-width: 1280px;
    margin: auto;
    padding: 0;
  }
  .menu {
    position: absolute;
    opacity: 0;
    left: 0;
    right: 0;
    height: calc(100vh - 30px);
    background-color: ${allColors.colorOrangeMain};
    transition: 0.3s transform, 0.3s opacity;
    will-change: transform;
    @media screen and (max-width: ${size.laptopL}) and (orientation: landscape) {
      overflow-y: scroll;
    }
    @media screen and (min-width: ${size.laptopL}) {
      position: relative;
      opacity: 1;
      height: calc(100vh - 90px);
    }
  }
  ul {
    padding: 0;
    list-style: none;
  }
  a {
    color: white;
    text-decoration: none;
    display: block;
  }
  .menu-checkbox {
    display: none;
    &:checked {
      & ~ .header {
        .menu-open {
          background-image: url(${CloseMenuMini});
          background-size: 25px 25px;
        }
        & .header-logo {
          background-image: url(${LogoImage});
        }
        & .menu {
          transform: translateY(0);
          visibility: visible;
          opacity: 1;
        }
      }
    }
    &:not(:checked) {
      & ~ .header {
        .menu {
          @media (max-width: ${size.laptopL}) {
            transform: translateY(-1500px);
          }
        }
      }
    }
  }
  .optionMenu {
    @media screen and (min-width: ${size.laptopL}) {
      padding-left: 20px;
    }
  }
`

const Navbar = ({ children }) => {
  return (
    <NavBarStyled>
      <input type="checkbox" id="open" className="menu-checkbox" />
      <header className="header">
        <div className="header-content">
          <div className="u-wrapper">
            <HeaderTop />
            <LateralMenu>
              { children }
            </LateralMenu>
          </div>
        </div>
      </header>
    </NavBarStyled>
  )
}
export default Navbar
