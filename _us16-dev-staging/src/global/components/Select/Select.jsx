import React from 'react'
import styled from 'styled-components'

import back from 'shared/images/back.svg'

import { allColors } from 'shared/styles/index'

import './Option.scss'

const Select = ({
  id,
  label,
  onChange,
  options = [],
  placeholder = '',
  disabled,
  type = 'text',
  value,
  size = false,
  block = false,
  name,
  color,
  onClick,
}) => (
  <Wrapper size={size ? `${size}px` : ''} block={block}>
    {label && <Label block={block}>{label}</Label>}
    <Text block={block} label={label}>
      <SelectBox
        id={id}
        className={options[0] ? 'placeholder bodyText' : 'info bodyText'}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        name={name}
        color={color}
        onClick={onClick}
      >
        {options.map((item, i) => (
          <option key={item.value} value={item.value} defaultValue={i === 0}>
            {item.label}
          </option>
        ))}
      </SelectBox>
    </Text>
  </Wrapper>
)

export default Select

const Wrapper = styled.div`
  display: ${(props) => (props.block ? 'block' : 'flex')};
  justify-content: space-between;
  align-items: center;
  width: ${(props) => (props.size ? props.size : '100%')};
  height: ${(props) => (props.block ? '75px' : '45px')};
  padding: 0px 0px;
  position: relative;
`

const Label = styled.label`
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  padding-top: ${(props) => (props.block ? '7px' : '0px')};
  padding-bottom: ${(props) => (props.block ? '7px' : '0px')};
  color: ${allColors.colorGrayText};
  opacity: 0.8;
  &::after {
    content: ' :';
  }
`

const Text = styled.div`
  position: relative;
  width: ${(props) => (props.block || !props.label ? '100%' : '60%')};
`

const SelectBox = styled.select`
  display: flex;
  width: ${({ width }) => width || '97%'};
  padding: 7px 15px;
  border-radius: 3px;
  border: ${(props) => props.color};
  outline: none;
  background-color: ${allColors.colorGrayComponents};
  background-image: url(${back}); /*aquí deberás escribir la ruta de la imagen que utilizarás como flecha del desplegable*/
  margin-right: 20px;
  background-repeat: no-repeat;
  background-position: center right 10px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  ::-webkit-select-placeholder {
    font-family: Calibri;
    font-style: normal;
    font-weight: normal;
    font-size: 16px !important;
    line-height: 20px !important;
    color: ${allColors.colorPlaceholder};
  }
  select::-ms-expand {
    display: none; /*Evita que se muestre la flecha por defecto en versiones de IE*/
  }
`
