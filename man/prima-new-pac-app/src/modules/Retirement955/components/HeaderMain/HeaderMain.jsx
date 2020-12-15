import React from 'react';
import $ from 'global/styles';
import styled from 'styled-components';

import LogoPrima from 'shared/images/LOGO_PRIMA.svg';
import IconProfile from 'shared/images/PROFILE.svg';

const HeaderMain = ({ auth = true }) => (
  <Wrapper>
    <Logo src={LogoPrima} alt="Logo prima" />
    {auth && (
      <Profile>
        <User src={IconProfile} />
        <Name>Luisa Sabirova</Name>
      </Profile>
    )}
  </Wrapper>
);

export default HeaderMain;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  box-shadow: 3px 3px 13px rgba(136, 136, 136, 0.3);
  background: ${$.blanco};
  z-index: 1;
`;
const Logo = styled.img`
  margin-left: 28px;
  width: 103px;
  height: 38px;
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;
  height: 34px;
  margin-right: 104px;
`;

const User = styled.img`
  height: 31px;
  width: 36px;
`;

const Name = styled.span`
  color: ${$.gris};
  font-weight: 500;
  font-size: 17px;
  letter-spacing: 0.02em;
`;
