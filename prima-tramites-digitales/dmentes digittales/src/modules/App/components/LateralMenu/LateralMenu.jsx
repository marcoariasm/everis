import React from 'react';
import UserInformation from '../Menu/UserInformation';
import CloseSession from '../Menu/CloseSession';

const LateralMenu = ({ children }) => (
	<nav className='menu'>
		<div className='u-wrapper'>
			<ul>
				<li>
					<UserInformation />
				</li>
				{children}
				<li>
					<CloseSession />
				</li>
			</ul>
		</div>
	</nav>
);

export default LateralMenu;
