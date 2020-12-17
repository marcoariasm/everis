import classNames from 'classnames';
import { prop } from 'ramda';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

const LinkNavButton = ({ navigationItem }) => {
  const { pathname } = useLocation();
  const isCurrentLocation = (navigationItemPath) => pathname.includes(navigationItemPath);
  const isActive = isCurrentLocation(prop('path', navigationItem));
  return (
    <div
      className={classNames('option-menu', { active: isActive })}
    >
      <Link to={navigationItem.path}>
        <Option
          text={navigationItem.text}
          icon={isActive ? navigationItem.icon : navigationItem.iconActive}
        />
      </Link>
    </div>
  );
};

LinkNavButton.propTypes = {
  navigationItem: PropTypes.object,
};

export default LinkNavButton;
