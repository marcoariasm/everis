import React, { useEffect, useState } from 'react';
import $ from 'global/styles';
import styled from 'styled-components';
import './styles.scss';
import { SelectButton, Arrow, OptionItem, ButtonLabel, Label } from './styledComponents';

const MaterialSelectWithSearch = styled.div`
  padding-top: ${props => props.noPadding || '0'};
  padding-bottom: ${props => props.noPadding || '0.7em'};
  width: ${props => props.percentageWidth || 100}%;
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

export default function SelectWithSearch(
  {
    optionsContainerStyles = {},
    selectWidth,
    selectOptions = [],
    onChange,
    placeholder,
    fontFamily = 'Calibri',
    name = '',
    initialValue,
    register,
    reset = false,
    widthInput='250px'
  }) {
  const placeholderItem = { textContent: placeholder, value: '', shortContent: placeholder, placeholder: true  };
  const [inputColor, setInputColor] = useState($.colorGrayLight);
  const [activeSelect, setActiveSelect] = useState(false);
  const [selectValue, setSelectValue] =useState([]);
  const [options, setOptionsList ] =useState(selectOptions);

  const getDefaultValue = () => {
    if (initialValue) return selectOptions.find(item => item.value === initialValue);
    if (placeholder) return placeholderItem;
    return selectOptions[0];
  }

  const defaultValue = getDefaultValue();

  useEffect(() => {
    setSelectValue(defaultValue)
  }, [reset]);

  useEffect(() => {
    if (activeSelect) {
      setOptionsList(selectOptions)
    }
  }, [activeSelect]);

  const handleSelect = () => {
    setActiveSelect(!activeSelect);
  }

  const onClickOption = (newSelectValue) => {
    setSelectValue(newSelectValue);
    handleSelect();
  }

  const handleChangeSearch = (e) => {
    const updateList = options.filter(item => {
      return item.textContent.toLowerCase().search(
        e.target.value.toLowerCase()
      ) !== -1;
    });

    if (updateList.length === 0) {
      setOptionsList(selectOptions);
    } else {
      setOptionsList(updateList);
    }
  }

  useEffect(() => {
    if (onChange) onChange(selectValue.placeholder ? null : selectValue);
  }, [selectValue])

  return (
    <MaterialSelectWithSearch>
      <div className="flex sb group-input" style={{ width: widthInput }}>
        <input
          style={{ display: 'none' }}
          id={name}
          name={name}
          ref={register}
          type={'text'}
          onChange={() => {}}
          placeholder={selectValue.shortContent || selectValue.textContent}
          value={selectValue.value || ''}
        />
        <SelectButton
          width={selectWidth}
          onClick={handleSelect}
          type="button"
          className="select-box"
        >
          {
            activeSelect ?
              <input
                id={`input-${name}`}
                className="input"
                style={{ borderColor: inputColor }}
                onChange={handleChangeSearch}
                type={'text'}
                name={name}
                autoFocus={true}
              />
              :
              <ButtonLabel fontFamily={fontFamily}>
                <Label>{selectValue.textContent}</Label>
              </ButtonLabel>
          }
          <Arrow><span className={`arr ${activeSelect ? 'arr-up' : 'arr-down'}`}></span></Arrow>
        </SelectButton>
      </div>
      <div type="button" className={`md-select ${activeSelect ? 'active' : ''}`} style={optionsContainerStyles}>
        <ul role="listbox" className="option-list scrollbar">
          <SelectOptions options={options} onClickOption={onClickOption} currentValue={selectValue} />
        </ul>
      </div>
    </MaterialSelectWithSearch>
  )
};
