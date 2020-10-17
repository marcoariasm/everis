import React, { useEffect, useState } from 'react';
import { allColors } from 'shared/styles/index';
import styled from 'styled-components';
import './styles.scss';
import MaterialSelect from '../MaterialSelect';

const DropdownContainer = styled.div`
  padding-top: 1em;
  padding-bottom: 0.7em;
  width: ${props => props.percentageWidth || 100}%;
`;

export default function DropdownInput({ containerStyles = {}, percentageWidth, placeholder, selectOptions = [], onChange }) {
    const [labelColor, setLabelColor] = useState(allColors.colorPlaceholder);
    const [inputColor, setInputColor] = useState(allColors.colorGrayLight);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
      if (onChange) onChange({ inputValue });
    }, [inputValue]);

    const handleOnFocus = () => {
        setLabelColor(allColors.colorOrangeMain);
        setInputColor(allColors.colorOrangeMain);
    }

    const handleOnBlur = () => {
        setLabelColor(inputValue ? allColors.colorGrayText : allColors.colorPlaceholder);
        setInputColor(allColors.colorGrayLight);
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }
   
  return (
    <DropdownContainer percentageWidth={percentageWidth}>
        <div style={{ borderColor: inputColor }} className="group">    
           <MaterialSelect selectOptions={selectOptions} buttonContainerSelect="5em" optionsContainerStyles={{ marginTop: '50px' }} />  
            <input
              className="dropdown-input"
              style={{ marginRight: '15px', borderColor: inputColor }}
              placeholder={placeholder}
              onChange={handleChange}
              value={inputValue}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              type="text"
              required
            />
        </div>
    </DropdownContainer>
  )
};