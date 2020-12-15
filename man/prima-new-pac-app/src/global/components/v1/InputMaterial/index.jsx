import React, { useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import './style.sass';

/**
 * Construct
 *
 * @param {Boolean} error
 * @param {Boolean} disabled
 */

const InputTransform = ({
  error = false,
  disabled = false,
  placeholder = '',
  type = 'text',
  label,
  theme2 = false,
  theme3 = false,
  textError,
  onChange,
  onKeyDown,
  onKeyPress,
  onInput,
  icon,
  name,
  marginRight,
  marginLeft,
  marginTop,
  marginBottom,
  min,
  max,
  id,
  value,
  maxLength,
  minLength,
  pattern,
}) => {
  const [require, setRequire] = useState(true);

  return (
    <Wrapper
      className={classnames('componenet-text-input', {
        'disabled-input': disabled,
        'error-input': error,
        'theme-2': theme2,
        'theme-3': theme3,
        'input-date': type === 'date',
      })}
      marginRight={marginRight}
      marginLeft={marginLeft}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <Input
        id={id}
        type={type}
        disabled={disabled}
        className="textfield"
        placeholder={placeholder}
        required={require}
        onInput={onInput}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyPress={onKeyPress}
        onFocus={() => setRequire(false)}
        onBlur={() => setRequire(true)}
        min={min || '1900-12-31'}
        max={max || '2050-12-31'}
        name={name}
        icon={icon}
        value={value}
        maxLength={maxLength}
        minLength={minLength}
        pattern={`${pattern ? `${pattern}*` : '{}'}`}
      />
      <span className="placeholder">{label}</span>
      {error ? <div className="error-msg">{textError}</div> : <div className="error-msg" />}
    </Wrapper>
  );
};

export default InputTransform;

const Wrapper = styled.div`
  margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : '0px')};
  margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '0px')};
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '0px')};
`;

const Input = styled.input`
  background-image: ${({ icon }) => `url(${icon})`} !important;
  background-position: 96% center !important;
  background-size: 18px 18px !important;
  background-repeat: no-repeat !important;
  padding-right: ${({ icon }) => (icon ? '40px' : '10px')} !important;
`;
