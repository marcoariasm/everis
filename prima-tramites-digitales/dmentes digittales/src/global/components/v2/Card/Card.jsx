import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { allColors } from 'global/styles';
import { size } from 'global/styles/Responsive';

import CheckBox from 'global/components/v2/CheckBoxV2';

import Candado from 'shared/images/candado.svg';
import Arrow from 'shared/images/arrow.svg';
import Arrow2 from 'shared/images/arrow2.svg';

import Options from './Options';

import './Card.scss';

const Card = (props) => {
	const [cardOpen, setCardOpen] = useState(props.cardOpen);
	const [checkGlobalState, setCheckGlobalState] = useState(props.checkCard || props.optionBlock === '' ? true : false);

	const changeImage = () => {
		setCardOpen(!cardOpen);
	};

	useEffect(() => {
		setCardOpen(props.cardOpen);
	}, [props.cardOpen]);

	function getCheck(e) {
		props.onChange(e.target);
		setCheckGlobalState(e.target.checked);
	}

	return (
		<>
			<CardComponent optionCheckVisibility={props.optionCheck}>
				{props.optionCheck && (
					<CheckBox
						id='benSelected'
						name='benSelected'
						onChange={getCheck}
						checked={props.disabledCheck ? false : checkGlobalState}
						disabled={props.disabledCheck}
						value={props.item.documentNumber}
					/>
				)}
				<span
					className={
						props.type === 'beneficiaries'
							? 'beneficiaries cardTitle'
							: props.type === 'normal'
							? 'normal cardTitle'
							: props.type === 'double'
							? 'double cardTitle'
							: 'beneficiaries'
					}>
					{props.title}
				</span>
				{props.blocked && <img src={Candado} alt='Candado' />}
				{props.options && props.optionBlock === '' && <Options onClick={props.onClick} onDelete={props.onDelete} item={props.item} />}
				<ArrowContainer onClick={changeImage}>
					<img src={cardOpen ? Arrow : Arrow2} alt='Desplegar Informacíon'></img>
				</ArrowContainer>
			</CardComponent>
			{cardOpen && <BodyCard>{props.children}</BodyCard>}
		</>
	);
};

const CardComponent = styled.div`
	display: grid;
	grid-template-columns: ${(props) => (props.optionCheckVisibility ? '20px 1fr auto auto' : '1fr auto auto')};
	padding: 0 20px;
	align-items: center;
	width: 100%;
	background: ${allColors.colorWhiteBase};
	border: 1px solid ${allColors.colorGrayBorder};
	box-sizing: border-box;
	box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.08);
	border-radius: 6px;
	@media only screen and (min-width: ${size.tablet}) {
		padding: 0 40px;
	}
`;
const BodyCard = styled.div`
	width: 100%;
	background: ${allColors.colorGrayCard};
	margin-top: -6px;
	border-radius: 11px;
`;

const ArrowContainer = styled.div`
	cursor: pointer;
`;

export default Card;
