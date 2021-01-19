import React from 'react';
import styled from 'styled-components';
import MediaQuery from 'react-responsive';
import { size } from 'global/styles/Responsive';
import Botton from 'global/components/v1/Button/ButtonNormal/Button';

const BtnSaveCancel = ({ type, marginR, onCanceled, onAccepted }) => {
	return (
		<Btn>
			<MediaQuery maxDeviceWidth={767}>
				<ContentB marginR='0px'>
					<Botton
						id='guardar'
						classButton='btn-siguiente'
						widthB='152px'
						heightB='45px'
						type={type}
						onClick={onAccepted}>
						Guardar
					</Botton>
				</ContentB>
				<ContentB>
					<Botton id='cancelar' classButton='btn-cancelar' widthB='152px' heightB='45px' onClick={onCanceled}>
						Cancelar
					</Botton>
				</ContentB>
			</MediaQuery>
			<MediaQuery minDeviceWidth={768}>
				<ContentB marginR={marginR}>
					<Botton
						id='cancelar'
						classButton='btn-cancelar'
						border='2px solid #ff4f00'
						widthB='152px'
						heightB='45px'
						onClick={onCanceled}>
						Cancelar
					</Botton>
				</ContentB>
				<ContentB>
					<Botton
						id='guardar'
						classButton='btn-siguiente'
						widthB='152px'
						heightB='45px'
						type={type}
						onClick={onAccepted}>
						Guardar
					</Botton>
				</ContentB>
			</MediaQuery>
		</Btn>
	);
};
export default BtnSaveCancel;

const Btn = styled.div`
	margin-top: 1rem;
	width: auto;
	margin-right: 0px;
	justify-content: center;
	display: flex;
	flex-direction: column;
	margin-bottom: 0px;
	@media only screen and (min-width: ${size.tablet}) {
		flex-direction: row;
		justify-content: flex-end;
		margin-right: 35px;
	}
`;
const ContentB = styled.div`
	width: 100%;
	display: flex;
	margin-right: 0px;
	margin-bottom: 5px;
	flex-direction: column;
	align-items: center;
	@media only screen and (min-width: ${size.tablet}) {
		width: auto;
		margin-right: ${({ marginR }) => marginR || '0px'};
		flex-direction: row;
		align-items: flex-end;
	}
`;
