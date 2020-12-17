import React from 'react';
import { Link } from 'react-router-dom';
import Username from '../Menu/Username';
import CloseSession from '../Menu/CloseSession';
import { homePath } from '../../constants';

const LateralMenu = ({ children }) => (
  <nav className="menu">
    <div className="u-wrapper">
      <ul>
        <li>
          <Link to={homePath}>
            <Username />
          </Link>
        </li>
        { children }
        <li>
          <CloseSession />
        </li>
      </ul>
    </div>
  </nav>
);

export default LateralMenu;
