import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeLayoutStyled = styled.div`
  padding: 4rem;
`;

const HomeCard = styled.div`
  padding: 2em;
  background: white;
`;

const HomePage = () => (
  <HomeLayoutStyled>
    <HomeCard>
      <Link to="/proceso95-5">Jubilación y/o retiro de hasta el 95.5%</Link>
    </HomeCard>
  </HomeLayoutStyled>
);

export default HomePage;
