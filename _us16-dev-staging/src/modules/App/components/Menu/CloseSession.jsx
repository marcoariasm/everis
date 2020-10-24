import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import ExitImage from 'shared/images/exit.svg'
import {userActions} from 'redux/actions/User/user.actions';
import {useDispatch} from 'react-redux'

const CerrarSessionStyled = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  padding-left: 35px;
  width: 100%;
  margin: 0;
  img {
    margin: 0px 27px 0px 0px;
    width: auto;
  }
  p {
    font-family: FS Emeric;
    font-size: 16px;
    font-style: normal;
    font-weight: 450;
    line-height: 18px;
  }
  @media screen and (max-width: ${size.laptopL}) and (orientation: landscape) {
    top: 200px;
  }
  @media screen and (min-width: ${size.laptopL}) {
    bottom: 20px;
  }
  @media screen and (max-width: ${size.laptopL}) {
    padding-left: 15%;
    bottom: 100px;
    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 22px;
    }
  }
`

const CloseSession = () => {
  const dispatch = useDispatch();

  const handleCloseSession = () => {
    dispatch(userActions.logout())
  };

  return (
    <a onClick={handleCloseSession} >
      <CerrarSessionStyled >
        <img src={ExitImage} alt="Cerrar Session" />
        <p>Cerrar sesión</p>
      </CerrarSessionStyled>
    </a>
  )
};

export default CloseSession;
