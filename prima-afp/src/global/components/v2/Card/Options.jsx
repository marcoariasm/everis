import React, { useState } from 'react';

import Modal from 'global/components/v1/Modal/ModalPac';
import { BoxOptions, Content, Title } from './style';
import EditBeneficiarie from 'shared/images/lapiz.svg';
import DeleteBeneficiarie from 'shared/images/deleteBeneficiarie.svg';
import DotButton from 'shared/images/dotButton.svg';

const Options = ({ onClick, onDelete, item }) => {
	const [showWarning, setShowWarning] = useState(false);
	const handleDelete = () => {
		onDelete((prevState) => {
			return prevState.filter((object) => {
				if (item.documentNumber === object.documentNumber) {
					return false;
				}
				return object;
			});
		});
	};

	const handleConfirm = () => {
		handleDelete();
		setShowWarning(false);
	};

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
			<BoxOptions>
				<img src={DotButton} alt='menu_dot_button' />
				<ul>
					<li>
						<div onClick={onClick}>
							<img alt='img' src={EditBeneficiarie} />
							<span className='valueFormTitle' id='editar'>
								Editar datos
							</span>
						</div>
					</li>
					<li>
						<div onClick={() => setShowWarning(true)}>
							<img alt='img' src={DeleteBeneficiarie} />
							<span className='valueFormTitle' id='eliminar'>
								Eliminar
							</span>
						</div>
					</li>
				</ul>
			</BoxOptions>
		</>
	);
};
export default Options;
