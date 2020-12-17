import React from 'react';
import { CheckboxContainer, CheckboxSquare } from './styles';

const CheckBoxHeader = ({
  id = '', label = null, name = '', width = null, radius = false, onChange, checked, className = '', underline, disabled,
}) => {
  const idBox = id || Math.floor(Math.random() * 1000000000);
  const styles = {};

  if (label === ' ' || label === null) {
    label = `checkbox-${idBox}`;
  } else {
    styles.width = 350;
  }

  if (width !== null) {
    styles.width = width;
  }

  return (
    <CheckboxContainer className={className}>
      <CheckboxSquare
        id={idBox}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    </CheckboxContainer>
  );
};

export default CheckBoxHeader;
