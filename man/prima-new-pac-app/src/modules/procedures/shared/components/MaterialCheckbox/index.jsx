import React, { useState, useEffect } from 'react';
import { CheckboxContainer, CheckboxSquare, ChexkboxLabel } from './styles';

const MaterialCheckbox = ({ label, name, radio = false, children, onChange, register, initialValue = false, className = '', disabled=false }) => {
  
  const [checkboxValue, setCheckboxValue] = useState(initialValue);

  useEffect(() => {
    if (onChange) onChange(checkboxValue);
  }, [checkboxValue]);

  const checkboxUpdated = () => {
    setCheckboxValue(!checkboxValue)
  }


  const checkboxProps = register ? {} : { checked: checkboxValue };

  return (
    <CheckboxContainer className={className}>
      <CheckboxSquare
        ref={register}
        onChange={checkboxUpdated}
        radio={radio}
        className="checkbox-input"
        type="checkbox"
        id={name}
        name={name}
        disabled={disabled}
        {...checkboxProps}
      />
      <ChexkboxLabel className="checkbox-label" htmlFor={name} data-content={label}>
        {label || children}
      </ChexkboxLabel>
    </CheckboxContainer>
  )
}

export default MaterialCheckbox;
