import React, { useEffect, useState } from 'react';
import { allColors } from 'shared/styles/index';
import styled from 'styled-components';
import { SelectButton, ButtonLabel, Arrow, OptionItem } from './styledComponents';
import './styles.scss';

export const OutlinedSelectContainer = styled.div`
  border: 2px solid #d6d6d6;
  border-radius: 8px;
  width: ${props => props.width || '100%'};
  height: 48px;
  position: relative;
  :hover {
     border-color: ${allColors.colorOrangeMain};
  }
`;

const SelectOptions = ({ options, onClickOption, currentValue, isPlaceholder }) => {
  console.log('options', options);
  console.log('currentValue', currentValue);
  return options.map(option => (
      <OptionItem
        isActive={option.name === currentValue.name}
        isPlaceholder={option.placeholder}
        key={Math.random()}
        onClick={() => onClickOption(option)}
        name={option.name}
        role="option"
        className={`ng-binding ng-scope ${option.name === currentValue.name ? 'active' : ''}`}
        tabIndex="-1"
        aria-selected="true"
      >
          {option.value}
      </OptionItem>
  ))
}

const MaterialSelect = ({ optionsContainerStyles = {}, buttonContainerSelect, selectOptions = [], onChange, placeholder }) => {
  console.log('selectOptions', selectOptions);
    const placeholderItem = { value: placeholder, name: 'placeholder', shortName: placeholder, placeholder: true  };
    const defaultValue = placeholder ? placeholderItem : selectOptions[0];
    const optionsList = placeholder ? [placeholderItem, ...selectOptions] : selectOptions;

    const [activeSelect, setActiveSelect] = useState(false);
    const [selectValue, setSelectValue] =useState(defaultValue);

    const handleSelect = () => {
        setActiveSelect(!activeSelect);
    }

    const onClickOption = (newSelectValue) => {
        setSelectValue(newSelectValue);
        handleSelect();
    }

    useEffect(() => {
        if (onChange) onChange(selectValue.placeholder ? null : selectValue);
    }, [selectValue])
   
  return (
    <>
      <SelectButton buttonContainerSelect={buttonContainerSelect} onClick={handleSelect} type="button" className="select-box">
          <ButtonLabel isPlaceholder={selectValue.placeholder}>{selectValue.shortName}</ButtonLabel>
          <Arrow><span className={`arr ${activeSelect ? 'arr-up' : 'arr-down'}`}></span></Arrow>
      </SelectButton>
      <div  type="button" className={`md-select ${activeSelect ? 'active' : ''}`} style={optionsContainerStyles}>
          <ul role="listbox" className="option-list">
            <SelectOptions isPlaceholder={selectValue.placeholder} options={optionsList} onClickOption={onClickOption} currentValue={selectValue} />
          </ul>
      </div>
    </>
  )
};

export default MaterialSelect;