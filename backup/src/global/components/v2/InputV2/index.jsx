import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import eyeOpen from './images/eyeOpen.svg';
import eyeClosed from './images/eyeClosed.svg';

import './style.sass'
import { useEffect } from 'react';

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
  ref
}) => {
  //hooks for password controller
  const inputValue = useRef();
  const [infoInput, setInfoInput] = useState(type);
  const [showPassword,setShowPassword] = useState(false);

  const switchPasswordController = () => {
    setShowPassword(!showPassword);
  }

  useEffect(() => {
    if(inputValue.current?.value.length === 0 && showPassword){
      setShowPassword(false);
    }
  }, [inputValue.current?.value])
  
  return (
    <Wrapper
      className={classnames('componenet-text-input', {
        'disabled-input': disabled && !value,
        'disabled-input-with-value': disabled && value,
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
        type={(type != 'password') ? type : (showPassword ? 'text':'password') }
        disabled={disabled}
        className="textfield"
        placeholder={placeholder}
        required
        onChange={onChange}
        onKeyDown={onKeyDown}
        min={min || '1900-12-31'}
        max={max || '2050-12-31'}
        name={name}
        icon={icon}
        value={value}
        infoInput={infoInput}
        ref={inputValue}
        inputValue={inputValue}
      />

      {
        (infoInput === 'password' && inputValue.current?.value.length > 0 && disabled === false) && 
        <PasswordController src={showPassword ? eyeClosed : eyeOpen} onClick={switchPasswordController}/>
      }
      <span className="placeholder">{label}</span>
      {error ? <div className="error-msg">{textError}</div> : <div className="error-msg" />}
    </Wrapper>
  )
}

export default InputTransform

const PasswordController = styled.img`
  position: absolute;
  height: 1.2rem;
  top: 1.9rem;
  right: 0.8rem;
  cursor:pointer;
`;

const Wrapper = styled.div`
  margin-right: ${({ marginRight }) => (marginRight ? `${marginRight}px` : '0px')};
  margin-left: ${({ marginLeft }) => (marginLeft ? `${marginLeft}px` : '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '0px')};
  margin-top: ${({ marginTop }) => (marginTop ? `${marginTop}px` : '0px')};
`

const Input = styled.input`
  background-image: ${({ icon }) => `url(${icon})`} !important;
  background-position: 96% center !important;
  background-size: 18px 18px !important;
  background-repeat: no-repeat !important;

  ${
    ({infoInput,inputValue}) => (infoInput === 'password' && inputValue.curent?.value.length > 0  ) && `padding:10px 40px 10px 10px !important;` 
  }
`
