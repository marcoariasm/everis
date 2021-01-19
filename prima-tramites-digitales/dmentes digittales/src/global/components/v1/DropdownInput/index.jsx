import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'

import { allColors } from 'global/styles'

import SelectV2 from '../../v2/SelectV2'

import './styles.sass'

const DropdownContainer = styled.div`
	width: ${(props) => props.percentageWidth || 100}%;
`
export default function DropdownInput({
	containerStyles = {},
	disabledInput = false,
	percentageWidth,
	placeholder,
	selectOptions = [],
	onChangeInput,
	onChangeSelect,
	maxLength,
	inputValue,
	idInput,
	error = false,
	textError,
	defaultSelectValue = null,
}) {
	const [labelColor, setLabelColor] = useState(allColors.colorPlaceholder)
	const [inputColor, setInputColor] = useState(allColors.colorGrayLight)

	const handleOnFocus = () => {
		setLabelColor(allColors.colorOrangeMain)
		setInputColor(allColors.colorOrangeMain)
	}

	const handleOnBlur = () => {
		setLabelColor(inputValue ? allColors.colorGrayText : allColors.colorPlaceholder)
		setInputColor(allColors.colorGrayLight)
	}

	return (
		<DropdownContainer percentageWidth={percentageWidth}>
			<div
				style={{ borderColor: inputColor }}
				className={classnames('group', {
					'error-input': error,
				})}>
				<SelectV2
					selectOptions={selectOptions}
					buttonContainerSelect='5em'
					optionsContainerStyles={{ marginTop: '50px' }}
					onChange={onChangeSelect}
					defaultSelectValue={defaultSelectValue}
				/>
				<input
					className='dropdown-input'
					style={{ borderColor: inputColor }}
					placeholder={placeholder}
					onChange={onChangeInput}
					value={inputValue}
					onFocus={handleOnFocus}
					onBlur={handleOnBlur}
					type='text'
					required
					id={idInput}
					maxLength={maxLength}
					disabled={disabledInput}
				/>
			</div>
			{error ? <div className='error-msg'>{textError}</div> : <div className='error-msg' />}
		</DropdownContainer>
	)
}
