import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { prop } from 'ramda'

import { allColors } from 'global/styles'

import './styles.scss'
import { useMemo } from 'react'

const SelectButton = styled.button`
	width: ${(props) => props.buttonContainerSelect || '100%'};
`

export const OutlinedSelectContainer = styled.div`
	border: 1px solid ${allColors.colorGrayLight};
	border-radius: 8px;
	width: ${(props) => props.width || '100%'};
	height: 48px;
	position: relative;
`

const ButtonLabel = styled.div`
	flex: 5;
	font-family: 'FS Emeric';
	display: flex;
	align-items: center;
	justify-content: flex-start;
	color: ${allColors.colorGrayText};
`

const Arrow = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
`

export default function SelectV2({
	optionsContainerStyles = {},
	buttonContainerSelect,
	selectOptions = [],
	defaultSelectValue,
	onChange,
}) {
	const [activeSelect, setActiveSelect] = useState(false)
	const [selectValue, setSelectValue] = useState(selectOptions[0])
	const node = useRef()

	const handleClickOutside = (e) => {
		setActiveSelect(false)
	}

	useEffect(() => {
		setSelectValue(selectOptions[0])
	}, [selectOptions])

	useEffect(() => {
		if (activeSelect) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [activeSelect])

	const handleSelect = () => {
		setActiveSelect(!activeSelect)
	}

	const selectOption = (newSelectValue) => {
		setSelectValue(newSelectValue)
		handleSelect()
	}

	useEffect(() => {
		if (onChange) onChange(selectValue)
	}, [selectValue])

	return (
		<>
			<SelectButton
				buttonContainerSelect={buttonContainerSelect}
				onClick={handleSelect}
				ref={node}
				type='button'
				className='select-box'>
				<ButtonLabel>{prop('shortName', selectValue)}</ButtonLabel>
				<Arrow>
					<span className={`arr ${activeSelect ? 'arr-up' : 'arr-down'}`}></span>
				</Arrow>
			</SelectButton>
			<div type='button' className={`md-select ${activeSelect ? 'active' : ''}`} style={optionsContainerStyles}>
				<ul role='listbox' className='option-list'>
					{selectOptions.map((option) => (
						<li
							key={Math.random()}
							onClick={() => selectOption(option)}
							name={option.name}
							role='option'
							className={`ng-binding ng-scope ${option?.name === selectValue?.name ? 'active' : ''}`}
							tabIndex='-1'
							aria-selected='true'>
							{option.value}
						</li>
					))}
				</ul>
			</div>
		</>
	)
}
