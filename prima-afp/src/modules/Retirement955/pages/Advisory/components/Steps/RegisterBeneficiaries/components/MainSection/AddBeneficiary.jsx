import React from 'react';
import styled from 'styled-components';
import BtnAddBeneficiaries from './BtnAddBeneficiaries';
import { allColors } from 'global/styles';

const Content = styled.div`
	width: 100%;
	text-align: center;
	display: flex;
	align-items: center;
	border-radius: 11px;
	height: 200px;
	box-sizing: border-box;
	border: 3px dashed ${allColors.colorGrayCardDashed};
	background: ${allColors.colorGrayCard};
`;

const ContentButton = styled.div`
	width: 100%;
	& > div {
		margin: 0;
	}
`;
const AddBeneficiary = ({ beneficiaries, onclick }) => {
	return (
		<>
			{beneficiaries && beneficiaries.length > 0 ? (
				<BtnAddBeneficiaries onChange={onchange} setShowModal={onclick} />
			) : (
				<Content>
					<ContentButton>
						<BtnAddBeneficiaries noBeneficiary marginT='19px' onChange={onchange} setShowModal={onclick} />
					</ContentButton>
				</Content>
			)}
		</>
	);
};

export default AddBeneficiary;
