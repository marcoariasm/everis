import React from 'react';
import { CheckboxContainer, CheckboxSquare, ChexkboxLabel } from './styles';

const CheckBox = ({ checked, children, disabled, label, onChange, radio = false, value }) => {
	return (
		<CheckboxContainer>
			<CheckboxSquare
				onChange={onChange}
				radio={radio}
				className='checkbox-input'
				type='checkbox'
				id={value}
				value={value}
				name={value}
				checked={checked}
				disabled={disabled}
			/>
			<ChexkboxLabel className='checkbox-label' htmlFor={value} data-content={label}>
				{label || children}
			</ChexkboxLabel>
		</CheckboxContainer>
	);
};

export default CheckBox;
