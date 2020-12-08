import React, { useState, useEffect, useRef } from 'react';
import { CheckboxContainer, CheckboxSquare, ChexkboxLabel } from './styles';
import ToolTip from '../ToolTip';

const mergeRefs = (...refs) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return inst => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

const MaterialCheckbox = ({
  label,
  name = '',
  radio = false,
  children,
  onChange,
  register,
  initialValue = false,
  className = '',
  showToolTip = false,
  tooltipContent,
  disabled = false
}) => {
  const checkRef = useRef(null);
  const [checkboxValue, setCheckboxValue] = useState(initialValue);

  useEffect(() => {
    if (onChange) onChange(checkboxValue);
  }, [checkboxValue]);

  const checkboxUpdated = () => {
    setCheckboxValue(!checkboxValue)
  }

  const touchLabel = (e) => {
    
    e.stopPropagation();
    checkRef.current.click();
  }

  const stopPropagationCheck = (e) => {
    e.stopPropagation();
  }

  const checkboxProps = register ? {} : { checked: checkboxValue };

  return (
    <CheckboxContainer className={className}>
      <ToolTip show={showToolTip} content={tooltipContent} direction="top">
        <CheckboxSquare
          ref={mergeRefs(checkRef, register)}
          onClick={stopPropagationCheck}
          onChange={checkboxUpdated}
          radio={radio}
          className="checkbox-input"
          type="checkbox"
          id={name}
          name={name}
          disabled={disabled}
          {...checkboxProps}
        />
      </ToolTip>
      <ChexkboxLabel onClick={touchLabel} className="checkbox-label" htmlFor={name} data-content={label}>
        {label || children}
      </ChexkboxLabel>
    </CheckboxContainer>
  )
}

export default MaterialCheckbox;
