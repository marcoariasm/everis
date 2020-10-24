import React, { useEffect, useState } from 'react';
import { allColors } from '../../../../shared/styles/index';
import styled from 'styled-components';
import './styles.scss';

const RadioButtonList = ({ items, name = '', className = '', onChange, register }) => {
  console.log('register', register);
    const [currentValue, setCurrentValue] = useState('');

    useEffect(() => {
      if (onChange) onChange(currentValue);
    }, [currentValue])

    const updateValue = (e) => {
        setCurrentValue(e.target.value);
    }


  return (
    <div className={`radio-group ${className}`}>
        {items.map(item => {
          const radioProps = register ? {} : { checked: currentValue === item.value, disabled: item.disabled };
                return (
                    <label key={item.value}>
                        <input
                            type="radio"
                            { ...radioProps }
                            value={item.value}
                            name={name}
                            onChange={updateValue}
                            ref={register}
                        />
                        <span>{item.label}</span>
                    </label>
                );
        })}
    </div>
  )
};

export default RadioButtonList;