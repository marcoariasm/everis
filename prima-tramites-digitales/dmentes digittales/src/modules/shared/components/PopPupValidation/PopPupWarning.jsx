import React from 'react';
import styled from 'styled-components';

import Modal from 'global/components/v1/Modal';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 45px 45px 0 45px;
	border-radius: 7px;
	& > span {
		font-size: 20px;
		line-height: 22px;

		font-weight: 600px;
		padding-bottom: 15px;
	}
	& > label {
		font-size: 18px;
		line-height: 22px;
	}
`;

function PopPupWarning({
	onClose,
	show,
	widthB,
	heightB,
	marginT,
	marginB,
	justifyContent,
	onClick,
	texto,
	nameButton,
	hideButtonCancel,
	hiddenCloseModal,
}) {
	return (
		<>
			<Modal
				onClick={onClick}
				show={show}
				widthB={widthB}
				heightB={heightB}
				marginT={marginT}
				marginB={marginB}
				justifyContent={justifyContent}
				onClose={onClose}
				nameButton={nameButton}
				hideButtonCancel={hideButtonCancel}
				hiddenCloseModal={hiddenCloseModal}>
				<Container>
					<span className='informativeTitleSmall'>Algo salío mal...</span>
					<label className='bodyText'>{texto}</label>
				</Container>
			</Modal>
		</>
	);
}

export default PopPupWarning;
