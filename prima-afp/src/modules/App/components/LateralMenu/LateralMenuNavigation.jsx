import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { includes } from 'ramda';
import PropTypes from 'prop-types';
import LinkNavButton from '../LinkNavButton/LinkNavButton';
import { Wrapper } from './style';

const RouteLateralMenu = ({ navItems = [], path = '' }) => {
	const location = useLocation();
	const isCurrentPath = () => includes(path, location.pathname);

	const NavItems = navItems.map((item, index) => <LinkNavButton {...item} key={index} />);

	const getNavigator = () => (
		<nav id='main-menu' className='menu'>
			<Wrapper className='u-wrapper'>
				<div className='menu-items'>{NavItems}</div>
			</Wrapper>
		</nav>
	);

	return isCurrentPath() ? getNavigator() : null;
};

RouteLateralMenu.propTypes = {
	navItems: PropTypes.array,
	path: PropTypes.string,
};

export default withRouter(RouteLateralMenu);
