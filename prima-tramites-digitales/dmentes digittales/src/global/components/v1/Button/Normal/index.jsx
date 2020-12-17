import React from 'react';

import './Button.sass';

const Button = (
  {
    className = null,
    children,
    disabled,
    onClick,
    rightIcon = null,
    leftIcon = null,
    customStyle = {},
    id
  }) => {

  let styles = {};

  if (rightIcon !== null) {
    styles.backgroundImage = `url(${rightIcon})`;
    className += ' right-icon';
  }

  if (leftIcon !== null) {
    styles.backgroundImage = `url(${leftIcon})`;
    className += ' left-icon';
  }

  styles = { ...styles, ...customStyle };

  return (
    <>
      <button
        id={id}
        style={styles}
        className={'button ' + (className || '')}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
