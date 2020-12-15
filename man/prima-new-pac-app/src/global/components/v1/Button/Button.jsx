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
    name,
    style,
  },
) => {
  let styles = {};

  if (rightIcon !== null) {
    styles.backgroundImage = `url(${rightIcon})`;
    className += ' right-icon';
  }

  if (leftIcon !== null) {
    styles.backgroundImage = `url(${leftIcon})`;
    className += ' left-icon';
  }

  styles = { ...styles, ...customStyle, ...style };

  return (
    <>
      <button
        style={styles}
        className={`button ${className || ''}`}
        disabled={disabled}
        onClick={onClick}
        name={name}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
