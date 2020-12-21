import React from 'react';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import ExitImage from 'modules/App/assets/images/exit.svg';
import SharedModule from 'modules/shared';
import { useModalConfirmLeave } from '../../contexts/ModalConfirmLeaveContext';

const { AppSession } = SharedModule.libs;

const CerrarSessionStyled = styled.div`
	display: flex;
	position: fixed;
	align-items: center;
	padding-left: 35px;
	width: 100%;
	margin: 0;
	bottom: 0;
	img {
		margin: 0px 27px 0px 0px;
		width: auto;
	}
	p {
		font-family: FS Emeric;
		font-size: 16px;
		font-style: normal;
		font-weight: 450;
		line-height: 18px;
	}
	@media screen and (max-width: ${size.laptopL}) {
		padding-left: 14%;
		margin-bottom: 20%;
		p {
			font-weight: 400;
			font-size: 20px;
			line-height: 22px;
		}
	}
	@media screen and (max-width: ${size.laptopL}) and (orientation: landscape) {
		margin-bottom: 15%;
	}

	@media only screen and (min-device-width : 375px) and (max-device-width : 410px) { 
		margin-bottom: 35%;
	}
	@media only screen  and (device-width : 414px) and (device-height : 896px) and (-webkit-device-pixel-ratio : 2) { 
		margin-bottom: 45%;
	}
	@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 2) { 
		margin-bottom: 45%;
	}
	@media only screen and (min-device-width : 375px) and (max-device-width : 812px) and (-webkit-device-pixel-ratio : 3) { 
		margin-bottom: 30%;
	}
`;

const CloseSession = () => {
	const { setConfirmContent } = useModalConfirmLeave();

	const { interceptorHoldNavigation } = useModalConfirmLeave();

	const closeSession = () => {
		AppSession.destroy();
	};

	const handleCloseSession = () => {
		setConfirmContent({ content: '¿Seguro que deseas cerrar sesión?' });
		interceptorHoldNavigation(() => closeSession());
	};

	return (
		<a onClick={handleCloseSession}>
			<CerrarSessionStyled>
				<img src={ExitImage} alt='Cerrar Sesion' />
				<p>Cerrar sesión</p>
			</CerrarSessionStyled>
		</a>
	);
};

export default CloseSession;
