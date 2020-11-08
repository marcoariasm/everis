import React from 'react'
import { allColors } from 'global/styles'
import styled from 'styled-components'

const Input = ({
  id,
  label,
  onChange,
  placeholder = '',
  disabled,
  type,
  value,
  size = false,
  block = false,
  icon,
  name,
  color,
  min,
  max,
  onkeypress,
  onClick,
  autoFocus,
  maxLength=null
}) => {

    return (
      <Wrapper size={size ? `${size}px` : ''} block={block}>
        {label && <Label block={block}>{label}</Label>}
        <Text block={block} label={label}>
          <InputText
            id={id}
            className="bodyText"
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            icon={icon}
            name={name}
            color={color}
            min={min}
            max={max}
            onkeypress={onkeypress}
            onClick={onClick}
            autoFocus={autoFocus}
            maxLength={maxLength}
          />
          {icon && <Icon icon={icon} src={icon} />}
        </Text>
      </Wrapper>
    )
  }

export default Input

const Wrapper = styled.div`
  display: ${(props) => (props.block ? 'block' : 'flex')};
  justify-content: space-between;
  align-items: center;
  width: ${(props) => (props.size ? props.size : '100%')};
  height: ${(props) => (props.block ? '75px' : '45px')};
  padding: 0;
`

const Label = styled.label`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  padding-top: ${(props) => (props.block ? '7px' : '0px')};
  padding-bottom: ${(props) => (props.block ? '7px' : '0px')};
  color: ${allColors.colorRedError};
  opacity: 0.8;
  &::after {
    content: ' :';
  }
`

const Text = styled.div`
  position: relative;
  width: ${(props) => (props.block || !props.label ? '100%' : '60%')};
`

const InputText = styled.input`
  -webkit-appearance: none;
  display: flex;
  font-size: 18px;
  line-height: 22px;
  position: relative;
  width: ${({ width }) => width || '97%'};
  padding: ${(props) => (props.icon ? '7px 30px 7px 15px' : '7px 15px')};
  border-radius: 3px;
  border: ${(props) => props.color};
  outline: none;
  background-color: ${allColors.colorGrayComponents};
  color: ${allColors.colorGrayText};
  ::-webkit-input-placeholder {
    font-family: Calibri;
    font-style: normal;
    font-weight: normal;
    font-size: 16px !important;
    line-height: 20px !important;
    color: ${allColors.colorPlaceholder};
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-calendar-picker-indicator {
    display: block;
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
  }
`

const Icon = styled.img`
  position: absolute;
  right: 6px;
  top: 6px;
  width: 20px;
  height: 20px;
`
