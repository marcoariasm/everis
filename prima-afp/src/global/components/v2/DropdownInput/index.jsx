import React, { useEffect, useState } from 'react';
import { allColors } from 'global/styles/index';
import styled from 'styled-components';
import './styles.scss';
import MaterialSelect from 'global/components/v2/MaterialSelect';
import { size } from 'global/styles/Responsive';

const DropdownContainer = styled.div`
  padding-top: ${props => props.noPadding || '1em'};
  padding-bottom: ${props => props.noPadding || '0.7em'};
  width: ${props => props.percentageWidth || 100}%;
`;

const ErrorContainer = styled.div`
 margin-top: 1em;
  @media screen and (max-width: ${size.tabletM})  {
    position: relative;
  }
`;

export default function DropdownInput({
  containerStyles = {},
  percentageWidth,
  placeholder,
  selectOptions = [],
  onChange,
  noPadding = false,
  selectWidth = '5.5em',
  name = '',
  registerInput,
  registerSelect,
  selectName = '',
  inputType = 'text',
  numericInput = false,
  defaultValueSelect = '',
  defaultValueInput = '',
  className = '',
  onInputValidation,
  resetInputWhenSelectChange = false,
  capitalizeInput = false,
  reset,
  error
}) {
    const [labelColor, setLabelColor] = useState(allColors.colorPlaceholder);
    const [inputColor, setInputColor] = useState(allColors.colorGrayLight);
    const [inputValue, setInputValue] = useState(defaultValueInput);
    const [selectValue, setSelectValue] = useState();

    useEffect(() => {
      if (onChange) onChange(getComponentState());
    }, [inputValue]);

    useEffect(() => {
      if (resetInputWhenSelectChange) resetInput();
      if (onChange) onChange(getComponentState());
    }, [selectValue]);

    useEffect(() => {
      resetInput();
    }, [reset]);

    const resetInput = () => {
      if (!registerInput) return setInputValue('');
      const getElementByName = document.getElementById(`input-dropdown-${name}`);
      const inputValueId = getElementByName?.value ?? null;
      if (inputValueId) getElementByName.value = '';
    }

    const getComponentState = () => ({
        inputValue,
        selectValue,
        target: {
          name,
          value: inputValue,
          type: 'text'
        }
    })

    const handleOnFocus = () => {
        setLabelColor(allColors.colorOrangeMain);
        setInputColor(allColors.colorOrangeMain);
    }

    const handleOnBlur = () => {
        setLabelColor(inputValue ? allColors.colorGrayText : allColors.colorPlaceholder);
        setInputColor(allColors.colorGrayLight);
    }

    const handleChange = (event) => {
      const onlyNumbers =  /^[0-9\b]+$/;
      if (!numericInput) return setInputValue(capitalizeInput ? event.target.value.toUpperCase() : event.target.value);
      if (onlyNumbers.test(Number(event.target.value))) return setInputValue(event.target.value);
    }

    const inputProps = registerInput ? {} : { value: inputValue };
   
  return (
    <DropdownContainer style={containerStyles} noPadding={noPadding} percentageWidth={percentageWidth}>
        <div style={{ borderColor: inputColor }} className={`group ${className}`}>    
           <MaterialSelect
             fontFamily={'FS Emeric'}
             register={registerSelect}
             onChange={setSelectValue}
             initialValue={defaultValueSelect}
             selectOptions={selectOptions}
             selectWidth={selectWidth}
             optionsContainerStyles={{ marginTop: '50px' }}
             name={selectName}
            />  
            <input
              id={`input-dropdown-${name}`}
              className={`dropdown-input ${capitalizeInput ? 'capitalize' : ''}`}
              style={{ marginRight: '15px', borderColor: inputColor }}
              placeholder={placeholder}
              onChange={handleChange}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              type={'text'}
              name={name}
              ref={registerInput}
              {...inputProps}
            />
        </div>
        { error && <ErrorContainer>{error}</ErrorContainer>}
    </DropdownContainer>
  )
};