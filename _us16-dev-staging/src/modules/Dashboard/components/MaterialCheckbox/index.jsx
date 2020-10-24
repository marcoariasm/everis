import React, { useState, useEffect } from 'react';
import { CheckboxContainer, CheckboxSquare, ChexkboxLabel } from './styles';

const MaterialCheckbox = ({ label, value, radio = false, children, onChange }) => {
  
  const [checkboxValue, setCheckboxValue] = useState(false);
  useEffect(() => {
    if (onChange) onChange(checkboxValue);
  }, [checkboxValue]);

  return (
    <CheckboxContainer>
      <CheckboxSquare
        onChange={setCheckboxValue}
        radio={radio}
        className="checkbox-input"
        type="checkbox"
        id={value}
        value={value}
        name={value}
      />
      <ChexkboxLabel className="checkbox-label" htmlFor={value} data-content={label}>
        {label || children}
      </ChexkboxLabel>
    </CheckboxContainer>
  )
}

export default MaterialCheckbox;
