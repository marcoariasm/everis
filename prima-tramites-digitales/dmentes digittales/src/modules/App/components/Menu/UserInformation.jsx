import React, { useContext } from 'react';
import styled from 'styled-components';

import { size } from 'global/styles/Responsive';
import AccountImage from 'modules/App/assets/images/account.svg';
import { UserContext } from '../../pages/MainDashboardLayout';

const UsernameContent = styled.div`
	display: flex;
	align-items: center;
	font-family: FS Emeric;
	font-weight: normal;
	padding: 35px 20px 35px 14%;
	@media only screen and (min-width: ${size.laptopL}) {
		padding: 35px 20px;
	}
`;

const UserNameStyled = styled.p`
	font-size: 20px;
	line-height: 22px;
	color: var(--whiteColorBase);
`;
const UserCusppStyled = styled.p`
	font-size: 13px;
	line-height: 16px;
	color: var(--whiteColorBase);
`;

const UsernameImage = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 13px;
`;

const UserInformation = () => {
	const user = useContext(UserContext);
	return (
		<>
			<UsernameContent>
				<UsernameImage src={AccountImage} alt={AccountImage} />
				<div>
					<UserNameStyled>{user.name}</UserNameStyled>
					{user.cuspp && <UserCusppStyled>CUSPP: {user.cuspp}</UserCusppStyled>}
				</div>
			</UsernameContent>
		</>
	);
};
export default UserInformation;
