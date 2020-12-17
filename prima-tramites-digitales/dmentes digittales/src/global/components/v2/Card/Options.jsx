import React, { useState } from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

import Modal from 'global/components/v1/Modal/ModalPac'
import EditBeneficiarie from 'shared/images/lapiz.svg'
import DeleteBeneficiarie from 'shared/images/deleteBeneficiarie.svg'

export const Content = styled.div`
	padding: 20px;
`
export const Title = styled.div`
	padding-bottom: 30px;
`

const StyledOptions = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-column-gap: 20px;
	padding-right: 10px;
	& > div {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		cursor: pointer;
	}
	& > div > span {
		font-family: FS Emeric;
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 18px;
		color: #696158;
		display: none;
	}
	@media screen and (min-width: ${size.tablet}) {
		grid-column-gap: 30px;
		padding-right: 20px;
		& > div {
			display: grid;
			grid-template-columns: auto auto;
			grid-column-gap: 10px;
			align-items: center;
			cursor: pointer;
		}
		& > div > span {
			display: initial;
		}
	}
`
const Options = ({ onClick, onDelete, item }) => {
	const [showWarning, setShowWarning] = useState(false)
	const handleDelete = () => {
		onDelete((prevState) => {
			return prevState.filter((object) => {
				if (item.documentNumber === object.documentNumber) {
					return false
				}
				return object
			})
		})
	}

	const handleConfirm = () => {
		handleDelete()
		setShowWarning(false)
	}

	return (
		<>
			<Modal
				widthB='100px'
				heightB='40px'
				width='41%'
				padding='40px'
				justifyContent='flex-end'
				nameButton='Aceptar'
				show={showWarning}
				onClose={() => setShowWarning(false)}
				onButtonClick={handleConfirm}>
				<Content>
					<Title>
						<span className='informativeTitleSmall'>Eliminar Beneficiarios</span>
					</Title>
					<label className='tableBodyText2'>¿Deseas eliminar los beneficiarios seleccionados?</label>
				</Content>
			</Modal>
			<StyledOptions>
				<div onClick={onClick}>
					<img alt='img' src={EditBeneficiarie} />
					<span id='editar'>Editar datos</span>
				</div>
				<div onClick={() => setShowWarning(true)}>
					<img alt='img' src={DeleteBeneficiarie} />
					<span id='eliminar'>Eliminar</span>
				</div>
			</StyledOptions>
		</>
	)
}
export default Options
