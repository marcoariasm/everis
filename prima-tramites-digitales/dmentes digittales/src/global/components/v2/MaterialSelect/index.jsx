import React, { useEffect, useState } from 'react';
import { allColors } from '../../../../global/styles/index';
import styled from 'styled-components';
import { SelectButton, ButtonLabel, Arrow, OptionItem, Label } from './styledComponents';
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


const SelectOptions = ({ options, onClickOption, currentValue }) => {
  return options.map(option => (
      <OptionItem
        isActive={option.value === currentValue.value}
        isPlaceholder={option.placeholder}
        key={Math.random()}
        onClick={() => onClickOption(option)}
        name={option.value}
        role="option"
        className={`ng-binding ng-scope ${option.value === currentValue.value ? 'active' : ''}`}
        tabIndex="-1"
        aria-selected="true"
      >
          {option.textContent}
      </OptionItem>
  ))
}



const MaterialSelect = ({
  optionsContainerStyles = {},
  selectWidth,
  selectOptions = [],
  onChange,
  placeholder,
  fontFamily = 'Calibri',
  name = '',
  initialValue,
  register
}) => {
  const placeholderItem = { textContent: placeholder, value: 'placeholder', shortContent: placeholder, placeholder: true  };
  const getDefaultValue = () => {
    if (initialValue) return selectOptions.find(item => item.value === initialValue);
    if (placeholder) return placeholderItem;
    return selectOptions[0];
  }

  const defaultValue = getDefaultValue();
  const optionsList = placeholder ? [placeholderItem, ...selectOptions] : selectOptions;

  const [activeSelect, setActiveSelect] = useState(false);
  const [selectValue, setSelectValue] =useState(defaultValue);

  const validateDefaultState = () => {
        const inputObject = document.getElementById(name);
        if (inputObject) {
          const inputValue = inputObject.options.selectedIndex;
          if (Number(inputValue)) setSelectValue(optionsList[inputValue]);
        }
    }

    useEffect(validateDefaultState, []);

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
      <select
        style={{ display: 'none' }}
        onChange={() => {}}
        ref={register}
        name={name}
        id={name}
        value={selectValue.value}
      >
        {
          optionsList.map(optionObj => (
            <option key={optionObj.textContent} value={optionObj.value}>
              {optionObj.shortContent || optionObj.textContent}
            </option>
          ))
        }
      </select>
      <SelectButton
        width={selectWidth}
        onClick={handleSelect}
        type="button"
        className="select-box"
      >
          <ButtonLabel fontFamily={fontFamily} isPlaceholder={selectValue.placeholder}>
            <Label>{selectValue.shortContent || selectValue.textContent}</Label>
          </ButtonLabel>
          <Arrow><span className={`arr ${activeSelect ? 'arr-up' : 'arr-down'}`}></span></Arrow>
      </SelectButton>
      <div type="button" className={`md-select ${activeSelect ? 'active' : ''}`} style={optionsContainerStyles}>
          <ul role="listbox" className="option-list">
            <SelectOptions options={optionsList} onClickOption={onClickOption} currentValue={selectValue} />
          </ul>
      </div>
    </>
  )
};

export default MaterialSelect;