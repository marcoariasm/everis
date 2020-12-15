import React from 'react';
import './menu.sass';
import PrimaLogo from 'shared/images/iconos/logoprima.svg';
import { Link } from 'react-router-dom';
import CloseSession from './CloseSession';
import SessionInfo from './SessionInfo';

const LateralMenu = ({ children }) => (
  <nav id="main-menu" className="menu">
    <div className="logo-container">
      <Link to="/inicio">
        <img src={PrimaLogo} alt="Prima AFP - Grupo Crédito" />
      </Link>
    </div>
    <SessionInfo />
    { children }
    <CloseSession />
  </nav>
);

export default LateralMenu;
