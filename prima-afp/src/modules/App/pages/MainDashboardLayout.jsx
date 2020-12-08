import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

import Navbar from 'modules/App/components/Menu/Navbar'
import {useLocation} from "react-router-dom";
import useUserInfo from '../hooks/useUserInfo'

import ConfirmLeaveModal from '../components/Modals/ConfirmLeaveModal';

const Menu = styled.div`
  grid-area: menu;
  width: 248px;
  max-height: 100vh;
  background-color: var(--orangeColorMain);
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
  background-color: var(--grayColorCard);
  @media screen and (min-width: ${size.laptopL}) {
    width: calc(100% - 248px);
  }
  @media screen and (max-width: ${size.laptopL}) {
    overflow-x: hidden;
  }
`
const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 30px;
  color: var(--orangeColorMain);
`

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
`

let user = null;

export const UserContext = React.createContext(user);

const MainDashboardLayout = ({ children, lateralMenu = {} }) => {
  user = useUserInfo();
  const contentRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    contentRef.current.scrollTop = 0
  }, [pathname])
  
  return (
    <UserContext.Provider value ={user}>
      <Wrapper>
        <Menu>
          <Navbar>
            { lateralMenu }
          </Navbar>
          <ConfirmLeaveModal />
        </Menu>
        <Content ref={contentRef} id="app-main-content">
          {children}
          <Footer>
          <span className="bodyText">
            Navegadores recomendados: Chrome, Edge, Firefox - Copyright 2015 - Prima AFP S.A. Derechos reservados
          </span>
          </Footer>
        </Content>
      </Wrapper>
    </UserContext.Provider>
  )
}

export default MainDashboardLayout
