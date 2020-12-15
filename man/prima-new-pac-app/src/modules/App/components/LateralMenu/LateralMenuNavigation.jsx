import { includes, map, prop, is, isNil } from 'ramda';
import { useLocation, withRouter } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import menuTop from 'modules/App/assets/images/menu-top.svg';
import menuBottom from 'modules/App/assets/images/menu-bottom.svg';
import LinkNavButton from '../LinkNavButton/LinkNavButton';
import homeIcon from '../../assets/images/home.svg';
import homeIconActive from '../../assets/images/home-active.svg';

const HOME_NAVIGATION_ITEM = {
  path: '/inicio',
  text: 'Inicio',
  icon: homeIcon,
  iconActive: homeIconActive,
};

const LateralMenuNavigation = ({ navItems = [], path = '' }) => {
  const navigationItems = is(Function, navItems) ? navItems() : navItems;
  if (isNil(navigationItems)) {
    throw new Error('invalid navigation items');
  }
  const { pathname } = useLocation();
  const isCurrentPath = () => includes(path, pathname || '');

  const getItems = () => (
    <Wrapper className="u-wrapper">
      <div className="menu-items">
        <LinkNavButton
          navigationItem={HOME_NAVIGATION_ITEM}
        />
        {
        map(
          (item) => (
            <LinkNavButton
              navigationItem={item}
              key={prop('path', item)}
            />
          ),
          navigationItems,
        )
      }
      </div>
    </Wrapper>
  );

  return isCurrentPath() ? getItems() : <></>;
};

export default withRouter(LateralMenuNavigation);

const Wrapper = styled.div`
  max-width: 1280px;
  margin: auto;
  padding: 0;
  
  .option-menu.active::before{
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
  
  .option-menu.active::after{
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
`;
