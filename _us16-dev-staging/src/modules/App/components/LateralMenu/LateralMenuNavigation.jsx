import React from 'react'
import { Link, withRouter, useLocation } from 'react-router-dom'
import { includes } from 'ramda';

import styled from 'styled-components'
import classNames from 'classnames'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles'

import Option from 'modules/App/components/Menu/Option'

import menuTop from 'shared/images/menu-top.svg'
import menuBottom from 'shared/images/menu-bottom.svg'
import PropTypes from 'prop-types';

const RouteLateralMenu = ({ navItems = [], path = '' }) => {
  const location = useLocation();
  const isCurrentPath = () => includes(path, location.pathname);

  const NavItems = navItems.map((item, index) => {
    let isActive = true
    return (
      <div className={classNames('option-menu', { active: isActive })} key={index}>
        <Link to={item.path}>
          <Option texto={item.text} icon={isActive ? item.icon : item.iconActive} />
        </Link>
      </div>
    )
  });

  const getNavigator = () => (
    <nav id="main-menu" className="menu">
      <Wrapper className="u-wrapper">
        <div className="menu-items">
          { NavItems }
        </div>
      </Wrapper>
    </nav>
  );

  return isCurrentPath() ? getNavigator() : null;
}

RouteLateralMenu.propTypes = {
  navItems: PropTypes.array,
  path: PropTypes.string
};

export default withRouter(RouteLateralMenu)

const Wrapper = styled.div`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  max-width: 1280px;
  margin: auto;
  padding: 0;

  .text-menu {
    font-family: FS Emeric;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    color: ${allColors.colorWhiteBase};
  }

  .option-menu.active::before {
    content: ' ';
    background-image: url(${menuTop});
    background-size: contain;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: -20px;
    z-index: 100;
  }

  .option-menu.active::after {
    content: ' ';
    background-image: url(${menuBottom});
    background-size: contain;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: -20px;
    z-index: 100;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    .text-menu {
      font-family: FS Emeric;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
      color: ${allColors.colorOrangeMain};
    }
  }
`