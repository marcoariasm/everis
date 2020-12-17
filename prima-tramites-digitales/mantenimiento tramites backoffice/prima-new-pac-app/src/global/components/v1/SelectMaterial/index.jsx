import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import './style.sass';

const ComboBox = ({
  disabled,
  label,
  error,
  placeholder,
  textError,
  options = [],
  marginRight,
  marginLeft,
  marginTop,
  selected,
  marginBottom,
  onChange,
  name,
  value,
}) => (
  <Wrapper
    className={classnames('componenet-select-option', {
      'disabled-select': disabled,
      'error-select': error,
    })}
    marginRight={marginRight}
    marginLeft={marginLeft}
    marginTop={marginTop}
    marginBottom={marginBottom}
  >
    <select
      className="selectfield"
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      required
      name={name}
    >
      {[{ label: placeholder, value: '' }, ...options].map((item, i) => (
        <option
          hidden={i === 0}
          selected={selected}
          disabled={disabled}
          key={item.value}
          value={item.value}
        >
          {item.label}
        </option>
      ))}
    </select>
    {label && <span className="label">{label}</span>}
    {error ? <div className="error-msg">{textError}</div> : <div className="error-msg" />}
  </Wrapper>
);

export default ComboBox;

const Wrapper = styled.div`
  margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : '0px')};
  margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '0px')};
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '0px')};
`;
